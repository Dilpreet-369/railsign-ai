import mongoose from "mongoose";
import { db_name } from "../constants.js";

const connectDB = async () => { 
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined in environment variables");
    }
    const mongoUri = process.env.MONGODB_URI.replace(/\/$/, "");
    const connectionInstance = await mongoose.connect(
      `${mongoUri}/${db_name}`
    );
    console.log(
      `\nMONGODB connected SUCCESSFULLY!!, DB_Host ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.error("MONGODB connection FAILED!!", error);
    process.exit(1);
  }
};

export default connectDB;
