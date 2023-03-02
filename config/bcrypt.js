const bcrypt = require("bcryptjs");

const encryptPass = (password) => bcrypt.hash(password, 10);

const cmpEncryption = (password, hash) => bcrypt.compare(password, hash);

module.exports = {
  encryptPass,
  cmpEncryption,
};
