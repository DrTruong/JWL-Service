import express from "express";
import authenticateToken from "../middlewares/authenToken";
import {
  createUser,
  getUserById,
  getUsers,
  updateUser,
  deleteUser,
} from "../controllers/userController";

const router = express.Router();

router.post("/user/create", createUser);
router.get("/user/:id", authenticateToken, getUserById);
router.get("/users/", getUsers);
router.put("/user/:id", authenticateToken, updateUser);
router.delete("/user/:id", authenticateToken, deleteUser);

export default router;
