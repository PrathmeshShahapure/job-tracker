import { Router } from "express";
import {
  getApplications,
  createApplications,
} from "../controllers/applicationsController.js";
const router = Router();

router.get("/", getApplications);
router.post("/", createApplications);
export default router;
