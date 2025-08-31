const express = require("express");
const router = express.Router();
const Skill = require("../models/Skill");
const auth = require("../middleware/auth");

// Create
router.post("/", auth, async (req, res) => {
  try {
    const { name, level } = req.body;
    const skill = new Skill({ name, level, owner: req.userId });
    await skill.save();
    res.json(skill);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Read
router.get("/", auth, async (req, res) => {
  try {
    const skills = await Skill.find({ owner: req.userId });
    res.json(skills);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update
router.put("/:id", auth, async (req, res) => {
  try {
    const skill = await Skill.findOneAndUpdate(
      { _id: req.params.id, owner: req.userId },
      { $set: req.body },
      { new: true }
    );
    if (!skill) return res.status(404).json({ msg: "Not found" });
    res.json(skill);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete
router.delete("/:id", auth, async (req, res) => {
  try {
    const skill = await Skill.findOneAndDelete({
      _id: req.params.id,
      owner: req.userId,
    });
    if (!skill) return res.status(404).json({ msg: "Not found" });
    res.json({ msg: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
