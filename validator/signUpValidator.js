const { body, validationResult } = require("express-validator");

exports.signUpValidator = (req, res, next) => {
  body("username", "Username is required").not().isEmpty();
  body("password", "Password is required").not().isEmpty();
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must contain at least 6 characters");

  console.log(validationResult(req));

  next();
};
