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

const findByObjectIdAndUpdate = (_id, newArry) => {
  return Favorite.findByIdAndUpdate(_id, {
    favoritesId: newArry,
  });
};

// const updateFavoriteByClientId = (clientId, { favArry, favoritesId }) => {
//   return Favorite.findOneAndUpdate(clientId, {
//     // ["favoritesId"]: favoritesId.push(...favoritesId, favoritesId),
//     ["favoritesId"]: [...favArry, favoritesId],
//   });
// };

module.exports = {
  addNewFavorite,
  findFavoriteByClientId,
  // updateFavoriteByClientId,
  findByObjectIdAndUpdate,
};
