const mongoose = require("mongoose");

const SiteSchema = new mongoose.Schema(
  {
    site_id: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    site_name: {
      type: String,
      unique: true,
      required: true,
    },
    site_code: {
      type: String,
    },
    site_type: {
      type: String,
    },
    organization: {
      type: String,
    },
    category: {
      type: String,
    },
    power_supply: {
      type: String,
    },
    state: {
      type: String,
    },
    region: {
      type: String,
    },
    location: {
      type: String,
    },
    city: {
      type: String,
    },
    municipality: {
      type: String,
    },
    zip_code: {
      type: String,
    },
    elevation: {
      type: String,
    },
    master_elevation: {
      type: String,
    },
    latitude: {
      type: String,
    },
    longitude: {
      type: String,
    },
    network: {
      type: String,
    },
    equipment_owner: {
      type: String,
    },
    land_owner: {
      type: String,
    },
    equipment_housing: {
      type: String,
    },
    site_topography: {
      type: String,
    },
    description: {
      type: String,
    },
    sensor: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Site", SiteSchema);
