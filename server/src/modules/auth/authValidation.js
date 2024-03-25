import Joi from "joi";
export const signupSchema = Joi.object({
  name: Joi.string().min(5).max(30).required(),
  email: Joi.string().email().min(10).max(30),
  password: Joi.string().min(8).max(20),
  passwordConfirm: Joi.ref("password"),
  phoneNumber: Joi.string().pattern(/^(\+201|01)[0125][0-9]{8}$/),
});
export const loginSchema = Joi.object({
  email: Joi.string().email().min(10).max(30),
  password: Joi.string().min(8).max(20),
});
