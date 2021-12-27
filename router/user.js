const router = require("express").Router();

const { checkToken, checkAdmin } = require("../middleware/auth");
const { getAllUser } = require("../controller/userController");

router.get("/users", checkToken, checkAdmin, getAllUser);

module.exports = router;
