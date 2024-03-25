import React from "react";
import { Form,  useParams } from "react-router-dom";
import { useAuth } from "../utils/useAuth";
import ReviewEdit from "./ReviewEdit";
import { useForm } from "react-hook-form";
 

const SingleReview = ({ review , id}) => {
    const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm();

  const param = useParams();
  let userId = review?.user._id;
   const { user } = useAuth();
   
  const tokenUserLoggedIn = localStorage.getItem("token")
  

  // useEffect(() => {
  //   deleteAction(reviewId);
  // }, []);

   
  
  return (
    <>
      <div className="col">
        <div className="card h-100 card-review">
          <div className="card-header pb-0 d-flex flex-row justify-content-between align-items-center">
            <div className="d-flex align-items-center pb-3 gap-3 justify-content-between w-100">
              <img
                className="rounded-circle me-2"
                style={{ width: "100px" , height :'100px'}}
                src={`http://localhost:5000/users/${review.user.userPhoto}`}
                alt="profilePhoto"
              />
              <div className="d-flex flex-column justify-content-center align-items-start fs-5 lh-sm gap-2">
                <p className="text-primary">{review.user.name}</p>
                <small className="text-muted">{review.createdAt}</small>
              </div>
              {review.rating && <div className="d-flex me-0 gap-3 align-content-center justify-content-center align-middle">
                <span>Rating </span>
                <p className="bg-dark text-danger text-center p-2 w-50 rounded-circle h-50 border-3 align-middle fw-bold m-2">{review.rating}</p>
              </div>}
              
            </div>
            {/* <span className="fs-1 my-0 fw-bolder text-success">10</span> */}
          </div>
          <div className="card-body py-2">
            <p className="card-text">{review.review}</p>
 
            <div className="d-flex gap-3">
            
          {user?.id === userId && user?.role === 'user' && <button  type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target={`#exampleModalEdit${review?._id}`}>
            Edit
          </button>}
          
          {user?.role === 'admin' || user?.id === userId ?  (<button className="btn btn-danger" data-bs-toggle="modal" data-bs-target={`#exampleModal${review?._id}`}>
            Delete
          </button>) : null }
         
            </div>
            
          </div>
          
          <div className="card-footer pt-0 d-flex flex-row align-items-center text-muted">
            <span className="me-1">
              <i className="zmdi zmdi-comments"></i>
            </span>
            {/* <small>5</small> */}
          </div>
          
         
        </div>
      </div>
        {/* Edit modal */}
        <div
        className="modal fade"
        id={`exampleModalEdit${review?._id}`}
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Modal title
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>
                Edit Review: <span>{review.review}</span>
              </p>
              <ReviewEdit review={review}/>
              
            </div>
            
          </div>
        </div>
      </div>

      {/* delete modal */}
     
      <div
        className="modal fade"
        id={`exampleModal${review?._id}`}
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Modal title
              </h1>
              {/* <input type="text" defaultValue={review?._id} /> */}
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              <p>
                Delete Review: <span>{review.review}</span>
              </p>
              <Form method="post">
                 <input
                  className="form-control form-control-lg"
                  type="text"
                  placeholder="review"
                  aria-label=".form-control-lg example"
                  id="reviewId"
                  name="reviewId"
                  value={review?._id}
                  hidden
                />
                <input
                    className="form-control"
                    id="ReviewAction"
                    name="ReviewAction"
                    value="DeleteReviewAction"
                    hidden
                    rows="3"
                  ></input>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">
                    Delete
                  </button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
      
    </>
  );
};

export default SingleReview;
