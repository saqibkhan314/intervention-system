import express from "express";
import { assignIntervention, markTaskComplete } from "../controllers/interventionController.js";

const router = express.Router();

router.post("/assign", assignIntervention);
router.post("/complete/:id", markTaskComplete);

export default router;
