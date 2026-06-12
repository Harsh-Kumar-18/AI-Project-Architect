import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected to MONGO_DB");
  } catch (error) {
  console.error("Database Not Connected:", error.message);
  process.exit(1);
}
};

export default connectDB