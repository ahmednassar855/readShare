import Express from "express";
import * as userController from "./userController.js";
import { protect } from "../../middleware/authMiddleware.js";
import { multerUpload } from "../../middleware/multer.js";

const router = Express.Router();
router.use(protect);
router
  .route("/")
  .patch(
    multerUpload("userPhoto", "users"),
    userController.updateMe
  )
  .delete(userController.deleteMe)
  .get(userController.getMe);
router.patch(
  "/updatePasssword",
  userController.updateMyPassword
);
router.patch("/:softDelete", userController.softDelete);
export default router;
