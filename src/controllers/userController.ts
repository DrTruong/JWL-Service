import { Response, Request } from "express";
import User, { IUser } from "../models/user";
import { res400Error, res500Error } from "../utils/responseError";

export const createUser = async (req: Request, res: Response) => {
  try {
    const user: IUser = new User(req.body);
    const savedUser = await user.save();
    res.status(201).json({
      message: "Create new user",
      user: savedUser,
    });
  } catch (error) {
    res400Error(error, res);
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({
        message: "User not found",
      });
    } else {
      res.status(200).json({
        message: "Get user successfull",
        user: user,
      });
    }
  } catch (error) {
    res500Error(error, res);
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(200).json({
      message: "Get list user successfull",
      length: users.length,
      users: users,
    });
  } catch (error) {
    res500Error(error, res);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id as string;
    const updatedUser = await User.findByIdAndUpdate(userId, req.body);
    if (!updatedUser) {
      res.status(404).json({
        message: "User not found",
      });
    } else {
      res.status(200).json({
        message: "Updated user successfull",
        user: updatedUser,
      });
    }
  } catch (error) {
    res400Error(error, res);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const deletedUser = await User.findByIdAndDelete(userId);
    res.status(404).json({
      message: !deletedUser ? "User not found" : "Deleted user successfull",
    });
  } catch (error) {
    res500Error(error, res);
  }
};
