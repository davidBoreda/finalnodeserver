const Joi = require("joi");
const validate = require("./validation");
const debug = require("debug")("shopeee:productsValidation");

const showAllSchema = Joi.object({
  pageNum: Joi.number().min(1),
  itemsPerPage: Joi.number().min(1).max(100),
});

const newProductSchema = Joi.object({
  name: Joi.string().min(3).max(255).trim().required(),
  brand: Joi.string().max(50).trim().required(),
  description: Joi.string().max(500).trim(),
  price: Joi.number().min(0).required(),
  stockQuant: Joi.number().min(0).required(),
  picture: Joi.string().trim(),
});

const editProductSchema = Joi.object({
  name: Joi.string().min(3).max(255).trim(),
  brand: Joi.string().max(50).trim(),
  description: Joi.string().max(500).trim(),
  price: Joi.number().min(0).max(10000),
  stockQuant: Joi.number().min(0).max(100),
  _id: Joi.string().min(24).max(24).required(),
});

const removeProductSchema = Joi.object({
  id: Joi.string().trim().hex().length(24).required(),
});
const searchNameOrBrandSchema = Joi.object({
  name: Joi.string().min(3).max(255).trim(),
  brand: Joi.string().max(50).trim(),
});

const validateAllProductsSchema = (productInput) =>
  validate(productInput, showAllSchema);

const validateAddNewProductSchema = (productInput) =>
  validate(productInput, newProductSchema);

const validateRemoveProductSchema = (productInput) =>
  validate(productInput, removeProductSchema);

const validateEditProductSchema = (productInput) =>
  validate(productInput, editProductSchema);

const validateSearchByNameOrBrandSchema = (productInput) =>
  validate(productInput, searchNameOrBrandSchema);

module.exports = {
  validateAllProductsSchema,
  validateAddNewProductSchema,
  validateRemoveProductSchema,
  validateEditProductSchema,
  validateSearchByNameOrBrandSchema,
};
