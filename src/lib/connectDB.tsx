import mongoose from "mongoose";

export default async function connectDB() {
  if (mongoose.connection?.readyState === 1) {
    console.log("✅ MongoDB already connected");
    return;
  }

  if (mongoose.connection?.readyState === 2) {
    console.log("⏳ MongoDB connection in progress...");
    return;
  }

  try {
    await mongoose
      .connect(
        "mongodb+srv://zaza:1234test@cluster0.crzqo.mongodb.net/mongoData?retryWrites=true&w=majority&appName=Cluster0",
        {
          maxPoolSize: 10,
          minPoolSize: 1,
          connectTimeoutMS: 15000,
          serverSelectionTimeoutMS: 11000,
          socketTimeoutMS: 180000,
        }
      )
      .then(() => console.log("connected to mongoDB"));
  } catch (error) {
    console.log(error);
  }
}
