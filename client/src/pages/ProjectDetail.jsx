import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import DashboardLayout from "../components/layout/DashboardLayout";
import AIResponse from "../components/ai/AIResponse";
import { FaArrowLeft, FaFilePdf, FaFileCode } from "react-icons/fa";

import { getProjectById, deleteProject } from "../services/projectService";

// ─── PDF Export ────────────────────────────────────────────────────────────
const exportPDF = (project) => {
  const styles = `
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { font-family: 'Segoe UI', Arial, sans-serif; color: #1e293b; padding: 40px; line-height: 1.6; }
      .header { border-bottom: 3px solid #3b82f6; padding-bottom: 20px; margin-bottom: 30px; }
      .badge { display: inline-block; background: #eff6ff; color: #3b82f6; border: 1px solid #bfdbfe; padding: 3px 10px; border-radius: 20px; font-size: 12px; font-weight: 600; margin-right: 8px; }
      h1 { font-size: 28px; font-weight: 800; color: #0f172a; margin-bottom: 8px; }
      h2 { font-size: 18px; font-weight: 700; color: #1e40af; margin: 28px 0 12px; border-left: 4px solid #3b82f6; padding-left: 10px; }
      h3 { font-size: 14px; font-weight: 700; color: #374151; margin: 14px 0 6px; }
      p  { font-size: 14px; color: #475569; margin-bottom: 8px; }
      .meta { font-size: 13px; color: #94a3b8; margin-bottom: 16px; }
      .prompt-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px 18px; margin-bottom: 24px; }
      .prompt-label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #94a3b8; margin-bottom: 6px; }
      .section { background: #fff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 20px; margin-bottom: 20px; page-break-inside: avoid; }
      ul { padding-left: 18px; }
      li { font-size: 13px; color: #475569; margin-bottom: 4px; }
      .tag { display: inline-block; background: #f1f5f9; color: #475569; border-radius: 6px; padding: 2px 8px; font-size: 12px; margin: 2px; }
      .grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
      table { width: 100%; border-collapse: collapse; font-size: 13px; margin-top: 8px; }
      th { background: #f1f5f9; text-align: left; padding: 8px 12px; font-weight: 700; color: #374151; border: 1px solid #e2e8f0; }
      td { padding: 7px 12px; border: 1px solid #e2e8f0; color: #475569; vertical-align: top; }
      tr:nth-child(even) td { background: #f8fafc; }
      .phase { background: #eff6ff; border-left: 4px solid #3b82f6; padding: 10px 14px; border-radius: 0 8px 8px 0; margin-bottom: 10px; }
      .phase-title { font-weight: 700; color: #1e40af; font-size: 14px; }
      .phase-dur { font-size: 12px; color: #64748b; margin-bottom: 4px; }
      .footer { margin-top: 40px; padding-top: 16px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8; text-align: center; }
    </style>
  `;

  const d = project.generatedOutput || {};

  const techStackHTML = d.techStack
    ? `<div class="section"><h2>Tech Stack</h2><div class="grid2">
        ${Object.entries(d.techStack).map(([key, vals]) =>
          `<div><h3>${key.charAt(0).toUpperCase() + key.slice(1)}</h3>
           <div>${(vals || []).map(v => `<span class="tag">${v}</span>`).join("")}</div></div>`
        ).join("")}
       </div></div>`
    : "";

  const featuresHTML = d.features?.length
    ? `<div class="section"><h2>Features</h2><ul>
        ${d.features.map(f => `<li>${f}</li>`).join("")}
       </ul></div>`
    : "";

  const dbHTML = d.databaseSchema?.length
    ? `<div class="section"><h2>Database Schema</h2>
        ${d.databaseSchema.map(col => `
          <h3>${col.collection}</h3>
          <p style="font-size:12px;color:#64748b;margin-bottom:6px">${col.description || ""}</p>
          <table>
            <tr><th>Field</th><th>Type</th><th>Required</th><th>Description</th></tr>
            ${(col.fields || []).map(f =>
              `<tr><td><strong>${f.name}</strong></td><td>${f.type}</td>
               <td>${f.required ? "Yes" : "No"}</td><td>${f.description || ""}</td></tr>`
            ).join("")}
          </table>`
        ).join("")}
       </div>`
    : "";

  const apiHTML = d.apiEndpoints?.length
    ? `<div class="section"><h2>API Endpoints</h2>
        <table>
          <tr><th>Method</th><th>Endpoint</th><th>Description</th><th>Auth</th></tr>
          ${d.apiEndpoints.map(ep =>
            `<tr><td><strong>${ep.method}</strong></td>
             <td style="font-family:monospace;font-size:12px">${ep.endpoint}</td>
             <td>${ep.description}</td>
             <td>${ep.authRequired ? "Yes" : "No"}</td></tr>`
          ).join("")}
        </table>
       </div>`
    : "";

  const roadmapHTML = d.developmentRoadmap?.length
    ? `<div class="section"><h2>Development Roadmap</h2>
        ${d.developmentRoadmap.map(ph => `
          <div class="phase">
            <div class="phase-title">${ph.phase}</div>
            <div class="phase-dur">Duration: ${ph.duration}</div>
            <ul>${(ph.tasks || []).map(t => `<li>${t}</li>`).join("")}</ul>
          </div>`
        ).join("")}
       </div>`
    : "";

  const html = `<!DOCTYPE html><html><head><meta charset="UTF-8">
    <title>${project.title}</title>${styles}</head><body>
    <div class="header">
      <h1>${project.title}</h1>
      <div class="meta">Created on ${new Date(project.createdAt).toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" })} &nbsp;·&nbsp; AI Project Architect</div>
      <div>
        ${d.projectType  ? `<span class="badge">${d.projectType}</span>`  : ""}
        ${d.difficulty   ? `<span class="badge">${d.difficulty}</span>`   : ""}
        ${d.estimatedDuration ? `<span class="badge">${d.estimatedDuration}</span>` : ""}
      </div>
    </div>
    <div class="prompt-box">
      <div class="prompt-label">Original Prompt</div>
      <p>${project.prompt}</p>
    </div>
    ${d.overview ? `<div class="section"><h2>Overview</h2><p>${d.overview}</p></div>` : ""}
    ${featuresHTML}
    ${techStackHTML}
    ${dbHTML}
    ${apiHTML}
    ${roadmapHTML}
    <div class="footer">Exported from AI Project Architect · ${new Date().toLocaleDateString()}</div>
  </body></html>`;

  const blob = new Blob([html], { type: "text/html" });
  const url  = URL.createObjectURL(blob);
  const win  = window.open(url, "_blank");
  if (win) {
    win.onload = () => { win.focus(); win.print(); URL.revokeObjectURL(url); };
  }
};

