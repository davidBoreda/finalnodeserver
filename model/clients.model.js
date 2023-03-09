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

// finds client by mongo object _id and edit/update filds
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

const isAdminById = (_id) => {
  return Clients.findById(_id);
};

//saves in data base times of faild attempts entering wrong password and time record of last one
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

//part of login API that takes action if client enterd more than 3 wrong passwords in 15 minutes
const blockAccount = (_id) => {
  return Clients.findByIdAndUpdate(_id, {
    "accountSecurity.accountBlocked": true,
    "accountSecurity.failedAttempts": 0,
    "accountSecurity.lastLoginAttempt": Date.now(),
  });
};

//part of an API used by admin for unblocking accounts
const unblockAccount = (_id) => {
  return Clients.findByIdAndUpdate(_id, {
    "accountSecurity.accountBlocked": false,
    "accountSecurity.failedAttempts": 0,
    "accountSecurity.lastLoginAttempt": Date.now(),
  });
};

const findClientById = (_id) => {
  return Clients.findById(_id);
};

const findFilterdClientById = (_id) => {
  return Clients.findById(_id).select(
    "-accountSecurity -password -isAdmin -_id"
  );
};

const findClientEmailById = (_id) => {
  return Clients.findById(_id);
};

//find client by mail - used insaid find all client orders API
const findByMail = (email) => {
  return Clients.findOne({ email });
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
  findClientById,
  findFilterdClientById,
  findClientEmailById,
};
