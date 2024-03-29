const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productsSchema = new Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  stockQuant: { type: Number, required: true },
  picture: { type: String },
});

const Products = mongoose.model("products", productsSchema);

const addNewProduct = (productData) => {
  const newProduct = new Products(productData);
  return newProduct.save();
};

const findProductById = (_id) => {
  return Products.findById(_id);
};

const updateProduct = (
  id,
  { name, brand, description, price, picture, stockQuant }
) => {
  return Products.findByIdAndUpdate(id, {
    name,
    brand,
    description,
    price,
    stockQuant,
    picture,
  });
};

const findAllProducts = (pageNum = 1, itemsPerPage = 15) => {
  return Products.find()
    .skip((pageNum - 1) * itemsPerPage)
    .limit(itemsPerPage)
    .select("-stockQuant");
};

const findProductByName = (productName, pageNum, itemsPerPage) => {
  return Products.find(productName)
    .skip((pageNum - 1) * itemsPerPage)
    .limit(itemsPerPage);
};

const deleteProduct = (_id) => {
  return Products.findByIdAndRemove(_id);
};

const findFilteredProductById = (_id) => {
  return Products.findById(_id).select(" -stockQuant");
};

module.exports = {
  findProductById,
  addNewProduct,
  findAllProducts,
  deleteProduct,
  updateProduct,
  findProductByName,
  findFilteredProductById,
};
