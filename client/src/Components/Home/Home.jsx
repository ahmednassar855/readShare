import BookItem from "./BookItem";
import { motion } from "framer-motion";
 import { useLoaderData } from "react-router-dom";
import toast from "react-hot-toast";
import customFetch from "../utils/customFetch";
import TopFive from "../TopFive/TopFive";

export const loader = async () => {
  let tokenUserLoggedIn = localStorage.getItem("token");
  const errors = { msg: "" };
  try {
    const { data: books } = await customFetch.get("/books", {
      headers: {
        authorization: `bearer ${tokenUserLoggedIn}`,
      },
    });

    const { data: topBooks } = await customFetch.get("/books/topFiveBooks", {
      headers: {
        authorization: `bearer ${tokenUserLoggedIn}`,
      },
    });

    return {books, topBooks};
  } catch (error) {
    errors.msg = "No Data Founded !!!!";
    toast.error(errors.msg);
    throw error;
  }
};


export default function Home() {
   const { books ,  topBooks} = useLoaderData()
 
  if (!books.books) return <p>Loading......</p>;

  return (
    <>
    
      <div className="col-10 px-lg-5 px-2 my-3">
        <h2 className="pt-3">Top Five</h2>
        <TopFive topBooks={topBooks}/>
      <h2 className="pt-3">All Books</h2>
        <motion.span
          initial={{ y: -150 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mx-auto pe-5 pe-lg-0 p d-flex align-items-center justify-content-center"
        >
          {/* <input onChange={(e)=>{setBookName(e.target.value)}} type="search" className='form-control d-inline my-4' placeholder='Enter Book Name ...' name="name" id="name" /> */}
          {/* <button onClick={validateAndSearch} className='btn btn-danger text-white d-inline-block ms-3 h-50'>search</button> */}
        </motion.span>
        <div className="row">
          {books?.books?.length ? (
            books?.books?.map((book, index) => (
              <BookItem
                key={index}
                _id={book._id}
                name={book.name}
                category={book.category}
                publisher={book.publisher}
                bookPhoto={book.photo}
                isIssued={book.isIssued}
              />
            ))
          ) : (
            <div className="text-center fs-4 fw-bold">No Books Found</div>
          )}
        </div>
      </div>
    </>
  );
}
