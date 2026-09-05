import { Router } from "express";
import {
  getApplications,
  createApplications,
  updateApplications,
  deleteApplications,
} from "../controllers/applicationsController.js";
const router = Router();

router.get("/", getApplications);
router.post("/", createApplications);
router.put("/:id", updateApplications);
router.delete("/:id", deleteApplications);
export default router;
