const Sensor = require("../models/sensorModel");
const Site = require("../models/siteModel");

exports.createSensor = (req, res) => {
  Site.findOne({ site_name: req.params.site_name }, (err, result) => {
    if (err) return res.status(405).json(err);
    var sensorSite = result.sensor;
    sensorSite.push(req.body.sensor_name);

    Site.findOneAndUpdate(
      { site_name: req.params.site_name },
      {
        sensor: sensorSite,
      },
      { new: true },
      (err, result) => {
        if (err) return res.status(405).json(err);

        const sensor = new Sensor(req.body);
        sensor.sub_site = req.params.site_name;
        sensor.save((err, saveData) => {
          if (err) return res.status(405).json(err);

          return res.json({ msg: "Sensor Create!" });
        });
      }
    );
  });
};

exports.getSensor = (req, res) => {
  Sensor.findOne(
    {
      $and: [
        { sensor_name: req.params.sensor_name },
        { site_name: req.params.site_name },
      ],
    },
    (err, result) => {
      return res.json(result);
    }
  );
};
