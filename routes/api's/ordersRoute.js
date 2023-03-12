const express = require("express");
const router = express.Router();
const orderValidation = require("../../validation/orderValidation");
const ordersModel = require("../../model/orders.model");
const clientsModel = require("../../model/clients.model");
const ResponseError = require("../../module/ResponseError");
const mwAuth = require("../../middleware/mw.token.auth");
const productsModel = require("../../model/products.model");

const debug = require("debug")("shopeee:ordersRouter");

//creates new order and save to DB - after login - token needed
router.post("/neworder", mwAuth, async (req, res) => {
  try {
    const validateData = await orderValidation.validateOrderSchema(req.body);
    let isInStockProduct = await productsModel.findProductById(
      validateData.productId
    );
    if (!isInStockProduct.stockQuant)
      throw new ResponseError("DB", ["not in stock"]);
    isInStockProduct.stockQuant = isInStockProduct.stockQuant - 1;
    await productsModel.updateProduct(validateData.productId, {
      stockQuant: isInStockProduct.stockQuant,
    });
    const client = await clientsModel.findFilteredClientById(req.userData);
    const product = await productsModel.findFilteredProductById(
      validateData.productId
    );
    const order = {
      client,
      product,
    };

    await ordersModel.addNewOrder(order);
    res.json(order);
  } catch (err) {
    res.status(400).json({ err });
  }
});

// API for getting list of all client orders
router.get("/clientorders", mwAuth, async (req, res) => {
  try {
    const clientEmail = await clientsModel.findClientEmailById(req.userData);
    const clientOrders = await ordersModel.findClientOrdersByClientEmail(
      clientEmail.email
    );
    res.json({ clientOrders });
  } catch (err) {
    res.status(400).json({ err });
  }
});

module.exports = router;
