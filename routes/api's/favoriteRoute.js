const express = require("express");
const router = express.Router();
const favoriteModel = require("../../model/favorite.model");
const ResponseError = require("../../module/ResponseError");
const mwAuth = require("../../middleware/mw.token.auth");
const productsModel = require("../../model/products.model");
const favoriteValidation = require("../../validation/favoriteValidation");
const clientsModel = require("../../model/clients.model");
// API for initial creation of a list of favorites - only for registered clients after login
router.post("/newfavorite", mwAuth, async (req, res) => {
  try {
    const clientId = req.userData;
    const { favoritesId } = await favoriteValidation.validateNewFavoriteSchema(
      req.body
    );
    const existingFavorite = await favoriteModel.findFavoriteByClientId(
      clientId
    );
    if (existingFavorite) {
      for (id of existingFavorite.favoritesId) {
        if (id == favoritesId) {
          throw new ResponseError("db", ["this product is already in list"]);
        }
      }
      let newArray = [...existingFavorite.favoritesId, favoritesId];
      await favoriteModel.findByObjectIdAndUpdate(
        existingFavorite._id,
        newArray
      );
      res.json({ msg: "favorite added" });
    } else {
      let clientName = await clientsModel.findClientNameById(clientId);
      clientName = clientName.fName;
      await favoriteModel.addNewFavorite({ favoritesId, clientId, clientName });
      res.json({ msg: "favorite created" });
    }
  } catch (err) {
    res.status(400).json({ err });
  }
});

// API that adds to list of favorites - only for registered clients after login
router.patch("/addtofavorite", mwAuth, async (req, res) => {
  try {
    const validateData = await favoriteValidation.validateAddToFavorite(
      req.body
    );
    const existingFavorite = await favoriteModel.findFavoriteByClientId(
      validateData.clientId
    );
    if (existingFavorite) {
      for (id of existingFavorite.favoritesId) {
        if (id == validateData.favoritesId) {
          throw new ResponseError("db", ["this product is already in list"]);
        }
      }
      let newArray = [
        ...existingFavorite.favoritesId,
        validateData.favoritesId,
      ];
      await favoriteModel.findByObjectIdAndUpdate(
        existingFavorite._id,
        newArray
      );
      res.json({ msg: "favorite added" });
    } else {
      throw new ResponseError("db", [
        "no favorite list for this user, please create one first",
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
        throw new ResponseError("db", [
          "no favorite list for this user, please create one first",
        ]);
      }
      let fullProductArray = [];
      for (id of data.favoritesId) {
        let favoriteProduct = await productsModel.findProductById(id);
        fullProductArray.push(favoriteProduct);
      }
      res.json(fullProductArray);
    } else {
      throw new ResponseError("db", ["no access"]);
    }
  } catch (err) {
    res.status(400).json({ err });
  }
});

// API that finds show list of favorites - only for registered clients after login - more friendly use
router.get("/showfavorite2", mwAuth, async (req, res) => {
  try {
    const data = await favoriteModel.findFavoriteByClientId(req.userData);
    if (!data) {
      throw new ResponseError("db", [
        "no favorite list for this user, please create one first",
      ]);
    }
    let fullFavoriteProductArray = [];
    for (id of data.favoritesId) {
      let favoriteProduct = await productsModel.findProductById(id);
      fullFavoriteProductArray.push(favoriteProduct);
    }
    res.json(fullFavoriteProductArray);
  } catch (err) {
    res.status(400).json({ err });
  }
});

module.exports = router;
