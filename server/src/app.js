import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/error.middleware.js";

import authRouter from "./routes/auth.routes.js";
import researchRouter from "./routes/research.routes.js";
import companyRouter from "./routes/company.routes.js";

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
];

if (process.env.CORS_ORIGIN) {
  const origins = process.env.CORS_ORIGIN.split(",").map(o => o.trim().replace(/\/$/, ""));
  allowedOrigins.push(...origins);
}

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      const normalizedOrigin = origin.replace(/\/$/, "");
      const isAllowed = allowedOrigins.includes(normalizedOrigin) || 
                        normalizedOrigin.endsWith(".vercel.app");
      if (isAllowed) {
        callback(null, true);
      } else {
        callback(new Error(`Origin ${origin} not allowed by CORS`));
      }
    },
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());


app.get("/api/v1/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "AI Investment Research Desk Backend is Healthy" });
});


app.use("/api/v1/auth", authRouter);
app.use("/api/v1/research", researchRouter);
app.use("/api/v1/companies", companyRouter);


app.use(errorHandler);

export { app };




