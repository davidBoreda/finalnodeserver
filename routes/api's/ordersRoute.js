const express = require("express");
const router = express.Router();
const ordersModel = require("../../model/orders.model");
const ResponseError = require("../../module/ResponseError");
const mwAuth = require("../../middleware/mw.token.auth");

const debug = require("debug")("finalnodeserver:ordersRouter");

router.post("/neworder", mwAuth, async (req, res) => {
  try {
    debug(req.body);
    const validateData = await favoriteValidation.validateNewFavoriteSchema(
      req.body
    );
    await favoriteModel.addNewFavorite(validateData);
    res.json({ msg: "favorite created" });
  } catch (err) {
    debug(err);
    res.status(400).json({ err });
  }
});

module.exports = router;
