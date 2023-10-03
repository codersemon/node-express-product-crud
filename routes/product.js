// dependencies
import express from "express";
import { getShopControll, createProductPage, singleProduct, createProduct, editProductPage, deleteProduct, updateProduct } from "../controllers/productControllers.js";
import { productImagesMulter } from "../utils/multer.js";

// init router
const router = express.Router();

// shop route
router.get('/', getShopControll);

// create product
router.get('/create', createProductPage);
router.post('/create', productImagesMulter, createProduct);

// single product 
router.get('/single/:slug', singleProduct)

// edit product 
router.get('/edit-product/:id', editProductPage);
router.post('/edit-product/:id', productImagesMulter, updateProduct);

// delete product 
router.get('/delete-product/:id', deleteProduct)

// export router
export default router;
