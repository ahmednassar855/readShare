import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-web";
import customFetch from "../utils/customFetch";
import toast from "react-hot-toast";
import { Form, redirect, useLoaderData } from "react-router-dom";
 

export const loader = async ({params}) => {
    const tokenUserLoggedIn = localStorage.getItem("token");
   try {
    const {data} = await customFetch.get(`/category/${params.id}`, {
      headers: {
        authorization: `bearer ${tokenUserLoggedIn}`,
      },
    });
    toast.success("Get Category Successfully");
    return data
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return error;
  }
 }

export const action = async ({ request, params}) => {
    const tokenUserLoggedIn = localStorage.getItem("token");
    const formData = await request.formData();
    const data = Object.fromEntries(formData)
   try {
    await customFetch.put(`/category/${params.id}`,data, {
      headers: {
        authorization: `bearer ${tokenUserLoggedIn}`,
      },
    });
    toast.success("This category Updated successfully");
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return error;
  }
  return redirect("/admin/categories");
}

const EditCategory = () => {
  
   const { category }=  useLoaderData()
    console.log(category);
  const imgContainer = useRef(null);

  useEffect(() => {
    const container = imgContainer.current;
    if (!container) return;

    const anim = Lottie.loadAnimation({
      container: container,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: require("../../images/addBook.json"),
    });

    return () => {
      anim.destroy();
    };
  }, []);
  return (
    <>
      {" "}
      <div className="col-md-10  d-flex justify-content-center align-items-center min-vh-100">
        <motion.div
          initial={{ y: -1000 }}
          animate={{ y: 0 }}
          transition={{ duration: 1.5, type: "spring" }}
          className="p-5 w-75 text-center bg-white bg-opacity-25 my-2 shadow rounded-2"
        >
          <div className="w-25 mx-auto" ref={imgContainer}></div>
          <p className="fw-bold fs-5">Edit Book Category Description ....</p>
          <Form method="post" >
            {/* <input
              type="text"
              className="form-control my-2"
              id="title"
              name="title"
              defaultValue={category?.title}
              placeholder="Enter Category Title"
             /> */}
            <label htmlFor="" className="m-sm-1 row">Description</label>
            <input
              type="text"
              className="form-control my-2"
              id="desc"
              name="desc"
              defaultValue={category?.desc}
              placeholder="Enter Category description"
             />
            
            <button
              className=" btn btn-danger w-100 rounded-2 text-light"
             >
              Edit Category
            </button>
          </Form>
        </motion.div>
      </div>
    </>
  );
};

export default EditCategory;
