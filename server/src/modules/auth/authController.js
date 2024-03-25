import userModel from "../../../database/models/userModel.js";
import bcrypt from "bcryptjs";
import { createToken, decodeToken } from "../../utils/createToken.js";
import { sendEmail } from "../../utils/email.js";
import { verificationHTML } from "../../utils/emailHtml.js";
import { resetPsswordTemplate } from "../../utils/resetPasswordHtml.js";
import { catchErr } from "../../error/catchErr.js";
import AppErr from "../../error/AppErr.js";


export const signup = catchErr(async (req, res, next) => {
  console.log('sssssssss');
  const { email, password, phoneNumber, name } = req.body;
  console.log(name);
  if (!email || !password || !phoneNumber || !name) return next(new AppErr("please fill the data", 400));
  const userExist = await userModel.findOne({ email });
  if (userExist) return next(new AppErr("duplicate  email", 400));
  const user = await userModel.create({
    email,
    password,
    phoneNumber,
    name,
    userPhoto: req.file.filename
  });
  const token = createToken({ id: user._id, role: user.role });
  const emailToken = createToken(email);
  // const url = `${req.protocol}://${req.get("host")}/users/verify/${emailToken}`;
  try {
    await sendEmail({ email, template: verificationHTML(emailToken) });
  } catch (err) {
    console.log(err);
  }
  return res.status(200).json({ message: "you are signed up", token });
});

export const login = catchErr(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email }).select("+password");
  if (!user || !(await bcrypt.compare(password, user.password)))
    return next(new AppErr("invalid email or password", 400));
  const token = createToken({ id: user._id, role: user.role });
  return res
    .status(200)
    .json({ status: "success", message: "you are logged in", token });
});

export const verify = async (req, res, next) => {
  const { token } = req.params;
  const email = decodeToken(token);
  const verifiedEmail = await userModel.findOneAndUpdate(
    { email },
    { verifyEmail: true },
    { new: true }
  );
  if (!verifiedEmail) next(new AppErr("invalid verify try later", 400));
  return res.json({ message: " account verified" });
};

export const forgetPassword = async (req, res, next) => {
  const { email } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) next(new AppErr("email is not found", 400));
  const token = createToken(email);
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/users/resetPassword/${token}`;
  await sendEmail({ email, template: resetPsswordTemplate(resetUrl) });
  return res.status(200).json({ message: "confirm reset email" });
};

export const resetPassword = async (req, res, next) => {
  const { token } = req.params;
  const { password, passwordConfirm } = req.body;
  const email = decodeToken(token);
  const user = await userModel.findOne({ email });
  if (!user) next(new AppErr("invalid token", 400));
  user.password = password;
  user.passwordConfirm = passwordConfirm;
  await user.save();
  const createdtoken = createToken({ id: user._id, role: user.role });
  return res.json({
    status: "success",
    token: createdtoken,
  });
};

export const updatePassword = catchErr(async (req, res, next) => {
  const user = await userModel.findById(req.user.id).select("+password");
  if (!user || !(await bcrypt.compare(req.body.password, user.password)))
    next(new AppErr("invalid password or passwordConfirm", 400));
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();
  const createdtoken = createToken({ id: user._id });
  return res.json({ message: "success", token: createdtoken });
});
