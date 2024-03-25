import Express from "express";

import * as authController from "./authController.js";
import { multerUpload } from "../../middleware/multer.js";

const router = Express.Router();

router.post("/login",   authController.login);
router.post("/signup",multerUpload("userPhoto", "users"), authController.signup);
router.get("/verify/:token", authController.verify);
router.post("/forgetPassword", authController.forgetPassword);
router.patch("/resetPassword/:token", authController.resetPassword);

export default router;