// ─── JSON Export ───────────────────────────────────────────────────────────
const exportJSON = (project) => {
  const payload  = { title: project.title, prompt: project.prompt, createdAt: project.createdAt, generatedOutput: project.generatedOutput };
  const blob     = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url      = URL.createObjectURL(blob);
  const a        = document.createElement("a");
  a.href         = url;
  a.download     = `${project.title.replace(/\s+/g, "_").toLowerCase()}.json`;
  a.click();
  URL.revokeObjectURL(url);
};

// ─── Component ─────────────────────────────────────────────────────────────
const ProjectDetail = () => {
  const { id }    = useParams();
  const navigate  = useNavigate();

  const [project,  setProject]  = useState(null);
  const [loading,  setLoading]  = useState(true);
  const [exporting, setExporting] = useState(""); // "pdf" | "json" | ""

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const data = await getProjectById(id);
        setProject(data.project);
      } catch (error) {
        console.error(error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Delete this project?")) return;
    try {
      await deleteProject(id);
      navigate("/saved-projects");
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
    }
  };

  const handleExportPDF = () => {
    setExporting("pdf");
    setTimeout(() => { exportPDF(project); setExporting(""); }, 100);
  };

  const handleExportJSON = () => {
    setExporting("json");
    setTimeout(() => { exportJSON(project); setExporting(""); }, 100);
  };

  if (loading) return (
    <DashboardLayout>
      <div className="text-center py-16 text-gray-400">Loading project...</div>
    </DashboardLayout>
  );

  if (!project) return (
    <DashboardLayout>
      <div className="text-center py-16 text-red-500">Project not found.</div>
    </DashboardLayout>
  );

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-8">

        {/* ── Header ─────────────────────────────────────────────── */}
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <button
              onClick={() => navigate("/saved-projects")}
              className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 mb-4"
            >
              <FaArrowLeft size={12} />
              Back to Saved Projects
            </button>
            <h1 className="text-3xl font-bold text-gray-900">{project.title}</h1>
            <p className="mt-1 text-sm text-gray-400">
              Created on{" "}
              {new Date(project.createdAt).toLocaleDateString("en-US", {
                day: "numeric", month: "long", year: "numeric",
              })}
            </p>
          </div>

          {/* ── Buttons ──────────────────────────────────────────── */}
          <div className="flex items-center gap-2 flex-wrap">

            {/* JSON */}
            <button
              onClick={handleExportJSON}
              disabled={!!exporting}
              className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition disabled:opacity-50"
            >
              <FaFileCode size={13} />
              {exporting === "json" ? "Exporting…" : "Export JSON"}
            </button>

            {/* PDF */}
            <button
              onClick={handleExportPDF}
              disabled={!!exporting}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition disabled:opacity-50"
            >
              <FaFilePdf size={13} />
              {exporting === "pdf" ? "Opening…" : "Export PDF"}
            </button>

            {/* Delete */}
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 text-sm font-medium transition"
            >
              Delete
            </button>
          </div>
        </div>

        {/* ── Original Prompt ───────────────────────────────────── */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
          <p className="text-xs text-gray-400 uppercase font-semibold mb-1 tracking-wide">
            Original Prompt
          </p>
          <p className="text-gray-700">{project.prompt}</p>
        </div>

        {/* ── AI Output ─────────────────────────────────────────── */}
        <AIResponse projectData={project.generatedOutput} prompt={project.prompt} />

      </div>
    </DashboardLayout>
  );
};

export default ProjectDetail;