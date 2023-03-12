const Joi = require("joi");
const validate = require("./validation");

const newFavoriteSchema = Joi.object({
  clientId: Joi.string().hex().required(),
  clientName: Joi.string().min(3).max(255).alphanum().required().trim(),
  favoritesId: Joi.string().hex().required(),
});

const addFavoriteSchema = Joi.object({
  clientId: Joi.string().required(),
  favoritesId: Joi.string().required(),
});

const validateNewFavoriteSchema = (userInput) =>
  validate(userInput, newFavoriteSchema);

const validateAddToFavorite = (userInput) =>
  validate(userInput, addFavoriteSchema);

module.exports = {
  validateNewFavoriteSchema,
  validateAddToFavorite,
};
