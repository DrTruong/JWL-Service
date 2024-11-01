import { Request, Response } from "express";
import File from "../models/file";
import fs from "fs/promises";

export const addFile = async (req: Request, res: Response) => {
  if (!req.file) {
    res.status(400).json({
      message: "No file uploaded.",
    });
  } else {
    const { originalname, mimetype, path: filePath } = req.file;
    try {
      const file = new File({
        fileName: originalname,
        contentType: mimetype,
        filePath: filePath,
      });
      await file.save();
      res.status(201).json({
        message: "File upload successfull.",
        file: file,
      });
    } catch (error) {
      console.log(req.file);
      res.status(500).json({
        message: "Upload file failed.",
        error: error,
      });
    }
  }
};

export const getFile = async (req: Request, res: Response) => {
  try {
    const fileId = req.params.id;
    const file = await File.findById(fileId);
    if (!file) {
      res.status(404).json({
        message: "File not found.",
      });
    } else {
      res.set("Content-type", file.contentType);
      res.sendFile(file.filePath, { root: "." });
    }
  } catch (error) {
    res.status(500).json({
      message: "Get file failed.",
      error: error,
    });
  }
};

export const deleteFile = async (req: Request, res: Response) => {
  try {
    const fileId = req.params.id;
    const file = await File.findById(fileId);
    if (!file) {
      res.status(404).json({
        message: "File not found.",
      });
    } else {
      await fs.unlink(file.filePath);
      await File.findByIdAndDelete(file._id);
      res.status(404).json({
        message: "File delete successfull",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Delete file failed.",
      error: error,
    });
  }
};
