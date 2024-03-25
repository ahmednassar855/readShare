import Express from "express";
import { protect, restrictTo } from "../../middleware/authMiddleware.js";
import { multerUpload } from "../../middleware/multer.js";
import * as bookController from "./bookController.js";

const router = Express.Router();
router.post(
  "/",
  protect,
  multerUpload("photo", "books"),
  bookController.addBook
);
router.get("/", protect, bookController.getAllBooks);
router.post("/searchBooks/:letters", protect, bookController.findBook);
router.get('/books/:id',protect,bookController.getBookById)
router.post("/issue/:id", protect, bookController.issueBook);
router.get("/nonreturn", protect, bookController.getMyBooks);
// router.get("/issued", protect, bookController.getMyBooks);

router.post('/return',protect,bookController.returnBook);
router.get('/recomendedBooks',protect,bookController.recomendedBooks);
router.get('/topFiveBooks',protect,bookController.topFiveBooks);



export default router;

