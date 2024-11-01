import mongoose, { Document, Schema } from "mongoose";
import { v4 as uuid_v4 } from "uuid";

interface IFile extends Document {
  fileName: string;
  contentType: string;
  filePath: string;
}

const FileSchema = new Schema(
  {
    _id: {
      type: String,
      default: uuid_v4,
    },
    fileName: {
      type: String,
      required: true,
    },
    contentType: {
      type: String,
      required: true,
    },
    filePath: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const File = mongoose.model<IFile>("File", FileSchema);

export default File;
