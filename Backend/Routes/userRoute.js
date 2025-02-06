import express from "express";
import { login, Signup, VerifyOtp } from "../Controllers/userController.js";
const userRouter = express.Router();
userRouter.post("/signup", Signup);
userRouter.post("/login", login);
userRouter.post("/check-email", VerifyOtp);
export default userRouter;
