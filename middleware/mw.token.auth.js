const jwt = require("../config/jwt");

// client verification using id encoded in token - middleware
module.exports = async (req, res, next) => {
  try {
    const payload = await jwt.verifyToken(req.headers["token"]);
    req.userData = payload.id;
    next();
  } catch (err) {
    res.status(401).json(err);
  }
};
