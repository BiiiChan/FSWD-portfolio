const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  link: { type: String },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Project", ProjectSchema);
