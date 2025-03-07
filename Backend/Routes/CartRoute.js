import express from "express";
import { AddDatatoCart, DeleteAllCarts, DeleteCart, FetchData, QunatityUpdate } from "../Controllers/CartController.js";
const CartRouter=express.Router();
CartRouter.post("/cart/:id/:userId",AddDatatoCart);
CartRouter.get("/cart/:userId",FetchData);
CartRouter.put("/cart/:id/:userId",QunatityUpdate);
CartRouter.delete("/cart/:id/:userId",DeleteCart);
CartRouter.delete("/cart",DeleteAllCarts);
export default CartRouter;