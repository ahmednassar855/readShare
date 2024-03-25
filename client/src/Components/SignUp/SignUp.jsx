import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Joi from "joi";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";
import AppLogo from "../AppLogo/AppLogo";
import Lottie from "lottie-web";
import { useForm } from "react-hook-form";
import { useRegisteration } from "./useRegisteration";

export default function SignUp() {
  const { createUser, isCreateUserError, isCreatingUser } = useRegisteration();

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const userPhoto = typeof data.userPhoto === "string" ? data.userPhoto : data.userPhoto[0];
    console.log(data);
    createUser(
      { ...data, userPhoto: userPhoto },
      {onSuccess: (data) => {
          console.log(data);
          navigate('/login')
          reset();
        },
      }
    );
  };
  function onError(errors) {
    console.log(errors);
  }
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
  });

  const [errList, setErrList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  let navigate = useNavigate();

  function getUserData(e) {
    let userData = { ...user };
    userData[e.target.name] = e.target.value;
    setUser(userData);
    console.log(user);
  }

  async function sendRegisterDataToAPI() {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:5000/users/signup",
        user
      );
      setLoading(false);

      const data = response.data;

      if (data.message === "you are signed up") {
        setError("success");
        navigate("/login");
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error("Error during signup:", error.message);
      setLoading(false);

      if (error.response) {
        setError(
          error.response.data.message ||
            "An error occurred during signup. Please try again."
        );
      } else if (error.request) {
        setError("No response received from the server. Please try again.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  }

  function validateRegisterationData() {
    const signUpSchema = Joi.object({
      name: Joi.string().min(3).max(20).required(),
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),
      phoneNumber: Joi.string()
        .pattern(/^01[0125][0-9]{8}$/)
        .required(),
      password: Joi.string()
        .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
        .required(),
      confirmPassword: Joi.ref("password"),
    });
    return signUpSchema.validate(user, { abortEarly: false });
  }

  function submitRegisterationForm(e) {
    e.preventDefault();
    let validation = validateRegisterationData();
    if (validation.error) {
      setLoading(false);
      setErrList(validation.error.details);
      console.log(errList);
    } else {
      sendRegisterDataToAPI();
      console.log(user);
    }
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
      animationData: require("./../../images/book1.json"),
    });

    return () => {
      anim.destroy();
    };
  }, []);

  return (
    <>
      <li className="fixed-top p-1 pe-lg-5 d-lg-flex d-none  ">
        <AppLogo />
      </li>
      <div className="container">
        <div className="row">
          <div className="col-lg-5 d-none d-lg-flex justify-content-center align-items-center">
            <div className="w-100" ref={imgContainer}></div>
          </div>
          <div className="col-lg-7">
            <div className="min-vh-100 d-flex justify-content-center align-items-center signup-container">
              <div className="bg-light bg-opacity-25 shadow-lg w-95 mx-auto p-5 rounded-2">
                <h1 className="fw-bold">Sign Up Now</h1>
                <div className="pt-3">
                  {/* <form onSubmit={submitRegisterationForm}>
                    <input onChange={getUserData} className='form-control my-2' type="text" name='name' placeholder='Enter Your Name' />
                    {errList.filter((err) => err.context.label === "name")[0] ? (
                      <div className="text-danger text-start pb-1 fs-small">
                        {errList.filter((err) => err.context.label === "name")[0]?.message}
                      </div>
                    ) : null}
                    <input onChange={getUserData} className='form-control my-2' type="email" name='email' placeholder='Enter Your Email' />
                   {errList.filter((err) => err.context.label === "email")[0] ? (
                      <div className="text-danger text-start pb-1 fs-small">
                        {errList.filter((err) => err.context.label === "email")[0]?.message}
                      </div> 
                    ) : null}
                    <input onChange={getUserData} className='form-control my-2' type="password" name='password' placeholder='Enter Your Password' />
                    {errList.filter((err) => err.context.label === "password")[0] ? (
                      <div className="text-danger text-start pb-1 fs-small">
                        {"Invalid password. Password min length 8, min 1 letter and 1 number"}
                      </div>
                    ) : null}
                    <input onChange={getUserData} className='form-control my-2' type="text" name='phoneNumber' placeholder='Enter Your phoneNumber' />
                    {errList.filter((err) => err.context.label === "phoneNumber")[0] ? (
                      <div className="text-danger text-start pb-1 fs-small">
                        {"Invalid phoneNumber number"}
                      </div>
                    ) : null}
                    {error && (
                      <div className="text-danger text-start pb-1 fs-small">
                        {error}
                      </div>
                    )}
                    <button className='btn btn-danger text-light w-100 rounded-2 mt-2'>Sign Up</button>
                    <p className='pt-2'>Already have an account? <Link className='text-black' to='/login'>Login Now</Link></p>
                  </form> */}
                  <form onSubmit={handleSubmit(onSubmit, onError)}>
                 
                      <label for="exampleFormControlInput1" className="form-label">
                        User Name
                      </label>
                      <input
                        {...register("name", {
                          required: "This field is required",
                        })}
                        type="text"
                        className="form-control my-2"
                        id="name"
                        name="name"
                        placeholder="User Name"
                      />
                      {errors.name && (
                        <span className="text-danger">
                          {errors.name.message}
                        </span>
                      )}
                  <label for="exampleFormControlInput1" className="form-label">
                        User Email
                      </label>
                    <input
                      type="email"
                      className="form-control my-2"
                      id="email"
                      name="email"
                      placeholder="Enter Your Email"
                      {...register("email", {
                        required: "This field is required",
                      })}
                    />
                    {errors.email && (
                      <span className="text-danger">
                        {errors.email.message}
                      </span>
                    )}
                    <label for="exampleFormControlInput1" className="form-label">
                        User Photo Profile
                      </label>
                    <input
                      {...register("userPhoto", {
                        required: "This field is required",
                      })}
                      type="file"
                      className="form-control my-2"
                      id="userPhoto"
                      name="userPhoto"
                      placeholder="Choose Your Photo"
                    />
                    {errors.photo && (
                      <span className="text-danger">
                        {errors.photo.message}
                      </span>
                    )}
                    <label for="exampleFormControlInput1" className="form-label">
                        User Phone
                      </label>
                    <input
                      type="number"
                      className="form-control my-2"
                      id="phoneNumber"
                      name="phoneNumber"
                      placeholder="phone Number"
                      {...register("phoneNumber", {
                        required: "This field is required",
                      
                      })}
                    />
                    {errors.phoneNumber && (
                      <span className="text-danger">
                        {errors.phoneNumber.message}
                      </span>
                    )}
                     <label for="exampleFormControlInput1" className="form-label">
                        User Password
                      </label>
                    <input
                      type="password"
                      className="form-control my-2"
                      id="password"
                      name="password"
                      placeholder="Password"
                      {...register("password", {
                        required: "This field is required",
                      })}
                    />
                    {errors.password && (
                      <span className="text-danger">
                        {errors.password.message}
                      </span>
                    )}
                     <button className='btn btn-danger text-light w-100 rounded-2 mt-2'>Sign Up</button>
                    <p className='pt-2'>Already have an account? <Link className='text-black' to='/login'>Login Now</Link></p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {loading ? <Loading /> : null}
    </>
  );
}
