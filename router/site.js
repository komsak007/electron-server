const router = require("express").Router();

const { checkToken, checkAdmin } = require("../middleware/auth");
const {
  create,
  getSites,
  getOneSite,
  editSite,
} = require("../controller/siteController");

router.get("/site", getSites);
router.get("/site/:site_name", checkToken, checkAdmin, getOneSite);
router.post("/site/create", checkToken, create);
router.put("/site/edit/:site_name", checkToken, editSite);

module.exports = router;
