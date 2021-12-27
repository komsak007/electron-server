const Sensor = require("../models/sensorModel");
const Site = require("../models/siteModel");
const mysql = require("mysql");

exports.createSensor = (req, res) => {
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "electron",
  });

  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "INSERT INTO sensor SET ?";
    let post = {
      sensor_name: req.body.sensor_name,
      chanel_address: req.body.chanel_address,
      unit: req.body.unit,
      serial: req.body.serial,
      low_range: req.body.low_range,
      high_range: req.body.high_range,
      threshold: req.body.threshold,
      hr_thresh: req.body.hr_thresh,
      pollutant_type: req.body.pollutant_type,
      view_format: req.body.view_format,
      state: req.body.state,
      average: req.body.average,
      sub_site: req.params.site_name,
    };
    con.query(sql, post, function (err, result) {
      if (err) return res.status(403).json(err);
      return res.json({ msg: "Sensor Create!" });
    });
  });
};

exports.getSensor = (req, res) => {
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "electron",
  });

  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = `SELECT * FROM sensor WHERE sensor_name = '${req.params.sensor_name}' AND sub_site = '${req.params.site_name}'`;
    con.query(sql, req.body, function (err, result) {
      if (err) return res.status(403).json(err);
      return res.status(200).json(result[0]);
    });
  });
};

exports.editSensor = (req, res) => {
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "electron",
  });

  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = `UPDATE sensor SET ? WHERE sensor_name = '${req.params.sensor_name}' AND sub_site = '${req.params.site_name}'`;
    let post = {
      sensor_name: req.body.sensor_name,
      chanel_address: req.body.chanel_address,
      unit: req.body.unit,
      serial: req.body.serial,
      low_range: req.body.low_range,
      high_range: req.body.high_range,
      threshold: req.body.threshold,
      hr_thresh: req.body.hr_thresh,
      pollutant_type: req.body.pollutant_type,
      view_format: req.body.view_format,
      state: req.body.state,
      average: req.body.average,
      sub_site: req.params.site_name,
    };
    con.query(sql, post, function (err, result) {
      if (err) return res.status(403).json(err);
      return res.json({
        msg: `Sensor ${req.params.sensor_name} in ${req.params.site_name} Updated`,
      });
    });
  });
};
