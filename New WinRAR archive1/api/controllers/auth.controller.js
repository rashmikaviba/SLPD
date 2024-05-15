import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import constants from "../constants.js";
import emailUtil from "../utils/email.util.js";

export const signup = async (req, res, next) => {
  const { name, email, password, age, gender, role, profilePicture } = req.body;

  const isEmailExist = await User.findOne({ email });

  if (isEmailExist) {
    next(errorHandler(400, "Email already exists!"));
  }

  if (!name || !email || !password || email === "" || password === "") {
    next(errorHandler(400, "All fields are required!"));
  }

  if (age < 18) {
    next(errorHandler(400, "You must be 18 years or older to sign up!"));
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({
    name,
    username:
      name.toLowerCase().split(" ").join("") +
      Math.random().toString(9).slice(-4),
    email,
    password: hashedPassword,
    age,
    gender,
    role,
    profilePicture,
  });

  try {
    await newUser.save();
    res.status(201).json({
      statusCode: 201,
      message: "User created successfully! Please wait for approval!",
    });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    next(errorHandler(400, "All fields are required"));
  }

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "Invalid Email or password!"));
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, "Invalid Email or password!"));
    }

    if (validUser.isApproved === false) {
      return next(errorHandler(403, "Your account is not approved yet!"));
    }
    const token = jwt.sign(
      { id: validUser._id, role: validUser.role },
      process.env.JWT_SECRET
    );

    const { password: pass, ...rest } = validUser._doc;

    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json({
        user: rest,
        token: `Bearer ${token}`,
        message: "Login Successful!",
      });
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  const { email, name, googlePhotoUrl } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      if (user.isApproved) {
        const token = jwt.sign(
          { id: user._id, role: user.role },
          process.env.JWT_SECRET
        );
        const { password, ...rest } = user._doc;
        res
          .status(200)
          .cookie("access_token", token, {
            httpOnly: true,
          })
          .json({
            user: rest,
            token: `Bearer ${token}`,
            message: "Login Successful!",
            status: "old user",
          });
      } else {
        res.status(403).json({ message: "Your account is not approved yet!" });
      }
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        email,
        name: name,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
        role: constants.USER.ROLES.DRIVER,
      });
      await newUser.save();
      const { password, ...rest } = newUser._doc;

      let emailTemplate = emailUtil.SendTempPasswordMail({
        name: name,
        password: generatedPassword,
      });

      await emailUtil.sendEmail(email, "Temporary Password", emailTemplate);

      res.status(200).json({
        user: rest,
        message:
          "Your account is created, please wait for approval and check your email!",
        status: "new user",
      });
    }
  } catch (error) {
    next(error);
  }
};
