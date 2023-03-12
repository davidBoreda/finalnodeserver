const { object } = require("joi");
const mongoose = require("mongoose");
const productsModel = require("./products.model");

const Schema = mongoose.Schema;

const favoriteSchema = new Schema({
  clientId: { type: String, required: true },
  clientName: { type: String, required: true },
  favoritesId: { type: Array, required: true },
});

const Favorite = mongoose.model("favorite", favoriteSchema);

const addNewFavorite = (favoriteData) => {
  const NewFavorite = new Favorite(favoriteData);
  return NewFavorite.save();
};

const findFavoriteByClientId = (clientId) => {
  return Favorite.findOne({ clientId });
};

const findByObjectIdAndUpdate = (_id, newArray) => {
  return Favorite.findByIdAndUpdate(_id, {
    favoritesId: newArray,
  });
};

const updateFavoriteByClientId = (clientId, { favArray, favoritesId }) => {
  return Favorite.findOneAndUpdate(clientId, {
    // ["favoritesId"]: favoritesId.push(...favoritesId, favoritesId),
    favoritesId: [...favArray, favoritesId],
  });
};

module.exports = {
  addNewFavorite,
  findFavoriteByClientId,
  findByObjectIdAndUpdate,
  updateFavoriteByClientId,
};
