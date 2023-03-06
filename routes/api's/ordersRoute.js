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
    debug(req.body);
    const validateData = await orderValidation.validateOrderSchema(req.body);
    const client = await clientsModel.findFilterdClientById(req.userData);
    debug(client);
    const product = await productsModel.findFilterdProductById(
      validateData.productId
    );
    debug(product);

    // excludedKeys = [
    //   product.stockQuant,
    //   client.accountSecurity,
    //   client.email,
    //   client.password,
    //   client.isAdmin,
    // ];
    const order = {
      client,
      product,
    };
    // Object.keys(order)
    //   .filter((key) => excludedKeys.includes(key))
    //   .forEach((key) => {
    //     debug(`${key}: ${order[key]}`);
    //   });

    // const filteredOrder = Object.fromEntries(
    //   Object.entries(rawOrder).map(([key, value]) => {
    //     if (excludedKeys.includes(key)) {
    //       return {};
    //     }
    //     return [key, value];
    //   })
    // );
    await ordersModel.addNewOrder(order);
    res.json(order);
  } catch (err) {
    debug(err);
    res.status(400).json({ err });
  }
});

module.exports = router;
