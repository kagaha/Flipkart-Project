import express from "express";
import { OrderDetails } from "../Controllers/OrderController.js";
const OrderRoute=express.Router();
OrderRoute.post("/order",OrderDetails);
export default OrderRoute;