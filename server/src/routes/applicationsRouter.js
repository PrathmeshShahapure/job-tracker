import { Router } from "express";
import {
  getApplications,
  createApplications,
  updateApplications,
} from "../controllers/applicationsController.js";
const router = Router();

router.get("/", getApplications);
router.post("/", createApplications);
router.put("/:id", updateApplications);

export default router;
