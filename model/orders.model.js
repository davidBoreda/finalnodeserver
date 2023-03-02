const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  clientID: { type: String, required: true },
  clientName: { type: String, required: true },
  clientAdress: { type: String, required: true },
  productId,
});
