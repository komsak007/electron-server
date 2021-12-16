const router = require("express").Router();
const { body } = require("express-validator");

const { register, login } = require("../controller/authController");
const { signUpValidator } = require("../validator/signUpValidator");

router.post(
  "/register",
  body("username", "Username is required").not().isEmpty(),
  body("password", "Password is required").not().isEmpty(),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must contain at least 6 characters"),
  register
);
router.post("/login", login);

module.exports = router;
