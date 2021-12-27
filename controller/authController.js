const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const mysql = require("mysql");

const User = require("../models/userModel");

exports.register = (req, res) => {
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "electron",
  });

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.json(errors.array());
  }

  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) return res.status(401).json(err);

    let post = {
      username: req.body.username,
      password: hash,
    };

    con.connect(function (err) {
      if (err) throw err;
      console.log("Connected!");
      var sql = "INSERT INTO user SET ?";
      con.query(sql, post, function (err, result) {
        if (err) return res.status(403).json(err);
        return res.json({ msg: "User Created!" });
      });
    });
  });
};

exports.login = (req, res) => {
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "electron",
  });

  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = `SELECT * FROM user WHERE username = '${req.body.username}'`;
    con.query(sql, req.body, async (err, user) => {
      if (err) return res.status(403).json(err);
      if (!user[0]) {
        return res.status(401).json({
          error: "Username and Password is Invalid!",
        });
      }
      await bcrypt.compare(
        req.body.password,
        user[0].password,
        (err, result) => {
          if (!result) {
            return res.status(401).json({
              error: "Username and Password is Invalid!",
            });
          }

          const token = jwt.sign(
            { _id: user[0].userID },
            process.env.JWT_SECRETE,
            {
              expiresIn: "5d",
            }
          );

          const { username, role } = user[0];

          return res.json({ token, user: { username, role }, error: false });
        }
      );
    });
  });
};
