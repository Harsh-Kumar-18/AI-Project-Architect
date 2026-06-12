import groq from "../config/groq.js";

// ─────────────────────────────────────────────
//  SYSTEM PROMPT (sent on every call — kept dense)
// ─────────────────────────────────────────────
const SYSTEM_PROMPT = `You are a senior software architect, DevOps engineer, and technical product manager (15+ years experience).
Return ONLY raw valid JSON — no markdown, no backticks, no preamble.
Every field populated; arrays never empty; objects never null.
Use modern, actively-maintained, production-ready tech for an app scaling to thousands of users.
If you cannot comply, return exactly: {"error":"generation_failed"}`;

// ─────────────────────────────────────────────
//  PART 1 — Core Info + Folder Structure
// ─────────────────────────────────────────────
const PROMPT_PART1 = (prompt) => `Generate PART 1 of a production-ready architecture for: "${prompt}"

FOLDER STRUCTURE RULES:
Frontend src/ must include (2+ files each): components, pages, routes, services, context. Optional: assets, hooks, utils, styles. E.g: components/{Navbar.jsx,Footer.jsx}, pages/{Home.jsx,Login.jsx}, routes/AppRoutes.jsx, services/api.js, context/AuthContext.jsx.
Backend: root server.js; src/ must include (2+ files each): config, controllers, middleware, models, routes, services, app.js. E.g: config/db.js, controllers/authController.js, middleware/authMiddleware.js, models/User.js, routes/authRoutes.js, services/emailService.js.
Use project-specific names, not these examples. Output each as {name, type: folder|file, description, children: []}, max 2 levels deep.

Return ONLY this JSON:
{
  "title": "string (specific project title)",
  "overview": "string (4 sentences)",
  "projectType": "string e.g. SaaS/E-Commerce/Social Platform/FinTech",
  "difficulty": "Beginner|Intermediate|Advanced|Enterprise",
  "estimatedDuration": "string - maximum 6 weeks (e.g. 2 weeks, 3-4 weeks, 5-6 weeks)",
  "features": ["string x12, one sentence each"],
  "techStack": {
    "frontend": ["string"], "backend": ["string"], "database": ["string"],
    "authentication": ["string"], "deployment": ["string"], "devTools": ["string"],
    "testing": ["string"], "ciCd": ["string"]
  },
  "folderStructure": {
    "frontend": [ /* per FOLDER STRUCTURE RULES above */ ],
    "backend": [ /* per FOLDER STRUCTURE RULES above */ ]
  },
  "architectureDiagram": {
    "description": "string (overview)",
    "pattern": "string e.g. MVC/Microservices/Monolith/Serverless/Event-Driven",
    "layers": [
      { "layer": "string e.g. Client Layer/API Gateway/Service Layer/Data Layer", "components": ["string"], "description": "string" }
    ],
    "dataFlow": ["string, numbered steps e.g. '1. User sends request to React frontend'"],
    "integrations": [
      { "name": "string e.g. Stripe/Cloudinary/Firebase", "purpose": "string", "direction": "inbound|outbound|bidirectional" }
    ]
  }
}`;

// ─────────────────────────────────────────────
//  PART 2 — Technical Deep Dive
// ─────────────────────────────────────────────
const PROMPT_PART2 = (prompt, title) => `Generate PART 2 of production-ready architecture for: "${title}" (${prompt})

Return ONLY this JSON:
{
  "databaseSchema": [
    {
      "collection": "string", "description": "string (purpose)",
      "fields": [
        { "name": "string", "type": "String|Number|Boolean|Date|ObjectId|Array|Object", "required": true, "description": "string (what it stores)", "example": "string (realistic value)" }
      ],
      "indexes": ["string e.g. 'email (unique)', 'createdAt (desc)'"]
    }
  ],
  "apiEndpoints": [
    { "group": "string e.g. Auth/Users/Products", "method": "GET|POST|PUT|DELETE|PATCH", "endpoint": "string e.g. /api/v1/auth/login", "description": "string", "authRequired": true, "requestBody": "string or null", "response": "string" }
  ],
  "systemDesign": {
    "architecturePattern": "string",
    "authenticationFlow": ["string, step by step"],
    "dataFlow": ["string, step by step"],
    "securityMeasures": ["string x6+"],
    "scalabilityStrategy": ["string x6+"],
    "performanceOptimizations": ["string x5+"],
    "monitoringAndLogging": ["string x4+"]
  },
  "developmentRoadmap": [
    { "phase": "string e.g. 'Phase 1: Project Setup'", "duration": "string - maximum 2 weeks", "tasks": ["string x4-5"] }
  ],
  "futureEnhancements": [
    { "feature": "string", "description": "string (why/how)", "priority": "High|Medium|Low" }
  ]
}`;

// ─────────────────────────────────────────────
//  Shared Groq caller
// ─────────────────────────────────────────────
const callGroq = async (userContent, partLabel) => {
  let completion;

  try {
    completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      temperature: 0.5,
      max_tokens: 4096,
      top_p: 0.9,
      stream: false,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user",   content: userContent },
      ],
    });
  } catch (err) {
    throw new Error(`Groq API error (${partLabel}): ${err.message}`);
  }

  const choice = completion.choices?.[0];
  const raw    = choice?.message?.content ?? "";

  if (!raw.trim()) {
    throw new Error(`Groq returned empty response (${partLabel}).`);
  }

  if (choice?.finish_reason === "length") {
    throw new Error(`Response truncated (${partLabel}). Try a simpler prompt.`);
  }

  const cleaned = raw
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i,     "")
    .replace(/```$/i,        "")
    .trim();

  try {
    return JSON.parse(cleaned);
  } catch {
    throw new Error(
      `Invalid JSON from AI (${partLabel}). Raw: ${cleaned.slice(0, 300)}`
    );
  }
};

// ─────────────────────────────────────────────
//  Schema validators
// ─────────────────────────────────────────────
const PART1_KEYS = ["title", "overview", "projectType", "difficulty", "estimatedDuration", "features", "techStack", "folderStructure", "architectureDiagram"];
const PART2_KEYS = ["databaseSchema", "apiEndpoints", "systemDesign", "developmentRoadmap", "futureEnhancements"];

const validateKeys = (data, required, label) => {
  const missing = required.filter((k) => !(k in data));
  if (missing.length > 0) {
    throw new Error(`${label} missing keys: ${missing.join(", ")}`);
  }
};

// ─────────────────────────────────────────────
//  Main export
// ─────────────────────────────────────────────
const generateProjectArchitecture = async (prompt) => {
  if (!prompt || typeof prompt !== "string" || prompt.trim().length < 5) {
    throw new Error("A valid project idea is required (min 5 characters).");
  }

  // ── Part 1 ──
  const part1 = await callGroq(PROMPT_PART1(prompt.trim()), "Part 1");
  if (part1?.error) throw new Error(`AI failed (Part 1): ${part1.error}`);
  validateKeys(part1, PART1_KEYS, "Part 1");

  // ── Part 2 (uses title from Part 1 for context) ──
  const part2 = await callGroq(PROMPT_PART2(prompt.trim(), part1.title), "Part 2");
  if (part2?.error) throw new Error(`AI failed (Part 2): ${part2.error}`);
  validateKeys(part2, PART2_KEYS, "Part 2");

  // ── Merge and return ──
  return { ...part1, ...part2 };
};

export default generateProjectArchitecture;