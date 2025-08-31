const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
const auth = require("../middleware/auth");

// Create
router.post("/", auth, async (req, res) => {
  try {
    const { title, description, link } = req.body;
    const project = new Project({
      title,
      description,
      link,
      owner: req.userId,
    });
    await project.save();
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Read all (for a user)
router.get("/", auth, async (req, res) => {
  try {
    const projects = await Project.find({ owner: req.userId }).sort({
      createdAt: -1,
    });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update
router.put("/:id", auth, async (req, res) => {
  try {
    const project = await Project.findOneAndUpdate(
      { _id: req.params.id, owner: req.userId },
      { $set: req.body },
      { new: true }
    );
    if (!project) return res.status(404).json({ msg: "Not found" });
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete
router.delete("/:id", auth, async (req, res) => {
  try {
    const project = await Project.findOneAndDelete({
      _id: req.params.id,
      owner: req.userId,
    });
    if (!project) return res.status(404).json({ msg: "Not found" });
    res.json({ msg: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
