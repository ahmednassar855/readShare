import bookModel from "../../../database/models/bookModel.js";
import reviewModel from "../../../database/models/reviewModel.js";
import userModel from "../../../database/models/userModel.js";
import AppErr from "../../error/AppErr.js";
import { catchErr } from "../../error/catchErr.js";

export const addBook = catchErr(async (req, res, next) => {
  const { name, category, desc, publisher } = req.body;
  const book = await bookModel.create({ name, photo: req.file.filename, category, desc, publisher });
  res.status(200).json({ message: "sucsess", book });
});

export const issueBook = catchErr(async (req, res, next) => {
  const { id } = req.params
  console.log(id, 'ssssssss');
  let bookId = id
  const { issuedDurationInDays } = req.body;
  console.log(issuedDurationInDays , 'jjjjjjjjj');

  // Additional validation for request parameters
  if (!bookId || !issuedDurationInDays) {
    return next(new AppErr("Invalid parameters", 400));
  }
  const book = await bookModel.findById(bookId);
  if (!book || book.issued == true)
    return next(new AppErr("book is already issued", 400));
  const day = 24 * 60 * 60 * 1000;
  book.issuedBy = req.user.id;
  book.issuedAt = Date.now();
  book.returnedAt = Date.now() + issuedDurationInDays * day;
  book.issued = true;
  book.save();
  await userModel.updateOne({ _id: req.user.id }, { $addToSet: { bookCategoriesId: book.category } })
  res.status(200).json({ message: "the book is issued for you" });
});


export const getBookById = catchErr(async (req, res, next) => {
  const { id } = req.params
  console.log(id);
  const book = await bookModel.findById(id).populate('category', 'title desc -_id').exec();
  const reviews = await reviewModel.find({ book: id })
  res.status(200).json({ status: 200, message: "success", book, reviews })
})


export const getMyBooks = catchErr(async (req, res, next) => {
  const Books = await bookModel.find({ issuedBy: req.user.id });
  if (!Books) return next(new AppErr("you dont have any books yet", 404));
  console.log(Books);
  return res.json({ message: "success", Books });
});


export const returnBook = catchErr(async (req, res, next) => {
  const { bookId } = req.body;
  const Book = await bookModel.findOne({ issuedBy: req.user.id, _id: bookId });
  if (!Book) return next(new AppErr("you dont issue this book", 404));
  Book.issued = undefined
  Book.issuedBy = undefined;
  Book.issuedAt = undefined;
  Book.returnedAt = undefined;
  await Book.save()
  return res.json({ message: "success", Book });
});

export const findBook = catchErr(async (req, res, next) => {
  const { letters } = req.params;
  const book = await bookModel.findOne({ name: { $regex: letters, $options: 'i' } }).sort({ createdAt: -1 }).exec();
  if (!book) return next(new AppErr("no book found", 404));
  return res.json({ message: "success", book });
});

export const getAllBooks = catchErr(async (req, res, next) => {
  const books = await bookModel.find().sort({ createdAt: -1 });
  res.status(200).json({ status: 200, message: "success", books })
});

export const findMyBook = catchErr(async (req, res, next) => {
  const { name } = req.body;
  const book = await bookModel.findOne({
    name: `/${name}/`,
    issuedBy: req.user.id,
  });
  if (!book) return next(new AppErr("no books yet", 404));
  return res.json({ message: "success", book });
});



export const recomendedBooks = catchErr(async (req, res, next) => {
  const user = req.user

  let recomendedBooks = await bookModel.find({ category: { $in: user.bookCategoriesId } }).limit(10)
  if (!recomendedBooks.length) {
    recomendedBooks = await bookModel.find().sort({ ratingsAverage: -1, ratigQuantity: -1 }).limit(10);
  }
  if (recomendedBooks.length < 10) {
    const topBooks = await bookModel.find().sort({ ratingsAverage: -1, ratigQuantity: -1 }).limit(10 - recomendedBooks.length);
    recomendedBooks = [...new Map([...recomendedBooks, ...topBooks].map(obj => [obj.name, obj])).values()];
  }
  res.status(200).json({ message: "success", recomendedBooks })
})

export const topFiveBooks = catchErr(async (req, res, next) => {
   const topBooks = await bookModel.find().sort({ ratingsAverage : -1 , ratigQuantity : -1 }).limit(5);
   return res.status(200).json({message : 'success' , topBooks});
})


