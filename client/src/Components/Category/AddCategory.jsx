import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-web";
import { useForm } from "react-hook-form";
import { Form, redirect } from "react-router-dom";
import { toast } from 'react-hot-toast';
import customFetch from "../utils/customFetch";

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  let tokenUserLoggedIn = localStorage.getItem("token");
  console.log(data);
  try {
    await customFetch.post(`/category/`, data, {
      headers: {
        authorization: `bearer ${tokenUserLoggedIn}`,
      },
    });
    toast.success("Create Category successfully");
    return redirect(`/admin/categories`);
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return error;
  }
};

const AddCategory = () => {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm();

  const onSubmit = (categoryData) => {};
  function onError(errors) {
    console.log(errors);
  }
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
          <p className="fw-bold fs-5">Enter Book Category Now ....</p>
          <Form method="post">
            <label htmlFor="" className="m-sm-1 row">
              Title
            </label>
            <input
              type="text"
              className="form-control my-2"
              id="title"
              name="title"
              placeholder="Enter Category Title"
              {...register("title", { required: "This field is required" })}
            />
            {errors.title && (
              <span className="text-danger">{errors.title.message}</span>
            )}
            <label htmlFor="" className="m-sm-1 row">
              Descrption
            </label>

            <input
              type="text"
              className="form-control my-2"
              id="desc"
              name="desc"
              placeholder="Enter Category description"
              {...register("desc", { required: "This field is required" })}
            />
            {errors.desc && (
              <span className="text-danger">{errors.desc.message}</span>
            )}
            <button
              className=" btn btn-danger w-100 rounded-2 text-light"
              // disabled={isCreatingCategory}
            >
              Add Category
            </button>
          </Form>
        </motion.div>
      </div>
    </>
  );
};

export default AddCategory;
