import { products } from "../Data/ProductsData.js";
import Product from "../Models/ProductModel.js";
export const PostData=async(req,res)=>{
    try{
        await Product.deleteMany({});
        const allProducts= await Product.insertMany(products);
        // console.log(allProducts);
        return res.status(200).json({message:"Products Created", allProducts});
    }catch(err){
        console.log(err);
        return res.status(404).json({message:"data not found"});
    }
}
export const productbyCategory=async(req,res)=>{
    try{
        const {category}=req.params;
        // console.log(category);
    if(!category){
        return res.status(404).json({message:'Enter Category'});
    }
    const ProductLists=await Product.find({category});
    if(!ProductLists){
        return res.status(404).json({message:"Enter Correct Category"});
    }
    // console.log(ProductLists);
    return res.status(200).json({message:`${category} Results!!`,ProductLists});
    }
    catch(err){
        console.log(err);
        return res.status(404).json({message:"data not found"});
    }

}
// export const ProductByCatAndTitle=async(req,res)=>{
//     try{
//         const {category,title}=req.body;
//         const product= await
//     }
//     catch(err){
//         console.log(err);
//         return res.status(404).json({message:"data not found"});
//     }
// }