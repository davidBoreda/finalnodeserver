const Joi = require("joi");
const validate = require("./validation");

const orderSchema = Joi.object({
  productId: Joi.string().min(3).max(255).trim().required(),
});

const validateOrderSchema = (productInput) =>
  validate(productInput, orderSchema);

module.exports = {
  validateOrderSchema,
};
