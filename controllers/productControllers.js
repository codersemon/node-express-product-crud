// dependencies
import {
  addNewDataInDB,
  deleteDataByID,
  generateRandomID,
  generateSlug,
  getDataFromDB,
} from "../helpers/helpers.js";
import fs from "fs";

/******************************
 * shop page render
 * @param {*} req
 * @param {*} res
 *****************************/
export const getShopControll = (req, res) => {
  // get all products
  const allProducts = getDataFromDB("db/products.json");

  res.render("shop", {
    products: allProducts,
  });
};

/******************************
 * create product page render
 * @param {*} req
 * @param {*} res
 *****************************/
export const createProductPage = (req, res) => {
  res.render("create");
};

/******************************
 * create product
 * @param {*} req
 * @param {*} res
 *****************************/
export const createProduct = (req, res) => {
  // destructure form submission
  const { name, regularPrice, salePrice, stock } = req.body;

  // get all products
  const allProducts = getDataFromDB("db/products.json");

  // create product data from submission
  const product = {
    id: generateRandomID(),
    slug: generateSlug(name),
    name,
    thumbnail: req.file.filename,
    regularPrice,
    salePrice,
    stock,
  };

  // push new data with old data
  allProducts.push(product);

  // update database
  addNewDataInDB("db/products.json", allProducts);

  // redirect to home / products page after upload
  res.redirect("/");
};

/****************************
 * single product page render
 * @param {*} req
 * @param {*} res
 *****************************/
export const singleProduct = (req, res) => {
  // getting slug from req params
  const { slug } = req.params;

  // get all products
  const allProducts = getDataFromDB("db/products.json");

  // get product by slug
  const singleProduct = allProducts.find((item) => item.slug == slug);

  res.render("single", {
    product: singleProduct,
  });
};

/****************************
 * product edit page render
 * @param {*} req
 * @param {*} res
 *****************************/
export const editProductPage = (req, res) => {
  // product id from params
  const { id } = req.params;

  // get all products form db
  const allProducts = getDataFromDB("db/products.json");

  // get single product by id
  const product = allProducts.find((item) => item.id == id);

  // render edit page and send product data
  res.render("edit", {
    product: product,
  });
};

/****************************
 * delete product page render
 * @param {*} req
 * @param {*} res
 *****************************/
export const deleteProduct = (req, res) => {
  // getting product id
  const { id } = req.params;

  // get all product
  const allData = getDataFromDB("db/products.json");
  const filePath =
    "public/uploads/product/" + allData.find((item) => item.id == id).thumbnail;

  if (fs.existsSync(filePath)) {
    // delete thumbnail when product will delete
    fs.unlinkSync(filePath);
  }

  // delete data from db
  deleteDataByID("db/products.json", id);

  // redirect to product page after delete
  res.redirect("/");
};

/****************************
 * update product
 * @param {*} req
 * @param {*} res
 *****************************/
export const updateProduct = (req, res) => {
  // get product id from params
  const { id } = req.params;

  // get form data
  const { name, regularPrice, salePrice, stock } = req.body;

  // get all product data
  const allProducts = getDataFromDB("db/products.json");

  // get product index
  const productIndex = allProducts.findIndex((item) => item.id == id);

  // product thumbnail handle
  const thumbnail = req?.file?.filename || allProducts[productIndex].thumbnail;

  // replace product data by id
  allProducts[productIndex] = {
    id,
    slug: generateSlug(name),
    name,
    thumbnail,
    regularPrice,
    salePrice,
    stock,
  };

  console.log(allProducts[productIndex]);

  // updata database
  addNewDataInDB("db/products.json", allProducts);

  // redirect to product shop / home
  res.redirect("/");
};
