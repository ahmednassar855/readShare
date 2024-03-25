import React, { useEffect, useRef } from "react";
import Lottie from "lottie-web";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useCreateBook } from "./useCreateBook";
import { useGetCategories } from "../Category/useGetCategories";
import SelectCategory from "./SelectCategory";

export default function AddBook() {
  const { createBook, isCreating , isAddBookError} = useCreateBook();
  const { categories, isCategoriesError, isCategoriesLoading } =
  useGetCategories();
   const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const photo = typeof data.photo === "string" ? data.photo : data.photo[0];
    console.log(data);
    createBook(
      { ...data, photo: photo },
      {onSuccess: (data) => {
          console.log(data);
          reset();
        },
      }
    );
  };
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
      animationData: require("./../../images/addBook.json"),
    });

    return () => {
      anim.destroy();
    };
  }, []);
   return (
    <>
      <div className="col-md-10  d-flex justify-content-center align-items-center min-vh-100">
        <motion.div
          initial={{ y: -1000 }}
          animate={{ y: 0 }}
          transition={{ duration: 1.5, type: "spring" }}
          className="p-5 w-75 text-center bg-white bg-opacity-25 my-2 shadow rounded-2"
        >
          <div className="w-25 mx-auto" ref={imgContainer}></div>
          <p className="fw-bold fs-5">Enter Book Details Now ....</p>
          <form onSubmit={handleSubmit(onSubmit, onError)}>
            <label htmlFor="photo" className="row ms-2">Choose Book Photo</label>
            <input
              {...register("photo", { required: "This field is required" })}
              type="file"
              className="form-control my-2"
              id="photo"
              name="photo"
              placeholder="Choose Your Photo"
            />
             {errors.photo && (
              <span className="text-danger">{errors.photo.message}</span>
            )}
            <label htmlFor="name" className="row ms-2">Book Name</label>

            <input
              type="text"
              className="form-control my-2"
              id="name"
              name="name"
              placeholder="Enter Book Name"
              {...register("name", { required: "This field is required" })}
            />
            {errors.name && (
              <span className="text-danger">{errors.name.message}</span>
            )}
            {/* <input
              type="text"
              className="form-control my-2"
              id="category"
              name="category"
              placeholder="Enter Book Category"
              {...register("category", { required: "This field is required" })}
            />
            {errors.category && (
              <span className="text-danger">{errors.category.message}</span>
            )} */}
            <label htmlFor="category" className="row ms-2">Book Category</label>

            <SelectCategory categories={categories}  isCategoriesLoading={isCategoriesLoading} register={register}/>
            <label htmlFor="publisher" className="row ms-2">Enter Book Author</label>
            
            <input
              type="text"
              className="form-control my-2"
              id="publisher"
              name="publisher"
              placeholder="Enter Book Author"
              {...register("publisher", { required: "This field is required" })}
            />
            {errors.publisher && (
              <span className="text-danger">{errors.publisher.message}</span>
            )}
            <label htmlFor="desc" className="row ms-2">Book Descrption</label>

            <input
              type="text"
              className="form-control my-2"
              id="desc"
              name="desc"
              placeholder="Enter Book Description"
              {...register("desc", {
                required: "This field is required",
              })}
            />
            {errors.desc && (
              <span className="text-danger">{errors.desc.message}</span>
            )}
            {errors.name && (
              <span className="text-danger">{errors.name.message}</span>
            )}
            {/* Repeat the same pattern for other input fields */}
            <button
              className="btn btn-danger w-100 rounded-2 text-light"
              disabled={isCreating}
            >
              {isCreating ? "Adding..." : "Add Book"}
            </button>
          </form>
        </motion.div>
      </div>
    </>
  );
}
