const jwt = require("jsonwebtoken");

const initializeToken = (payload, exp = "5d") => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.JWTSECERTKEY,
      { expiresIn: exp },
      (err, token) => {
        if (err) {
          reject(err);
        } else {
          resolve(token);
        }
      }
    );
  });
};

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWTSECERTKEY, (err, payload) => {
      if (err) reject(err);
      else resolve(payload);
    });
  });
};

module.exports = {
  initializeToken,
  verifyToken,
};
