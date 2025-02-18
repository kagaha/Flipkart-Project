import express from "express";
import { AddDatatoCart, DeleteAllCarts, DeleteCart, FetchData, QunatityUpdate } from "../Controllers/CartController.js";
const CartRouter=express.Router();
CartRouter.post("/cart/:id",AddDatatoCart);
CartRouter.get("/cart",FetchData);
CartRouter.put("/cart/:id",QunatityUpdate);
CartRouter.delete("/cart/:id",DeleteCart);
CartRouter.delete("/cart",DeleteAllCarts);
export default CartRouter;