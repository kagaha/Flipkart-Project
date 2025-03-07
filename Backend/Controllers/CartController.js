import Cart from "../Models/CartModel.js";
import Product from "../Models/ProductModel.js";

// export const AddDatatoCart=async(req,res)=>{
//     try{
//         const {id,userId}=req.params;
//         // console.log(id);
//         const productItem=await Product.findById(id);
//         // console.log(productItem);
//         const title=productItem.title;
//         const existIncart=await Cart.findOne({title}).populate();
//         if(existIncart){
//             return res.status(404).json({message:"Product had alraedy present in the cart!!"});
//         }
//         const newCart= new Cart({
//             title:productItem.title,
//             quantity:1,
//             image:productItem.image,
//             price:productItem.price,
//             category:productItem.category
//         });
//         await newCart.save();
//         return res.status(200).json({message:"Product Added to the cart!!",newCart});

//     }catch(err){
//         console.log(err);
//         return res.status(404).json({message:"Data not found",err});
//     }
// }




export const AddDatatoCart = async (req, res) => {
    try {
        const { id, userId } = req.params; // Product ID and User ID from request

        // Find the product
        const productItem = await Product.findById(id);
        if (!productItem) {
            return res.status(404).json({ message: "Product not found!" });
        }

        // Check if the user already has a cart
        let userCart = await Cart.findOne({ userId });

        if (!userCart) {
            // If no cart exists, create a new one with this product
            userCart = new Cart({
                userId,
                items: [
                    {
                        productId: productItem._id,
                        title: productItem.title,
                        quantity: 1,
                        image: productItem.image,
                        price: productItem.price,
                        category: productItem.category
                    }
                ]
            });

            await userCart.save();
            return res.status(200).json({ message: "Product added to cart!", cart: userCart });

        } else {
            // Check if the product is already in the cart
            const productExists = userCart.items.some((p) => p.productId.toString() === id);

            if (productExists) {
                return res.status(400).json({ message: "Product is already in the cart!" });
            }

            // If the product is new, add it to the cart
            userCart.items.push({
                productId: productItem._id,
                title: productItem.title,
                quantity: 1,
                image: productItem.image,
                price: productItem.price,
                category: productItem.category
            });

            // Save the updated cart
            await userCart.save();

            return res.status(200).json({ message: "Product added to cart!", cart: userCart });
        }

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error", error: err.message });
    }
};



//Fetch data from cart
export const FetchData=async(req,res)=>{
    try{
        const {userId}=req.params;
        const CartDatas= await Cart.findOne({userId:userId});
        if(!CartDatas){
            return res.status(404).json({message:"User Not exists"});
        }
        return res.status(200).json({message:"Data Fetched Sucessfully",CartDatas});
    }catch(err){
        console.log(err);
        return res.status(404).json({message:"Data not found",err});
    }
}



// //Quantity updating or decreasing
// export const QunatityUpdate=async(req,res)=>{
//     try{
//         const {id,userId}=req.params;
//         const cartata=await Cart.findOne({userId:userId});
//         if(!cartata){
//             return res.status(404).json({message:"User Not exists"});
//         }
//         const {quantity}=req.body;
//         if(quantity<1 || quantity>10){
//             return res.status(404).json({message:"The number should be in b/w 1 to 10"});
//         }
//         const UpdatedQuantity=await Cart.findByIdAndUpdate(id ,{quantity},{new:true});
//         if(!UpdatedQuantity){
//             return res.status(404).json({message:"Cart not found in the List"});
//         }
//         return res.status(200).json({message:"Updated quantity!!",UpdatedQuantity});
//     }
//     catch(err){
//         console.log(err);
//         return res.status(404).json({message:"Data not found",err});
//     }

// }

export const QunatityUpdate = async (req, res) => {
    try {
        const { userId, id } = req.params;
        const { quantity } = req.body;

        if (quantity < 1 || quantity > 10) {
            return res.status(400).json({ message: "Quantity should be between 1 and 10" });
        }

        // Find the user's cart
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: "User does not exist or cart is empty" });
        }

        console.log("Cart Data:", cart);
        console.log("Product ID in request:", id);


        // Find product index in cart
        const productIndex = cart.items.findIndex(
            (item) => item.productId== id
        );

        console.log("Product Index Found:", productIndex);

        if (productIndex === -1) {
            return res.status(404).json({ message: "Product not found in cart" });
        }

        // Update quantity
        cart.items[productIndex].quantity = quantity;
        await cart.save();

        return res.status(200).json({ message: "Quantity updated successfully", cart });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error updating quantity", error: err.message });
    }
};


//Deleting the cart
// export const DeleteCart=async(req,res)=>{
//     try{
//         const {id,userId}=req.params;
//         const CartData= await Cart.findOne({userId:userId});
//         if(!CartData){
//             return res.status(404).json({message:"User Not exists"});
//         }
//         const deletedCart=await Cart.findByIdAndDelete(id);
//         if(!deletedCart){
//             return res.status(404).json({message:"Cart not found in the List"});
//         }
//         return res.status(200).json({message:"Cart Deleted Successfully",deletedCart});
//     }
//     catch(err){
//         console.log(err);
//         return res.status(404).json({message:"Data not found",err});
//     }

// }
export const DeleteCart = async (req, res) => {
    try {
        const { id, userId } = req.params; // `id` = productId
        console.log("Deleting product:", id, "from user:", userId);

        const cart = await Cart.findOne({ userId: userId });

        if (!cart) {
            return res.status(404).json({ message: "User's cart does not exist" });
        }

        // Filter out the item with the given productId
        const updatedItems = cart.items.filter(item => item.productId.toString() !== id);

        // If no items left, delete the cart document entirely
        if (updatedItems.length === 0) {
            await Cart.findOneAndDelete({ userId: userId });
            return res.status(200).json({ message: "Cart deleted successfully as it became empty" });
        }

        // Update the cart with new items array
        cart.items = updatedItems;
        await cart.save();

        return res.status(200).json({ message: "Item removed from cart", cart });
    } catch (err) {
        console.error("Error deleting item:", err);
        return res.status(500).json({ message: "Internal server error", err });
    }
};



//Delete all the carts
export const DeleteAllCarts=async(req,res)=>{
    try{
        await Cart.deleteMany({});
        return res.status(200).json({message:"All Carts Deleted!"});
    }
    catch(err){
        console.log(err);
        return res.status(404).json({message:"Data not found",err});
    }

}