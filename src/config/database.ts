import mongoose, { ConnectOptions } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const db_user_name = process.env.DB_USER_NAME;
const db_password = process.env.DB_PASSWORD;
const db_name = process.env.DB_NAME;

const mongoUrl = `mongodb+srv://${db_user_name}:${db_password}@cluster0.ijqphkx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const connectionOptions: ConnectOptions = {
  dbName: db_name,
};

const connectToDatabase = async (callback: () => void) => {
  try {
    await mongoose.connect(mongoUrl, connectionOptions);
    console.log("Connected to MongoDB with Mongoose.");
    callback();
  } catch (error) {
    console.log("Database connect failed:", error);
    process.exit(1);
  }
};

export default connectToDatabase;
