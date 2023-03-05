const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//Defining fields and the structure of the collection
const clientSchema = new Schema({
  fName: { type: String, required: true },
  lName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: { type: Number },
  picture: { type: String },
  isAdmin: { type: Boolean, default: false },
  accountSecurity: {
    failedAttempts: { type: Number, default: 0 },
    accountBlocked: { type: Boolean, default: false },
    lastLoginAttempt: { type: Date, default: Date.now },
  },
  clientAdress: {
    city: { type: String, require: true },
    street: { type: String, require: true },
    houseNum: { type: String, require: true },
  },
});

//createing client collection and connecting to client schema
const Clients = mongoose.model("clients", clientSchema);

//function that gets data from client(after Joi validation) and save it in DB
const createNewClient = (clientData) => {
  const newClient = new Clients(clientData);
  return newClient.save();
};

const editClient = (
  id,
  { fName, lName, age, clientAdress: { city, street, houseNum } }
) => {
  return Clients.findByIdAndUpdate(id, {
    fName,
    lName,
    age,
    clientAdress: {
      city,
      street,
      houseNum,
    },
  });
};

const findByMail = (email) => {
  return Clients.findOne({ email });
};

const isAdminById = (_id) => {
  return Clients.findById(_id);
};

const setFailedAttempt = (_id, num) => {
  return Clients.findByIdAndUpdate(_id, {
    "accountSecurity.failedAttempts": num,
    "accountSecurity.lastLoginAttempt": Date.now(),
  });
};

const setNewPass = (_id, password) => {
  return Clients.findByIdAndUpdate(_id, {
    password: password,
  });
};

const blockAccount = (_id) => {
  return Clients.findByIdAndUpdate(_id, {
    "accountSecurity.accountBlocked": true,
    "accountSecurity.failedAttempts": 0,
    "accountSecurity.lastLoginAttempt": Date.now(),
  });
};

const unblockAccount = (_id) => {
  return Clients.findByIdAndUpdate(_id, {
    "accountSecurity.accountBlocked": false,
    "accountSecurity.failedAttempts": 0,
    "accountSecurity.lastLoginAttempt": Date.now(),
  });
};

module.exports = {
  createNewClient,
  findByMail,
  setFailedAttempt,
  blockAccount,
  setNewPass,
  isAdminById,
  unblockAccount,
  editClient,
};
