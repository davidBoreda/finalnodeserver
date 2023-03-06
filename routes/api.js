const express = require("express");
const router = express.Router();
const clientRouter = require("./api's/clientAuth");
const productsRouter = require("./api's/productsRoute");
const favoriteRouter = require("./api's/favoriteRoute");
const ordersRouter = require("./api's/ordersRoute");

router.use("/client", clientRouter);

router.use("/products", productsRouter);

router.use("/favorite", favoriteRouter);

router.use("/orders", ordersRouter);

module.exports = router;
