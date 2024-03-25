import Express from "express";
import { protect, restrictTo } from "../../middleware/authMiddleware.js";
import * as categoryController from "./categoryController.js";

const categeoryRoute = Express.Router();

categeoryRoute.post("/", protect,restrictTo('admin'), categoryController.createCategory);
categeoryRoute.get("/", protect, categoryController.getAllCategories);
categeoryRoute.get("/:id", protect,restrictTo('admin'), categoryController.getCategoryById);
categeoryRoute.put("/:id", protect,restrictTo('admin'), categoryController.updateCategory);
categeoryRoute.delete("/:id", protect,restrictTo('admin'), categoryController.deleteCategory);

export default categeoryRoute;
