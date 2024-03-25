import React, { useEffect, useState } from "react";
import SingleReview from "./SingleReview";
import { getOneBook } from "./../Book/useGetOneBook";
import { useParams } from "react-router-dom";

const ReviewList = ({ reviewsData }) => {
  const param = useParams();
  const [bookData, setBookData] = useState(null);
  const bookId = param.id; // Replace "your-book-id" with the actual book ID
  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const { book, reviews } = await getOneBook(bookId);
        setBookData({ book, reviews });
      } catch (error) {
        console.error("Error fetching book data:", error);
      }
    };

    fetchBookData();
  }, [bookId]);

  if (!bookData) return <div>Loading...</div>;

  let reviews = reviewsData;
  return (
    <>
      <div className="container py-4">
        <div className="ex1 row row-cols-1 row-cols-md-2 row-cols-xl-2 g-4 mb-4">
          {reviews?.map((review, index) => (
            <SingleReview review={review} key={index} id={review._id}/>
          ))}
        </div>
      </div>
    </>
  );
};

export default ReviewList;
