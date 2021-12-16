const router = require("express").Router();

const { checkToken } = require("../middleware/auth");
const {
  create,
  getSites,
  getOneSite,
} = require("../controller/siteController");

router.get("/site", getSites);
router.get("/site/:site_name", checkToken, getOneSite);
router.post("/site/create", checkToken, create);

module.exports = router;
