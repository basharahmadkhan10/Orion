import { Router } from "express";
import {
  startResearchRun,
  getResearchHistory,
  getResearchRunById,
} from "../controllers/research.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJWT);

router.route("/run").post(startResearchRun);
router.route("/history").get(getResearchHistory);
router.route("/:id").get(getResearchRunById);

export default router;

// Research routes v1
