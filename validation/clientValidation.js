const { object } = require("joi");
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
  clientAddress: {
    city: Joi.string().min(3).max(255).trim().required(),
    street: Joi.string().min(3).max(255).trim().required(),
    houseNum: Joi.number().min(0).required(),
  },
});

const registerByAdminSchema = Joi.object({
  fName: Joi.string().min(3).max(255).alphanum().required().trim(),
  lName: Joi.string().min(3).max(255).alphanum().required().trim(),
  email: Joi.string().min(3).max(255).email().required().trim(),
  isAdmin: Joi.boolean(),
  vipClient: Joi.boolean(),
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
  clientAddress: {
    city: Joi.string().min(3).max(255).trim().required(),
    street: Joi.string().min(3).max(255).trim().required(),
    houseNum: Joi.number().min(0).required(),
  },
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

const editClientSchema = Joi.object({
  fName: Joi.string().min(3).max(255).alphanum().trim(),
  lName: Joi.string().min(3).max(255).alphanum().trim(),
  age: Joi.number(),
  picture: Joi.string().trim(),
  clientAddress: {
    city: Joi.string().min(3).max(255).trim(),
    street: Joi.string().min(3).max(255).trim(),
    houseNum: Joi.number().min(0),
  },
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

const validateRegisterByAdminSchema = (userInput) =>
  validate(userInput, registerByAdminSchema);

const validateLoginSchema = (userInput) => validate(userInput, loginSchema);

const validateNewPassSchema = (userInput) => validate(userInput, newPassSchema);

const validateUnBlockSchema = (userMail) => validate(userMail, unBlockSchema);

const validateEditClient = (userInput) => validate(userInput, editClientSchema);

module.exports = {
  validateRegisterSchema,
  validateRegisterByAdminSchema,
  validateLoginSchema,
  validateNewPassSchema,
  validateUnBlockSchema,
  validateEditClient,
};
