import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dot from "dotenv";

dot.config();

const secretKey = process.env.JWT_SECRET as string;

interface AuthenticatedRequest extends Request {
  user?: string;
}

const authenticateToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({
      message: "Access denied. No token provided.",
    });
  } else {
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        res.status(403).json({
          message: "Invalid or expired token.",
        });
      } else {
        req.user = user as string;
        next();
      }
    });
  }
};

export default authenticateToken;
