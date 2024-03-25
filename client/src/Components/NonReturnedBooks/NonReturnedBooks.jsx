import axios from "axios";
import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { motion } from "framer-motion";
import customFetch from "../utils/customFetch";
import toast from "react-hot-toast";
import { Form, redirect, useLoaderData } from "react-router-dom";

export const loader = async () => {
  let tokenUserLoggedIn = localStorage.getItem("token");

  const errors = { msg: "" };
  try {
    const { data } = await customFetch.get(`/books/nonreturn`, {
      headers: {
        authorization: `bearer ${tokenUserLoggedIn}`,
      },
    });
    return data;
  } catch (error) {
    errors.msg = "No Data Founded !!!!";
    toast.error(errors.msg);
    return error.msg;
  }
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  let tokenUserLoggedIn = localStorage.getItem("token");  
 // const errors = { msg: "" };
 console.log(data);
    try {
    await customFetch.post(`/books/return`, data, {
      headers: {
        authorization: `bearer ${tokenUserLoggedIn}`,
      },
    });
    toast.success("Return Book successfully");
    return redirect(`/home`);
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return error;
  }
};

export default function NonReturnedBooks() {
  const { Books } = useLoaderData();

  return (
    <>
      <div className="overflow-hidden">
        <div className="row">
          <div className="col-2 ">
            <div className="position-fixed col-lg-2">
              <Sidebar />
            </div>
          </div>

          <div className="col-10 px-5 ps-0 ps-lg-5 my-1 ">
            <div className="text-center mt-5 mb-2">
              <motion.h2
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="fw-bold p-3"
              >
                Non Returned Books
              </motion.h2>
            </div>
            <motion.table
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="table border border-2 border-opacity-50 border-secondary text-center table-striped border table-hover table-responsive"
              border=""
            >
              <thead>
                <tr>
                  <th className="d-none d-md-block">#</th>
                  <th>Name</th>
                  <th>Late</th>
                  <th>Publisher</th>

                  <th className="d-none d-md-block">Returned Date</th>
                  <th>Fine</th>
                  <th>Return Book</th>
                </tr>
              </thead>
              <tbody>
                {Books?.length ? (
                  Books.map((book, index) => (
                    <motion.tr
                      key={book._id}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: index * 0.5 || 0.5 }}
                    >
                      <td className="d-none d-md-table-cell">{index + 1}</td>
                      <td>{book?.name}</td>
                      <td>{book?.late || 0}</td>
                      <td>{book?.publisher}</td>
                      <td className="d-none d-md-table-cell">
                        {book.returnedAt.substring(0, 10)}
                      </td>
                      <td>{book?.fine || 0}</td>
                      <td>
                        <Form method="post">
                          <input type="text" hidden value={book._id}  name="bookId"/>
                        <button
                          // onClick={() => returnBook(book._id)}
                          type="submit"
                          className="btn btn-secondary"
                        >
                          Return
                        </button>
                        </Form>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td className="fw-bold" colSpan={6}>
                      No Non Returned Books Found
                    </td>{" "}
                  </tr>
                )}
              </tbody>
            </motion.table>
          </div>
        </div>
      </div>
    </>
  );
}
