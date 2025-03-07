// import mongoose from "mongoose";
// const cartSchema= mongoose.Schema({
//     title:{
//         type:String,
//         requires:true
//     },
//     quantity:{
//         type:Number,
//         required:true
//     },
//     image:{
//         type:String,
//         required:true,
//     },
//     price:{
//         type:Number,
//         required:true
//     },
//     category:{
//         type:String,
//         required:true
//     },
//     userId:{
//         type:mongoose.Schema.Types.ObjectId,
//         ref:"User",
//         required:true
//     }

// });
// const Cart= mongoose.model("Cart",cartSchema);
// export default Cart;


import mongoose from "mongoose";

const cartSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true // Ensures one cart per user
    },
    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },
            title: String,
            quantity: {
                type: Number,
                required: true
            },
            image: String,
            price: Number,
            category: String
        }
    ]
});

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
