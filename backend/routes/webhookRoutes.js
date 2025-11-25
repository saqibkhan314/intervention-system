import express from "express";

const router = express.Router();

router.post("/n8n", (req, res) => {
  console.log("Webhook triggered:", req.body);
  res.json({ ok: true });
});

export default router;
