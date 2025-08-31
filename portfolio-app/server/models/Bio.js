const mongoose = require("mongoose");

const BioSchema = new mongoose.Schema({
  fullName: { type: String },
  title: { type: String },
  about: { type: String },
  contactEmail: { type: String },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Bio", BioSchema);
