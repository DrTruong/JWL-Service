import express from "express";
import body_parser from "body-parser";
import connectToDatabase from "./config/database";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(body_parser.json());

connectToDatabase(() => {
  app.listen(port, () => {
    console.log("Server is running at port:", port);
  });
});
