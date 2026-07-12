import { Router } from "express";
import { searchCompanies } from "../controllers/company.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJWT);

router.route("/").get(searchCompanies);

export default router;
