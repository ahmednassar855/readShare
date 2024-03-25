import multer from "multer";
import { uuid } from "uuidv4";
import AppError from "../../src/error/AppErr.js";
export const multerUpload = (fieldName, subPath) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `public/${subPath}`);
    },
    filename: (req, file, cb) => {
      const fileExt = file.mimetype.split("/")[1];
      cb(null, `${uuid()}-${Date.now()}.${fileExt}`);
    },
  });
  const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(new AppError("you must upload file of type image", 400), false);
    }
  };

  const upload = multer({ storage: storage, fileFilter: multerFilter });

  return upload.single(fieldName);
};
