import React from "react";
import { useGetCategories } from "../Category/useGetCategories";
import { Form, Link, redirect, useParams } from "react-router-dom";
import customFetch from "../utils/customFetch";
import toast from "react-hot-toast";

const Category = ({ category, legnth }) => {
  const { _id, desc, title } = category;
  const param =  useParams()

  return (
    <>
      <tbody>
        <tr className="text-center">
          <th scope="row">{legnth + 1}</th>
          <td>{title}</td>
          <td>{desc}</td>
          <td className="d-flex gap-4 text-center justify-content-center">
            <Link
              to={`../categories/edit/${category._id}`}
              className="btn btn-success"
            >
              Edit
            </Link>
            <Link to={`../categories/delete/${category._id}`}>
              <button
                type="button"
                className="btn btn-danger "
                data-bs-toggle="modal"
                data-bs-target="#exampleModal2"
              >
                Delete
              </button>
            </Link>
          </td>
        </tr>
      </tbody>

      {/* delete modal */}

      <div
        className="modal fade"
        id="exampleModal2"
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
            <Form method="post">
              <div className="modal-body">
                <p>
                  Delete Category: <span>{title}</span>
                </p>

                <input type="text" value={param.id} name="bookId" hidden />
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
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Category;
