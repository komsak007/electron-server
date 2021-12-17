const mongoose = require("mongoose");

const SensorSchema = new mongoose.Schema(
  {
    sensor_name: {
      type: String,
      required: true,
      unique: false,
    },
    chanel_address: {
      type: String,
    },
    unit: {
      type: String,
    },
    serial: {
      type: String,
    },
    low_range: {
      type: String,
    },
    high_range: {
      type: String,
    },
    threshold: {
      type: String,
    },
    hr_thresh: {
      type: String,
    },
    pollutant_type: {
      type: String,
    },
    view_format: {
      type: String,
    },
    state: {
      type: String,
    },
    average: {
      type: String,
    },
    sub_site: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Sensor", SensorSchema);
