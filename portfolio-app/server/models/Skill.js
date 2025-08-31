const mongoose = require("mongoose");

const SkillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  level: { type: String },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Skill", SkillSchema);
