import { cache } from "react";
import dbConnect from "../dbConnect";
import ProductModel, { Product } from "../models/ProductModel";
export const revalidate = 3600;
const getLatest = cache(async () => {
  await dbConnect();
  const products = await ProductModel.find({})
    .sort({ _id: -1 })
    .limit(4)
    .lean();
  return products as Product[];
});
const getFeatured=async()=>{
    await dbConnect();
    const products=await ProductModel.find({isFeatured:true}).limit(3).lean();
    return products as Product[];
}
const getBySlug=async(slug:String)=>{
    await dbConnect();
    const products=await ProductModel.findOne({slug}).lean();
    return products as Product;
}
const productService={
    getLatest,
    getFeatured,
    getBySlug
};
export default productService;