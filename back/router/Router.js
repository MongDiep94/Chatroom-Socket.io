import express from "express";

export const router = express.Router();

router.get("/api", (req, res) => {
  res.json({
    message: "Hello",
  });
});

router.get("/chat", (req, res) => {
  res.send("Chatroom");
});
