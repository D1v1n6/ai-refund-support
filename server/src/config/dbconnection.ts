import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    console.log("Attempting MongoDB connection...");
    const mongoURI = process.env.MONGODB_URI;
    if (!mongoURI) {
      throw new Error(
        "MONGODB_URI is not defined in the environment variables",
      );
    }
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export default connectDB;