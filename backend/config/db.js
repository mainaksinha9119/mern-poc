import mongoose from "mongoose";

const connectDB = async () => {
    const mongoURI = process.env.MONGODB_URI;
    console.log(mongoURI)
    if (!mongoURI) {
        console.error("MongoDB URI is not defined. Set MONGODB_URI or MONGO_URI in your .env file.");
        return;
    }

    try {
        await mongoose.connect(mongoURI);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
    }
};

export default connectDB