import Order from "../Models/OrderModel.js";

export const OrderDetails=async (req,res)=>{
    try{
        const { address, city, state, pincode, phoneNumber, total, paymentType } = req.body;

        const orderDet = new Order({
            address,
            city,
            state,
            pincode,
            phoneNumber,
            total,
            paymentType
        });

        await orderDet.save();
        return res.status(200).json({ message: "Order Stored Successfully!", orderDet });
    }
    catch(err){
        console.log(err);
        return res.status(404).json({message:"data not found"});
    }

}