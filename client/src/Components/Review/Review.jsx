import React, { useEffect, useState } from "react";
import { Form } from "react-router-dom";
import jwtDecode from "jwt-decode";

const Review = ({ bookId , reviewsData}) => {
  const [isUserReviewd , setIsUserReviewd] = useState(false)

  const book = bookId;
  let tokenUserLoggedIn = localStorage.getItem("token");
  const decoded = jwtDecode(tokenUserLoggedIn);

   
  
    useEffect(() => {
    const userExists = reviewsData?.user?.some(review => review.user?._id === decoded.id);
      setIsUserReviewd(userExists)
      console.log(isUserReviewd, 'ssss');
    }, [reviewsData, decoded.id])
   
  return (
    <div className="row">
      <h6 id="fh6">
        Your review will help us to improve our web hosting quality products,
        and customer services.
      </h6>

      <Form id="feedback row" method="post" className="">
        <div>
          <div className="pinfo">Rate our overall services.</div>

          <div className="form-group">
            <div className=" inputGroupContainer">
              <div className="input-group">
                <span className="input-group-addon">
                  <i className="fa fa-heart"></i>
                </span>
                <select
                  className="form-control"
                  id="rating"
                  // {...register("rate")}
                  name="rating"
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div>
            <div className="pinfo">Write your feedback.</div>
            <div className="form-group">
              <div className="inputGroupContainer">
                <div className="input-group">
                  <span className="input-group-addon">
                    <i className="fa fa-pencil"></i>
                  </span>
                  <textarea
                    className="form-control"
                    id="review"
                    name="review"
                    rows="3"
                  ></textarea>
                </div>
              </div>
              <div className="inputGroupContainer">
                <div className="input-group">
                  
                  <input
                    className="form-control"
                    id="book"
                    name="book"
                    value={book}
                    hidden
                    rows="3"
                  ></input>
                </div>

                <div className="input-group">
                  
                  <input
                    className="form-control"
                    id="ReviewAction"
                    name="ReviewAction"
                    value="CreateReviewAction"
                    hidden
                    rows="3"
                  ></input>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Give A Feedback
        </button>
      </Form>
    </div>
  );
};

export default Review;
