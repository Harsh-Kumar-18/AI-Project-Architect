import express from "express";
import cors from "cors";

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://ai-project-architect-nine.vercel.app",
];

app.use(express.json());
app.use(
  cors({
    origin: (origin, callback) => {
      // allow no-origin requests (Postman, curl) + production + any Vercel preview URL
      if (
        !origin ||
        allowedOrigins.includes(origin) ||
        /\.vercel\.app$/.test(origin)
      ) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.get('/', (req, res) => {
    res.send('Hello World! This is the backend server.');
});

export default app;