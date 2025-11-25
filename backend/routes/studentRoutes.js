import express from "express";
import { dailyCheckin, getStudentStatus } from "../controllers/studentController.js";

const router = express.Router();

router.post("/daily-checkin", dailyCheckin);
router.get("/status/:id", getStudentStatus);

export default router;
