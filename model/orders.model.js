const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  client: { type: Object, required: true },
  product: { type: Object, required: true },
});

const Orders = mongoose.model("Orders", orderSchema);

const addNewOrder = (ordertData) => {
  const newOrder = new Orders(ordertData);
  return newOrder.save();
};

const findClientOrdersByClientEmail = (email) => {
  return Orders.find({ "client.email": email }).batchSize(10);
};

module.exports = {
  addNewOrder,
  findClientOrdersByClientEmail,
};
