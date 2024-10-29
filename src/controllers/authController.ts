import { Request, Response } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";
import dot from "dotenv";

dot.config();

const secretKey = process.env.JWT_SECRET as string;

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email, password: password });
  if (!user) {
    res.status(400).json({
      message: "Invalid email or password",
    });
  } else {
    const token = jwt.sign({ userId: user._id }, secretKey, {
      expiresIn: '60s',
    });
    res.json({
      token,
    });
  }
};
