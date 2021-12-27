const mysql = require("mysql");

exports.getAllUser = (req, res) => {
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "electron",
  });

  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = `SELECT userID, username, role FROM user`;
    con.query(sql, function (err, result) {
      if (err) return res.status(403).json(err);
      return res.status(200).json(result);
    });
  });
};
