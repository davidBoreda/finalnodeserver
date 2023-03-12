const jwt = require("../config/jwt");
const ResponseError = require("../module/ResponseError");
const clientsModel = require("../model/clients.model");
const debug = require("debug")("shopeee:mw.isAdmin");

// admin verification using id encoded in token - middleware
module.exports = async (req, res, next) => {
  try {
    const payload = await jwt.verifyToken(req.headers["token"]);
    req.userData = payload.id;
    const clientInfo = await clientsModel.isAdminById(req.userData);
    if (clientInfo) {
      if (clientInfo.isAdmin) {
        next();
      } else {
        throw new ResponseError("DB", ["Limited Access API"]);
      }
    } else {
      throw new ResponseError("DB", ["Not recognizes ID"]);
    }
  } catch (err) {
    res.status(403).json(err);
  }
};
