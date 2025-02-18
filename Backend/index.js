import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRouter from "./Routes/userRoute.js";
import cors from "cors";
import productRoute from "./Routes/ProductRoute.js";
import CartRouter from "./Routes/CartRoute.js";
import OrderRoute from "./Routes/OrderRoute.js";
const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT;
const mongouri = process.env.MONGO_URI;
connection()
  .then((res) => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));
async function connection() {
  await mongoose.connect(mongouri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}
app.use(userRouter);
app.use(productRoute);
app.use(CartRouter);
app.use(OrderRoute);
app.listen(port, () => {
  console.log(`server listening at port ${port}`);
});
