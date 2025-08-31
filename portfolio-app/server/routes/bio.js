const express = require("express");
const router = express.Router();
const Bio = require("../models/Bio");
const auth = require("../middleware/auth");

// Create or update (upsert)
router.post("/", auth, async (req, res) => {
  try {
    const { fullName, title, about, contactEmail } = req.body;
    let bio = await Bio.findOne({ owner: req.userId });
    if (bio) {
      bio.fullName = fullName;
      bio.title = title;
      bio.about = about;
      bio.contactEmail = contactEmail;
      await bio.save();
    } else {
      bio = new Bio({
        fullName,
        title,
        about,
        contactEmail,
        owner: req.userId,
      });
      await bio.save();
    }
    res.json(bio);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Read
router.get("/", auth, async (req, res) => {
  try {
    const bio = await Bio.findOne({ owner: req.userId });
    res.json(bio || {});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete
router.delete("/", auth, async (req, res) => {
  try {
    await Bio.findOneAndDelete({ owner: req.userId });
    res.json({ msg: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
