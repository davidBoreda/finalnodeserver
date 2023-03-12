const ResponseError = require("../module/ResponseError");
const debug = require("debug")("shopeee:validation");

const validateSchema = (userInput, schema) => {
  return new Promise((resolve, reject) => {
    schema
      .validateAsync(userInput, { abortEarly: false })
      .then((validatedValue) => {
        resolve(validatedValue);
      })
      .catch((err) => {
        let details = err.details.map((error) =>
          error.message.replaceAll('"', "")
        );

        reject(new ResponseError("validation", details));
      });
  });
};

module.exports = validateSchema;
