import { auth } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import ProductModel from "@/lib/models/ProductModel";
import { round2 } from "@/lib/utils";
import OrderModel, { OrderItem } from "@/lib/models/OrderModel";

const calcPrice=(orderItem:OrderItem[])=>{
    
    const itemsPrice=round2(orderItem.reduce((acc,item)=>acc+item.price*item.qty,0))
    const shippingPrice=round2(itemsPrice>100?0:100)
    const taxPrice=round2(Number((0.15*itemsPrice).toFixed(2)))
    const totalPrice=round2(itemsPrice+shippingPrice+taxPrice)
    return {itemsPrice,shippingPrice,taxPrice,totalPrice}
}
export const POST = auth(async (req: any) => {
  if (!req.auth) {
    return Response.json(
      {
        message: "unauthorized",
      },
      {
        status: 401,
      }
    );
  }
  const {user}=req.auth;
  try {
    const payload=await req.json();
    await dbConnect();
    const dbProductPrices=await ProductModel.find({
        _id:{$in:payload.items.map((x:{_id:string})=>x._id)},
    },
    'price'
    )
    const dbOrderItems=payload.items.map((x:{_id:string})=>({
        ...x,
        product:x._id,
        price:dbProductPrices.find((x)=>x._id===x._id).price,
        _id:undefined
    }));
    const {itemsPrice,taxPrice,shippingPrice,totalPrice}=calcPrice(dbOrderItems);
    const newOrder=new OrderModel({
        items:dbOrderItems,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        shippingAddress:payload.shippingAddress,
        paymentMethod:payload.paymentMethod,
        user:user._id
    });
    const createdOrder=await newOrder.save();
    return Response.json({
        message:"Order has been created successfully",order:createdOrder
    },
    {
        status:201
    });
  } catch (err:any) {
    return Response.json({message:err.message},{status:500})
  }
}) as any;
