const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

const User = require("../models/userModel");

exports.register = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.json(errors.array());
  }

  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) return res.status(401).json(err);

    const user = new User({
      username: req.body.username,
      password: hash,
    });

    user.save((err, result) => {
      if (err) return res.status(401).json(err);

      return res.status(200).json({ msg: "User Created" });
    });
  });
};

exports.login = (req, res) => {
  //   console.log(req.headers.authorization);
  User.findOne({ username: req.body.username }, (err, user) => {
    if (err || !user) {
      return res.status(401).json({
        error: "Username and Password is Invalid!",
      });
    }

    bcrypt.compare(req.body.password, user.password, (err, result) => {
      if (!result) {
        return res.status(401).json({
          error: "Username and Password is Invalid!",
        });
      }

      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRETE, {
        expiresIn: "5d",
      });

      const { _id, username, role } = user;

      return res.json({ token, user: { _id, username, role }, error: false });
    });
  });
};
