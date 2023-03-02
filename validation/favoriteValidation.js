const Joi = require("joi");
const validate = require("./validation");

const newFavoriteSchema = Joi.object({
  clientId: Joi.string().hex().required(),
  clientName: Joi.string().min(3).max(255).alphanum().required().trim(),
  favoritesId: Joi.string().hex().required(),
});

const validateNewFavoriteSchema = (userInput) =>
  validate(userInput, newFavoriteSchema);

module.exports = {
  validateNewFavoriteSchema,
};
