import React, { useState } from "react";
import {
  Form,
  redirect,
  useLoaderData,
  useNavigation,
  useParams,
} from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Review from "../Review/Review";
import ReviewList from "../Review/ReviewList";
import toast from "react-hot-toast";
import customFetch from "../utils/customFetch";
import StartRating from "./StartRating";

export const loader = async ({ params }) => {
  let tokenUserLoggedIn = localStorage.getItem("token");
  const errors = { msg: "" };
  try {
    const { data } = await customFetch.get(`/books/books/${params.id}`, {
      headers: {
        authorization: `bearer ${tokenUserLoggedIn}`,
      },
    });
    return data;
  } catch (error) {
    errors.msg = "No Data Founded !!!!";
    toast.error(errors.msg);
    return redirect("/home");
  }
};

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log(data);
  let tokenUserLoggedIn = localStorage.getItem("token");
  if (data.ReviewAction === "IssueReviewAction") {
    data.ReviewAction = undefined;
    console.log(data, "Issue review ");

    try {
      await customFetch.post(`/books/issue/${params.id}`, data, {
        headers: {
          authorization: `bearer ${tokenUserLoggedIn}`,
        },
      });
      toast.success("Issued Book successfully");
      return redirect(`/none-return-books`);
    } catch (error) {
      toast.error(error?.response?.data?.message);
      return error;
    }
  } else if (data.ReviewAction === "DeleteReviewAction") {
    data.ReviewAction = undefined;
    console.log(data, "Delete review ");

    try {
      await customFetch.delete(`/review/${data.reviewId}`, {
        headers: {
          authorization: `bearer ${tokenUserLoggedIn}`,
        },
      });
      toast.success("Delete Review successfully");
      return redirect(`/book/${params.id}`);
    } catch (error) {
      toast.error(error?.response?.data?.message);
      return error;
    }
  } else if (data.ReviewAction === "EditReviewAction") {
    data.ReviewAction = undefined;
    console.log(data, "Edite review ");

    try {
      await customFetch.put(`/review/${data.reviewId}`, data, {
        headers: {
          authorization: `bearer ${tokenUserLoggedIn}`,
        },
      });
      toast.success("Review Updated Successfully");
      return redirect(`/book/${params.id}`);
    } catch (error) {
      toast.error(error?.response?.data?.message);
      return error;
    }
  } else if (data.ReviewAction === "CreateReviewAction") {
    data.ReviewAction = undefined;
    console.log(data, "create review ");
    data.book = params.id;
    try {
      await customFetch.post(`/review/`, data, {
        headers: {
          authorization: `bearer ${tokenUserLoggedIn}`,
        },
      });
      toast.success("Reviewd Book successfully");
      return redirect(`/book/${params.id}`);
    } catch (error) {
      toast.error(error?.response?.data?.message);
      return error;
    }
  } else {
    console.log(data);
    console.log("ssss");
    return redirect(`/book/${params.id}`);
  }
};

export default function Book() {
  const { book, reviews } = useLoaderData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const [checkedStar, setCheckedStar] = useState(false);
  const [bookData, setBookData] = useState([]);
  const [reviewsData, setReivewsData] = useState([]);

  const [duration, setDuaration] = useState(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { id } = useParams(); // Assuming you're using React Router for routing

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        animation={true}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Issue Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="py-3" method="post">
            <input
              // onChange={(e) => setDuaration(e.target.value)}
              className="form-control w-100"
              name="issuedDurationInDays"
              placeholder="Enter The Duration"
              type="number"
            />

            <input
              // onChange={(e) => setDuaration(e.target.value)}
              className="form-control w-100"
              name="ReviewAction"
              type="text"
              defaultValue="IssueReviewAction"
              hidden
            />
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              {/* <Button
            variant="danger"
            className="text-white"
            type="submit" 
            onClick={() => {
              handleClose();
              // issueBook();
            }}
          >
            Save Changes
          </Button> */}
              <button
                type="submit"
                className="btn btn-success"
                disabled={isSubmitting}
                // onClick={handleClose}
              >
                {isSubmitting ? "submitting" : "Save"}
              </button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>

      <div className="col-10 px-lg-5 px-2 my-3">
        <div className="row">
          <div className="col-lg-4">
            <div className="p-5">
              <img
                className="w-100 rounded-2"
                src={`http://localhost:5000/books/${book.photo}`}
                alt="bookphoto"
              />
              <div className="d-flex align-content-center justify-content-center align-items-sm-center">
              <StartRating rating={book.ratingsAverage} />
             
              </div>
              <h4 className="text-center p-3 pb-0 fw-bolder">
                {bookData.name}
              </h4>
              <p className="text-center text-secondary fw-light">
                {bookData.publisher}
              </p>
            </div>
          </div>
          <div className="col-lg-8 my-1">
            <div className="p-lg-5 px-5">
              <p className="d-none d-lg-block">
                <span className="fw-bold">Category</span> :{" "}
                {book?.category?.title}
              </p>
              <p className="d-none d-lg-block">
                <span className="fw-bold">Issued</span> :{" "}
                {book.issued ? "Yes" : "No"}
              </p>
              <p className="text-secondary d-none d-lg-block fs-6">
                <span className="fw-bold text-black">Description</span> :{" "}
                {book?.desc} `
              </p>
              {book?.issued ? null : (
                <button
                  variant="primary"
                  onClick={handleShow}
                  className="btn btn-danger w-100 mb-3"
                >
                  Issue this book now
                </button>
              )}
              <Review reviewsData={reviews} bookId={book?._id} />
            </div>
          </div>
        </div>

        <ReviewList reviewsData={reviews} />
      </div>
    </>
  );
}
