import express from "express";
import authenticateToken from "../middlewares/authenToken";
import upload from "../middlewares/upload";
import { addFile, getFile, deleteFile } from "../controllers/uploadController";

const router = express.Router();

router.post(
  "/file",
  authenticateToken,
  upload.single("avatar"),
  addFile
);
router.get("/file/:id", authenticateToken, getFile);
router.delete("/file/:id", authenticateToken, deleteFile);

export default router;
