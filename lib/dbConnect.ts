import mongoose from "mongoose";

async function dbConnect(){
    try {
        await mongoose.connect(process.env.MONGODB_URL!);
        console.log("Successfully connected to database");
    } catch (error) {
        throw new Error("Connection Failed");
    }
}
export default dbConnect;