const mongoose = require("mongoose");

const SiteSchema = new mongoose.Schema({}, { timestamps: true });

module.exports = mongoose.model("Site", SiteSchema);
