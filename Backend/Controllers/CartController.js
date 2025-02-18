import Cart from "../Models/CartModel.js";
import Product from "../Models/ProductModel.js";

export const AddDatatoCart=async(req,res)=>{
    try{
        const {id}=req.params;
        // console.log(id);
        const productItem=await Product.findById(id);
        // console.log(productItem);
        const title=productItem.title;
        const existIncart=await Cart.findOne({title});
        if(existIncart){
            return res.status(404).json({message:"Product had alraedy present in the cart!!"});
        }
        const newCart= new Cart({
            title:productItem.title,
            quantity:1,
            image:productItem.image,
            price:productItem.price,
            category:productItem.category
        });
        await newCart.save();
        return res.status(200).json({message:"Product Added to the cart!!",newCart});

    }catch(err){
        console.log(err);
        return res.status(404).json({message:"Data not found",err});
    }
}


//Fetch data from cart
export const FetchData=async(req,res)=>{
    try{
        const CartDatas= await Cart.find({});
        return res.status(200).json({message:"Data Fetched Sucessfully",CartDatas});
    }catch(err){
        console.log(err);
        return res.status(404).json({message:"Data not found",err});
    }
}



//Quantity updating or decreasing
export const QunatityUpdate=async(req,res)=>{
    try{
        const {id}=req.params;
        const {quantity}=req.body;
        if(quantity<1 || quantity>10){
            return res.status(404).json({message:"The number should be in b/w 1 to 10"});
        }
        const UpdatedQuantity=await Cart.findByIdAndUpdate(id ,{quantity},{new:true});
        if(!UpdatedQuantity){
            return res.status(404).json({message:"Cart not found in the List"});
        }
        return res.status(200).json({message:"Updated quantity!!",UpdatedQuantity});
    }
    catch(err){
        console.log(err);
        return res.status(404).json({message:"Data not found",err});
    }

}

//Deleting the cart
export const DeleteCart=async(req,res)=>{
    try{
        const {id}=req.params;
        const deletedCart=await Cart.findByIdAndDelete(id);
        if(!deletedCart){
            return res.status(404).json({message:"Cart not found in the List"});
        }
        return res.status(200).json({message:"Cart Deleted Successfully",deletedCart});
    }
    catch(err){
        console.log(err);
        return res.status(404).json({message:"Data not found",err});
    }

}


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