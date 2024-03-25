import axios from "axios";
import Joi from "joi";
import React, { useEffect, useRef, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AppLogo from "../AppLogo/AppLogo";
import Loading from "../Loading/Loading";
import lottie from "lottie-web";
import { useLogin } from "./useLogin";
import { useForm } from "react-hook-form";

export default function Login() {
  const { isLoggedIn, isLoggedInError, loggedIn } = useLogin();
  
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm();
  const imgContainer = useRef(null);

  let navigate = useNavigate();

  const onSubmit = (data) => {
    
    loggedIn(data, {
      onSuccess: (data) => {
        console.log(data , 'kkkkkkkkkkkkkkkkk');
        if (data.decoded.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/home");
        }
        reset();
      },
    });
  };
  function onError(errors) {
    console.log(errors);
  }

  useEffect(() => {
    const container = imgContainer.current;
    if (!container) return;

    const anim = lottie.loadAnimation({
      container: container,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: require("./../../images/book.json"),
    });

    return () => {
      anim.destroy();
    };
  }, []);

  return (
    <>
      <li className="fixed-top p-3 pe-lg-5 d-lg-flex d-none  ">
        <AppLogo />
      </li>
      <div className="container">
        <div className="row">
          <div className="min-vh-100 col-lg-5 d-none d-lg-flex justify-content-center align-items-center">
            <div className="w-100" ref={imgContainer}>
              {" "}
            </div>
          </div>
          <div className="col-lg-7">
            <div className="min-vh-100 d-flex justify-content-center align-items-center text-center signup-container">
              <div className="bg-light bg-opacity-25 shadow-lg w-95 mx-auto p-5 rounded-2">
                <h1 className="fw-bold">Login Now</h1>
                <div className="pt-3">
                  <form onSubmit={handleSubmit(onSubmit, onError)}>
                    <input
                      className="form-control my-2"
                      type="email"
                      name="email"
                      id="email"
                      {...register("email", {
                        required: "This field is required",
                      })}
                      placeholder="Enter Your Email"
                    />
                    {errors.email && (
                      <div className="text-danger text-start pb-1 fs-small">
                        {errors.email.message}
                      </div>
                    )}

                    <input
                      className="form-control my-2"
                      type="password"
                      name="password"
                      placeholder="Enter Your Password"
                      id="password"
                      {...register("password", {
                        required: "This field is required",
                      })}
                    />
                    {errors.password && (
                      <div className="text-danger text-start pb-1 fs-small">
                        {errors.password.message}
                      </div>
                    )}

                    <button className="btn btn-danger text-light w-100 rounded-2 mt-2">
                      Login
                    </button>
                    <div className=" py-2">
                      <p className="my-0">
                        Don't have an account?{" "}
                        <Link
                          className="text-decoration-none text-black fw-semibold text-decoration-underline"
                          to="/"
                        >
                          Sign Up Now
                        </Link>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isLoggedIn ? <Loading /> : null}
    </>
  );
}
