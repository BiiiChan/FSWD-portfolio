const express = require("express");
const router = express.Router();
const Skill = require("../models/Skill");
const auth = require("../middleware/auth");

// Get all skills (public)
router.get("/", async (req, res) => {
  const skills = await Skill.find();
  res.json(skills);
});

// Add skill (admin)
router.post("/", auth, async (req, res) => {
  const skill = new Skill(req.body);
  await skill.save();
  res.json(skill);
});

// Update skill
router.put("/:id", auth, async (req, res) => {
  const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(skill);
});

// Delete skill
router.delete("/:id", auth, async (req, res) => {
  await Skill.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
});

module.exports = router;
