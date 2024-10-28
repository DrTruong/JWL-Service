import express from "express";
import body_parser from "body-parser";

const app = express();

app.use(body_parser.json());

app.listen(3000, () => {
  console.log("Server is running at port: 3000");
});
