const Joi = require("joi");
const validate = require("./validation");

// const orderSchema = Joi.object({
//   clientID: Joi.string().min(3).max(255).trim().required(),
//   clientName: Joi.string().min(3).max(255).trim().required(),
//   clientAdress: {
//     city: Joi.string().min(3).max(255).trim().required(),
//     street: Joi.string().min(3).max(255).trim().required(),
//     houseNum: Joi.number().min(0).required(),
//   },
//   productId: Joi.string().min(3).max(255).trim().required(),
//   producName: Joi.string().min(3).max(255).trim().required(),
// });

const orderSchema = Joi.object({
  productId: Joi.string().min(3).max(255).trim().required(),
});

const validateOrderSchema = (productInput) =>
  validate(productInput, orderSchema);

module.exports = {
  validateOrderSchema,
};
