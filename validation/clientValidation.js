const Joi = require("joi");
const validate = require("./validation");

const registerSchema = Joi.object({
  fName: Joi.string().min(3).max(255).alphanum().required().trim(),
  lName: Joi.string().min(3).max(255).alphanum().required().trim(),
  email: Joi.string().min(3).max(255).email().required().trim(),
  password: Joi.string()
    .regex(
      new RegExp("^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+]).{0,}$")
    )
    .min(3)
    .max(255)
    .required()
    .messages({
      "string.pattern.base": "follow password rules",
    }),
  age: Joi.number(),
  picture: Joi.string().trim(),
});

const loginSchema = Joi.object({
  email: Joi.string().min(3).max(255).email().required().trim(),
  password: Joi.string()
    .regex(
      new RegExp("^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+]).{0,}$")
    )
    .min(3)
    .max(255)
    .required()
    .messages({
      "string.pattern.base": "follow password rules",
    }),
});

const newPassSchema = Joi.object({
  password: Joi.string()
    .regex(
      new RegExp("^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+]).{0,}$")
    )
    .min(3)
    .max(255)
    .required()
    .messages({
      "string.pattern.base": "follow password rules",
    }),
  repeatPassword: Joi.string()
    .regex(
      new RegExp("^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+]).{0,}$")
    )
    .min(3)
    .max(255)
    .required()
    .messages({
      "string.pattern.base": "follow password rules",
    }),
});

const unBlockSchema = Joi.object({
  email: Joi.string().min(3).max(255).email().required().trim(),
});

const validateRegisterSchema = (userInput) =>
  validate(userInput, registerSchema);

const validateLoginSchema = (userInput) => validate(userInput, loginSchema);

const validateNewPassSchema = (userInput) => validate(userInput, newPassSchema);

const validateUnBlockSchema = (userMail) => validate(userMail, unBlockSchema);

module.exports = {
  validateRegisterSchema,
  validateLoginSchema,
  validateNewPassSchema,
  validateUnBlockSchema,
};
