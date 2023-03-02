const express = require("express");
const router = express.Router();
const favoriteModel = require("../../model/favorite.model");
const ResponseError = require("../../module/ResponseError");
const mwAuth = require("../../middleware/mw.token.auth");
const productsModel = require("../../model/products.model");
const favoriteValidation = require("../../validation/favoriteValidation");
const debug = require("debug")("finalnodeserver:favoriteRouter");

router.post("/newfavorite", mwAuth, async (req, res) => {
  // router.post("/newfavorite", async (req, res) => {
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

router.patch("/addtofavorite", mwAuth, async (req, res) => {
  try {
    if (req.userData != req.body.clientId)
      throw new ResponseError("server", ["Client ID does not match"]);
    const validateData = await favoriteValidation.validateAddToFavorite(
      req.body
    );
    // debug(validateData);
    const exsitingFavorite = await favoriteModel.findFavoriteByClientId(
      validateData.clientId
    );
    // debug(exsitingFavorite);
    if (exsitingFavorite) {
      let newArry = [...exsitingFavorite.favoritesId, validateData.favoritesId];
      debug(newArry);
      // const updatedObject = await favoriteModel.findByObjectIdAndUpdate(
      await favoriteModel.findByObjectIdAndUpdate(
        exsitingFavorite._id,
        newArry
      );
      const updatedFavoriteObject = await favoriteModel.findFavoriteByClientId(
        req.userData
      );
      debug(updatedFavoriteObject);
      let fullFavoriteProductArry = [];
      for (item of updatedFavoriteObject.favoritesId) {
        let favoriteProduct = await productsModel.findProductById(item);
        fullFavoriteProductArry.push(favoriteProduct);
        debug(item);
      }
      res.json(fullFavoriteProductArry);
      // debug("after update" + updatedObject);
      // res.json({ updatedObject });
    } else {
      throw new ResponseError("db", [
        "no favorite list for this user, please ceate one first",
      ]);
    }
  } catch (err) {
    res.status(400).json({ err });
  }
});

// router.get("/showfavorite", mwAuth, async (req, res) => {
//   try {
//     const data = await favoriteModel.findFavoriteByClientId(req.query.clientId);
//     if (req.query.clientId === req.userData) {
//       if (!data) {
//         throw new ResponseError("db", ["no favorite list for this user"]);
//       }
//       let fullProductArry = [];
//       for (id of data.favoritesId) {
//         let favoriteProduct = await productsModel.findProductById(id);
//         fullProductArry.push(favoriteProduct);
//       }
//       res.json(fullProductArry);
//     } else {
//       throw new ResponseError("db", ["no access"]);
//     }
//   } catch (err) {
//     res.status(400).json({ err });
//   }
// });

router.get("/showfavorite2", mwAuth, async (req, res) => {
  // router.get("/showfavorite2", async (req, res) => {
  try {
    const data = await favoriteModel.findFavoriteByClientId(req.userData);
    if (!data) {
      throw new ResponseError("db", ["no favorite list for this user"]);
    }
    let fullFavoriteProductArry = [];
    for (id of data.favoritesId) {
      let favoriteProduct = await productsModel.findProductById(id);
      fullFavoriteProductArry.push(favoriteProduct);
    }
    res.json(fullFavoriteProductArry);
  } catch (err) {
    res.status(400).json({ err });
  }
});

module.exports = router;
