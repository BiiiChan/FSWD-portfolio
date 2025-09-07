const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
const auth = require("../middleware/auth");

// Get projects (public)
router.get("/", async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
});

// Add project (admin)
router.post("/", auth, async (req, res) => {
  const project = new Project(req.body);
  await project.save();
  res.json(project);
});

// Update project
router.put("/:id", auth, async (req, res) => {
  const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(project);
});

// Delete project
router.delete("/:id", auth, async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
});

module.exports = router;
