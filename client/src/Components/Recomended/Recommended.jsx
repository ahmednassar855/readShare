import axios from "axios";
import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { motion } from "framer-motion";
import customFetch from "../utils/customFetch";
import toast from "react-hot-toast";
import { Form, Link, redirect, useLoaderData } from "react-router-dom";

export const loader = async () => {
  let tokenUserLoggedIn = localStorage.getItem("token");

  const errors = { msg: "" };
  try {
    const { data } = await customFetch.get(`/books/recomendedBooks`, {
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

export default function Recommended() {
  const { recomendedBooks } = useLoaderData();
  console.log(recomendedBooks);
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
                Recommended Books
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
                  <th>Image</th>

                  <th>Name</th>
                  <th>Publisher</th>
                  <th>View</th>

                </tr>
              </thead>
              <tbody>
                {recomendedBooks?.length ? (
                  recomendedBooks.map((book, index) => (
                    
                    <motion.tr
                      key={book._id}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: index * 0.5 || 0.5 }}
                    >
                      <td className="d-none d-md-table-cell  align-middle">{index + 1}</td>
                      <td className="align-middle">
                        
                        <img
                        style={{width: '100px' , height: '100px'}}
                          // className="w-[50px]"
                          src={`http://localhost:5000/books/${book?.photo}`}
                          alt="books"
                        />
                      </td>

                      <td className="align-middle">{book?.name}</td>
                      <td className="align-middle">{book?.publisher}</td>
                      <td className="align-middle"><Link to={`/book/${book._id}`} className="btn btn-success">View</Link></td>

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
