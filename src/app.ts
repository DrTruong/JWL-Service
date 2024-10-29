import express from "express";
import body_parser from "body-parser";
import connectToDatabase from "./config/database";
import dotenv from "dotenv";
import authRouter from "./routes/authRoutes";
import userRouter from "./routes/userRoutes";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(body_parser.json());
app.use("/api", authRouter);
app.use("/api", userRouter);

connectToDatabase(() => {
  app.listen(port, () => {
    console.log("Server is running at port:", port);
  });
});
