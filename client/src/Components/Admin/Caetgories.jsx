import React from "react";
 import Category from "./Category";
import customFetch from "../utils/customFetch";
import toast from "react-hot-toast";
import { redirect, useLoaderData } from "react-router-dom";


export const loader = async () => {
  let tokenUserLoggedIn = localStorage.getItem("token");
  const errors = { msg: "" };
  try {
    const { data } = await customFetch.get(`/category/`, {
      headers: {
        authorization: `bearer ${tokenUserLoggedIn}`,
      },
    });
    return data;
  } catch (error) {
    errors.msg = "No Data Founded !!!!";
    toast.error(errors.msg);
    return redirect("/admin");
  }
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
    const tokenUserLoggedIn = localStorage.getItem("token");
    try {
    await customFetch.delete(`/category/${data.bookId}`, {
      headers: {
        authorization: `bearer ${tokenUserLoggedIn}`,
      },
    });
    toast.success("This category deleted successfully");
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return error;
  }
  return redirect("/admin/categories");
};

const Caetgories = () => {
  
   const  {categories} =useLoaderData()

  console.log(categories);
  return (
    <>
      <div className="col-10 px-lg-5 px-2 my-3">
        <p className="fs-1 fw-bolder">Categories :</p>
        <hr />
        <div className="table-responsive">
          <table className="table table-secondary table-hover p-5 text-center m-auto">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">Description</th>
                <th scope="col">action</th>
              </tr>
            </thead>

            {categories?.map((category, index) => (
              <Category category={category} key={index} legnth={index}/>
            ))}
          </table>
        </div>
      </div>
    </>
  );
};

export default Caetgories;
