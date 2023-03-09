const express = require("express");
const router = express.Router();
const orderValidation = require("../../validation/orderValidation");
const ordersModel = require("../../model/orders.model");
const clientsModel = require("../../model/clients.model");
const ResponseError = require("../../module/ResponseError");
const mwAuth = require("../../middleware/mw.token.auth");
const productsModel = require("../../model/products.model");

const debug = require("debug")("finalnodeserver:ordersRouter");

router.post("/neworder", mwAuth, async (req, res) => {
  try {
    const validateData = await orderValidation.validateOrderSchema(req.body);
    let isInStockProduct = await productsModel.findProductById(
      validateData.productId
    );
    if (!isInStockProduct.stockQuant)
      throw new ResponseError("DB", ["not in stock"]);
    isInStockProduct.stockQuant = isInStockProduct.stockQuant - 1;
    debug(isInStockProduct.stockQuant);
    await productsModel.updateProduct(validateData.productId, {
      stockQuant: isInStockProduct.stockQuant,
    });
    const client = await clientsModel.findFilterdClientById(req.userData);
    const product = await productsModel.findFilterdProductById(
      validateData.productId
    );

    const order = {
      client,
      product,
    };

    await ordersModel.addNewOrder(order);
    res.json(order);
  } catch (err) {
    debug(err);
    res.status(400).json({ err });
  }
});

router.get("/clientorder", mwAuth, async (req, res) => {
  try {
    debug(req.userData);
    const clientEmail = await clientsModel.findClientEmailById(req.userData);
    debug(clientEmail);
    const clientOrders = await ordersModel.findClientOrdersByClientId(
      clientEmail.email
    );
    res.json({ clientOrders });
  } catch (err) {
    res.status(400).json({ err });
  }
});

module.exports = router;
