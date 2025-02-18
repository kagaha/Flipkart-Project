import express from "express";
import { login, Signup, updatePassword, VerifyOtp } from "../Controllers/userController.js";
const userRouter = express.Router();
userRouter.post("/signup", Signup);
userRouter.post("/login", login);
userRouter.post("/check-email", VerifyOtp);
userRouter.post("/updatepassword",updatePassword);
export default userRouter;
