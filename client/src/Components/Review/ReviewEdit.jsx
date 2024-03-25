import React from "react";
  import { Form } from "react-router-dom";

const ReviewEdit = ({ review }) => {
  return (
    <div className="row">
      <Form id="feedback row" method="post" className="">
        <div>
          

          {/* <div className="form-group">
            <div className=" inputGroupContainer">
              <div className="input-group">
                <span className="input-group-addon">
                  <i className="fa fa-heart"></i>
                </span>
                <select
                  className="form-control"
                  id="rating"
                  name="rating"
                  defaultValue={review.rate}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
            </div>
          </div> */}
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
                    defaultValue={review.review}
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          <div className="inputGroupContainer">
            <div className="input-group">
              <input
                className="form-control"
                id="reviewId"
                name="reviewId"
                rows="3"
                defaultValue={review._id}
                hidden
              ></input>
            </div>

            <div className="input-group">
              <input
                className="form-control"
                id="Edit"
                name="ReviewAction"
                rows="3"
                defaultValue={"EditReviewAction"}
                hidden
              ></input>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            data-bs-dismiss="modal"
          >
            Save changes
          </button>
        </div>
      </Form>
    </div>
  );
};

export default ReviewEdit;
