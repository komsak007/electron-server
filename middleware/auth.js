const jwt = require("jsonwebtoken");

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

    next();
  });
};
