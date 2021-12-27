const router = require("express").Router();

const {
  createSensor,
  getSensor,
  editSensor,
} = require("../controller/sensorController");
const { checkToken } = require("../middleware/auth");

router.post("/:site_name/add", checkToken, createSensor);
router.get("/:site_name/sensor/:sensor_name", checkToken, getSensor);
router.put("/:site_name/sensor/edit/:sensor_name", checkToken, editSensor);

module.exports = router;
