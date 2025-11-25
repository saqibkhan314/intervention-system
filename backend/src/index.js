import express from "express";
import cors from "cors";
import studentRoutes from "../routes/studentRoutes.js";
import interventionRoutes from "../routes/interventionRoutes.js";
import webhookRoutes from "../routes/webhookRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/students", studentRoutes);
app.use("/interventions", interventionRoutes);
app.use("/webhook", webhookRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
