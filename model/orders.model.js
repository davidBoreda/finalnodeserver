const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  client: { type: Object, required: true },
  product: { type: Object, required: true },
});

// const orderSchema = new Schema({
//   clientID: { type: String, required: true },
//   fName: { type: String, required: true },
//   lName: { type: String, required: true },
//   clientAdress: {
//     city: { type: String, require: true },
//     street: { type: String, require: true },
//     houseNum: { type: String, require: true },
//   },
//   productId: { type: String, required: true },
//   producName: { type: String, required: true },
// });

const Orders = mongoose.model("Orders", orderSchema);

const addNewOrder = (ordertData) => {
  const newOrder = new Orders(ordertData);
  return newOrder.save();
};

module.exports = {
  addNewOrder,
};
