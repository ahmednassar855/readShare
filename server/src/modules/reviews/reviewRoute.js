import Express from "express";
import { protect } from "../../middleware/authMiddleware.js";
import * as reviewController from "./reviewsController.js";

const reviewRoute = Express.Router();

// Routes for CRUD operations on reviews
reviewRoute.post("/",protect, reviewController.createReview);
// reviewRoute.get("/", reviewController.getAllReviews);
reviewRoute.get("/:id",protect, reviewController.getReviewById);
reviewRoute.put("/:id",protect, reviewController.updateReview);
reviewRoute.delete("/:id",protect, reviewController.deleteReview);

export default reviewRoute;
