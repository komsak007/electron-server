const router = require("express").Router();

const { createSensor, getSensor } = require("../controller/sensorController");
const { checkToken } = require("../middleware/auth");

router.post("/:site_name/add", createSensor);
router.get("/:site_name/sensor/:sensor_name", checkToken, getSensor);

module.exports = router;
