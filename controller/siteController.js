const Site = require("../models/siteModel");

exports.getSites = (req, res) => {
  Site.find({}, (err, site) => {
    if (err) return res.status(403).json(err);

    return res.json(site);
  });
};

exports.getOneSite = (req, res) => {
  Site.findOne({ site_name: req.params.site_name }, (err, result) => {
    if (err) return res.status(403).json(err);

    return res.json(result);
  });
};

exports.create = (req, res) => {
  console.log(req.body);

  const site = new Site(req.body);

  site.save((err, result) => {
    if (err) return res.status(403).json(err);

    return res.status(200).json({ msg: "Site created" });
  });
};
