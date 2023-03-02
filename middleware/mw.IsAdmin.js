const jwt = require("../config/jwt");
const ResponseError = require("../module/ResponseError");
const clientsModel = require("../model/clients.model");

module.exports = async (req, res, next) => {
  try {
    const payload = await jwt.verifyToken(req.headers["token"]);
    req.userData = payload.id;
    const clientInfo = await clientsModel.isAdminById(req.userData);
    console.log(clientInfo);
    if (clientInfo.isAdmin) {
      next();
    } else {
      throw new ResponseError("DB", ["Limited Access API"]);
    }
  } catch (err) {
    res.status(403).json(err);
  }
};
