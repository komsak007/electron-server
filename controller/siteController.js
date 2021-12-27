const Site = require("../models/siteModel");
const Sensor = require("../models/sensorModel");
const mysql = require("mysql");

exports.getSites = (req, res) => {
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "electron",
  });

  var data = [
    {
      _id: "",
      site_id: "",
      site_name: "",
      site_code: "",
      site_type: "",
      organization: "",
      category: "",
      power_supply: "56",
      state: "",
      region: "",
      location: "",
      city: "",
      municipality: "",
      zip_code: "",
      elevation: "",
      master_elevation: "",
      latitude: "",
      longitude: "",
      network: "",
      equipment_owner: "",
      land_owner: "",
      equipment_housing: "",
      site_topography: "",
      description: "",
      sensor: [],
    },
  ];
  var sensorSub = [];

  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "SELECT site_name FROM site";
    var sql1 = "SELECT sensor_name, sub_site FROM sensor";
    con.query(sql, req.body, function (err, site) {
      if (err) return res.status(403).json(err);
      data.pop();

      con.query(sql1, req.body, function (err, sensor) {
        if (err) return res.status(403).json(err);
        site.map((s) => {
          sensorSub = [];
          s.sensor = undefined;

          sensor.map((sen) => {
            if (s.site_name === sen.sub_site) {
              sensorSub.push(sen.sensor_name);
            }
          });
          s.sensor = sensorSub;
          data.push(s);
        });
        // data.push({ siteName: site.site_name, sensor: site.site_name });
        return res.json(data);
        // return res.status(200).json({ site, sensor });
      });
    });
  });

  // var data = [
  //   {
  //     _id: "",
  //     site_id: "",
  //     site_name: "",
  //     site_code: "",
  //     site_type: "",
  //     organization: "",
  //     category: "",
  //     power_supply: "56",
  //     state: "",
  //     region: "",
  //     location: "",
  //     city: "",
  //     municipality: "",
  //     zip_code: "",
  //     elevation: "",
  //     master_elevation: "",
  //     latitude: "",
  //     longitude: "",
  //     network: "",
  //     equipment_owner: "",
  //     land_owner: "",
  //     equipment_housing: "",
  //     site_topography: "",
  //     description: "",
  //     sensor: [],
  //   },
  // ];
  // var sensorSub = [];
  // Site.find({}, (err, site) => {
  //   if (err) return res.status(403).json(err);
  //   data.pop();
  //   // data = site;
  //   // data.push({
  //   //   _id: "",
  //   //   site_id: "7878",
  //   //   site_name: "Phuket",
  //   //   site_code: "5454",
  //   //   site_type: "6876",
  //   //   organization: "876",
  //   //   category: "532",
  //   //   power_supply: "546",
  //   //   state: "456",
  //   //   region: "2313",
  //   //   location: "45645",
  //   //   city: "213123",
  //   //   municipality: "456456",
  //   //   zip_code: "7879",
  //   //   elevation: "54645",
  //   //   master_elevation: "213213",
  //   //   latitude: "6546",
  //   //   longitude: "7456",
  //   //   network: "213213",
  //   //   equipment_owner: "6456",
  //   //   land_owner: "213123",
  //   //   equipment_housing: "45645",
  //   //   site_topography: "3123",
  //   //   description: "45656",
  //   //   sensor: [],
  //   // });
  //   Sensor.find({}, (err, sensor) => {
  //     site.map((s) => {
  //       sensorSub = [];
  //       s.sensor = undefined;

  //       sensor.map((sen) => {
  //         if (s.site_name === sen.sub_site) {
  //           sensorSub.push(sen.sensor_name);
  //         }
  //       });
  //       s.sensor = sensorSub;
  //       data.push(s);
  //     });
  //     // data.push({ siteName: site.site_name, sensor: site.site_name });
  //     return res.json(data);
  //   });
  // });
};

exports.getOneSite = (req, res) => {
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "electron",
  });

  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = `SELECT * FROM site WHERE site_name = '${req.params.site_name}'`;
    con.query(sql, function (err, result) {
      if (err) return res.status(403).json(err);
      return res.status(200).json(result[0]);
    });
  });
};

exports.create = (req, res) => {
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "electron",
  });

  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "INSERT INTO site SET ? IS NOT NULL OR ''";
    con.query(sql, req.body, function (err, result) {
      if (err) return res.status(403).json(err);
      return res.status(200).json({ msg: "Site created" });
    });
  });
};

exports.editSite = (req, res) => {
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "electron",
  });

  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = `UPDATE site SET ? WHERE site_name = '${req.params.site_name}'`;
    con.query(sql, req.body, function (err, result) {
      if (err) return res.status(403).json(err);
      return res
        .status(200)
        .json({ msg: `Site ${req.params.site_name} Updated` });
    });
  });
};
