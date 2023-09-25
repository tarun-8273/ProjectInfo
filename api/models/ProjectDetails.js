const mongoose = require("mongoose");

const projectDetailSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: String,
  technologies: String,
  frontend: String,
  backend: String,
  databases: String,
  infrastructure: String,
});

const ProjectDetailModel = mongoose.model("Project", projectDetailSchema);

module.exports = ProjectDetailModel;
