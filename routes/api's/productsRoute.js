const express = require("express");
const router = express.Router();
const upload = require("../../config/multer");
const productsValidation = require("../../validation/productsValidation");
const mwIsAdmin = require("../../middleware/mw.IsAdmin");
const productsModel = require("../../model/products.model");
const debug = require("debug")("finalnodeserver:productsRouter");

router.post("/addnewproduct", mwIsAdmin, async (req, res) => {
  try {
    const validateData = await productsValidation.validateAddNewProductSchema(
      req.body
    );
    await productsModel.addNewProduct({ ...validateData });
    res.json({ msg: "new product sdded succesfuly" });
  } catch (err) {
    res.status(400).json({ err });
  }
});

router.put("/editproduct", mwIsAdmin, async (req, res) => {
  try {
    const validateData = await productsValidation.validateEditProductSchema(
      req.body
    );
    debug(validateData);
    await productsModel.updateProduct(validateData._id, { ...validateData });
    res.json({ msg: "product updated" });
  } catch (err) {
    res.status(400).json({ err });
  }
});

router.delete("/deleteproduct/:id", mwIsAdmin, async (req, res) => {
  try {
    const validateValues = await productsValidation.validateRemoveProductSchema(
      req.params
    );
    console.log(validateValues.id);
    deletedProduct = await productsModel.deleteProduct(validateValues.id);
    res.json({ deleted: deletedProduct });
  } catch (err) {
    res.status(500).json({ err });
  }
});

router.get("/:pageNum/:itemsPerPage/findbyname", async (req, res) => {
  try {
    const validateValues =
      await productsValidation.validateSerchByNameOrBrandSchema(req.query);
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
