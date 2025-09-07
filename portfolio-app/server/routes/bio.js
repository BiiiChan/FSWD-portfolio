const express = require("express");
const router = express.Router();
const Bio = require("../models/Bio");
const auth = require("../middleware/auth");

// Get bio (public)
router.get("/", async (req, res) => {
  const bio = await Bio.findOne();
  res.json(bio);
});

// Update bio (only admin)
router.put("/", auth, async (req, res) => {
  try {
    const updated = await Bio.findOneAndUpdate({}, req.body, {
      new: true,
      upsert: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
