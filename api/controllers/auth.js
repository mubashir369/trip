import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";
export const register = async (req, res, next) => {
  try {
    const exUserName = await User.find({ username: req.body.username });
    const exEmail = await User.find({ email: req.body.email });
    if (exUserName) {
      return res.status(400).json({ message: "username already Exist" });
    }
    if (exEmail) {
      return res.status(400).json({ message: "Email already Exist" });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
      country: req.body.country,
      city: req.body.city,
    });
    await newUser.save();
    res.status(200).send("User has been created");
  } catch (error) {
    next(error);
  }
};
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User Not found!"));
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong Password or username !"));
    const token = jwt.sign(
      { _id: user._id, isAdmin: user.isAdmin },
      process.env.JWT,{expiresIn:86400}
    );
    const { password, isAdmin, ...otherDetails } = user._doc;
    res
      .status(200)
      .json({ ...otherDetails , token, isAdmin });
  } catch (error) {
    next(error);
  }
};
