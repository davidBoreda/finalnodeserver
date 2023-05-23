const express = require("express");
const router = express.Router();
const upload = require("../../config/multer");
const productsValidation = require("../../validation/productsValidation");
const mwIsAdmin = require("../../middleware/mw.IsAdmin");
const productsModel = require("../../model/products.model");
const debug = require("debug")("shopeee:productsRouter");

//Only admin can access - adding product to DB
router.post("/addnewproduct", mwIsAdmin, async (req, res) => {
  try {
    const validateData = await productsValidation.validateAddNewProductSchema(
      req.body
    );
    await productsModel.addNewProduct({ ...validateData });
    res.json({ msg: "new product added successfully" });
  } catch (err) {
    res.status(400).json({ err });
  }
});

//Only admin can access - editing product on DB
router.put("/editproduct", mwIsAdmin, async (req, res) => {
  try {
    const validateData = await productsValidation.validateEditProductSchema(
      req.body
    );
    await productsModel.updateProduct(validateData._id, { ...validateData });
    res.json({ msg: "product updated" });
  } catch (err) {
    res.status(400).json({ err });
  }
});

//Only admin can access - get full product data
router.get("/getproduct/:id", mwIsAdmin, async (req, res) => {
  try {
    validateValues = await productsValidation.validateGetFullProductInfoSchema(
      req.params
    );
    productData = await productsModel.findProductById(validateValues.id);
    res.json(productData);
  } catch (err) {
    res.status(400).json({ err });
  }
});

//Only admin can access - remove product from DB
router.delete("/deleteproduct/:id", mwIsAdmin, async (req, res) => {
  try {
    const validateValues = await productsValidation.validateRemoveProductSchema(
      req.params
    );
    deletedProduct = await productsModel.deleteProduct(validateValues.id);
    res.json({ deleted: deletedProduct });
  } catch (err) {
    res.status(500).json({ err });
  }
});

// API for seeing all products (productName filtered) - open to all
router.get("/:pageNum/:itemsPerPage/findbyname", async (req, res) => {
  try {
    const validateValues =
      await productsValidation.validateSearchByNameOrBrandSchema(req.query);
    const countValidateValues =
      await productsValidation.validateAllProductsSchema(req.params);
    const products = await productsModel.findProductByName(
      validateValues,
      validateValues.pageNum,
      validateValues.itemsPerPage
    );
    res.json(products);
  } catch (err) {
    res.status(400).json({ err });
  }
});

// API for seeing all products (productName filtered) - open to all
router.get("/:pageNum/:itemsPerPage", async (req, res) => {
  try {
    const validateValues = await productsValidation.validateAllProductsSchema(
      req.params
    );
    const products = await productsModel.findAllProducts(
      validateValues.pageNum,
      validateValues.itemsPerPage
    );
    res.json(products);
  } catch (err) {
    res.status(400).json({ err });
  }
});

module.exports = router;
