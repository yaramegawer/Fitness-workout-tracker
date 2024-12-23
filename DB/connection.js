import mongoose from "mongoose"

export const connectDB=async()=>{
    return await mongoose
    .connect(process.env.CONNECTION_URL)
    .then(()=>console.log("Mongo Db connection successfully"))
    .catch((error)=>console.log(`Error connection to mongoDB, ${error}`));
};