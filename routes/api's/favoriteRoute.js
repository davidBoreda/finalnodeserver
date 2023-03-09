const express = require("express");
const router = express.Router();
const favoriteModel = require("../../model/favorite.model");
const ResponseError = require("../../module/ResponseError");
const mwAuth = require("../../middleware/mw.token.auth");
const productsModel = require("../../model/products.model");
const favoriteValidation = require("../../validation/favoriteValidation");

//API for initial creation of a list of favorites - only for registered clients after login
router.post("/newfavorite", mwAuth, async (req, res) => {
  try {
    const validateData = await favoriteValidation.validateNewFavoriteSchema(
      req.body
    );
    await favoriteModel.addNewFavorite(validateData);
    res.json({ msg: "favorite created" });
  } catch (err) {
    res.status(400).json({ err });
  }
});

// API that adds to list of favorites - only for registered clients after login
router.patch("/addtofavorite", mwAuth, async (req, res) => {
  try {
    const exsitingFavorite = await favoriteModel.findFavoriteByClientId(
      req.userData
    );
    if (exsitingFavorite) {
      const test = await favoriteModel.updateFavoriteByClientId(
        exsitingFavorite.clientId,
        exsitingFavorite.favoritesId,
        req.body.favoritesId
      );
      res.json({ msg: "favorite added" });
    } else {
      throw new ResponseError("db", [
        "no favorite list for this user, please ceate one first",
      ]);
    }
  } catch (err) {
    res.status(400).json({ err });
  }
});

// API that finds show list of favorites - only for registered clients after login
router.get("/showfavorite", mwAuth, async (req, res) => {
  try {
    const data = await favoriteModel.findFavoriteByClientId(req.query.clientId);
    if (req.query.clientId === req.userData) {
      if (!data) {
        throw new ResponseError("db", ["no favorite list for this user"]);
      }
      let fullProductArry = [];
      for (id of data.favoritesId) {
        let favoriteProduct = await productsModel.findProductById(id);
        fullProductArry.push(favoriteProduct);
      }
      res.json(fullProductArry);
    } else {
      throw new ResponseError("db", ["no access"]);
    }
  } catch (err) {
    res.status(400).json({ err });
  }
});

// API that finds show list of favorites - only for registered clients after login - more frindly use
router.get("/showfavorite2", mwAuth, async (req, res) => {
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
