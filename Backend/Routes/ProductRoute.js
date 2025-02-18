import express from "express";
import { PostData, productbyCategory, } from "../Controllers/ProductController.js";
const productRoute=express.Router();
productRoute.get("/products",PostData);
productRoute.get("/product/:category",productbyCategory);
export default productRoute;