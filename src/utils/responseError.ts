import { Response } from "express";
import { MongoServerError } from "mongodb";

export const res400Error = (error: any, res: Response) => {
  const err = (error as MongoServerError).errorResponse.errmsg;
  res.status(400).json({
    message: err,
  });
};

export const res500Error = (error: any, res: Response) => {
  const err = (error as MongoServerError).errorResponse.errmsg;
  res.status(500).json({
    message: err,
  });
};
