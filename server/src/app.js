import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/error.middleware.js";

import authRouter from "./routes/auth.routes.js";
import researchRouter from "./routes/research.routes.js";
import companyRouter from "./routes/company.routes.js";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

// Health Check route
app.get("/api/v1/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "AI Investment Research Desk Backend is Healthy" });
});

// API Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/research", researchRouter);
app.use("/api/v1/companies", companyRouter);

// Centralized error handler (must be last)
app.use(errorHandler);

export { app };
