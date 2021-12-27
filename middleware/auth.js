const jwt = require("jsonwebtoken");
const mysql = require("mysql");

exports.checkToken = (req, res, next) => {
  const tokenUser = req.headers.authorization;
  // const tokenLength = tokenUser.split(" ").length;
  if (!tokenUser) return res.status(401).json({ err: "Token Invalid" });

  const token = tokenUser.split(" ")[1];

  if (!token) return res.status(401).json({ err: "Token Invalid" });

  jwt.verify(token, process.env.JWT_SECRETE, (err, decoded) => {
    if (err)
      return res.status(401).json({ err: "Token Invalid", status: false });

    req.decoded = decoded;

    // console.log(decoded);

    next();
  });
};

exports.checkAdmin = (req, res, next) => {
  const id = req.decoded._id;

  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "electron",
  });

  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = `SELECT * FROM user WHERE userID = '${id}'`;
    con.query(sql, function (err, result) {
      if (err) return res.status(403).json(err);
      if (result[0].role !== "admin") {
        return res.status(401).json({ err: "Access Denied" });
      }
      next();
    });
  });
};
