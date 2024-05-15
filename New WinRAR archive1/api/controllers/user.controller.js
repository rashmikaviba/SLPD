import User from "../models/user.model.js";
import emailUtil from "../utils/email.util.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";

export const GetAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ role: "Driver" });

    // arrange user
    const usersArr = users.map((user) => {
      return {
        _id: user._id,
        name: user.name,
        email: user.email,
        age: user.age,
        isApproved: user.isApproved,
        role: user.role,
        photo: user.profilePicture,
        status: user.isApproved ? "Approved" : "Pending",
        gender: user.gender,
      };
    });
    res.status(200).json({
      isSuccess: true,
      users: usersArr,
    });
  } catch (error) {
    next(error);
  }
};

// Delete user
export const DeleteUser = async (req, res, next) => {
  const userId = req.params.id;
  try {
    const isUser = await User.findById(userId);

    if (!isUser) {
      return next(errorHandler(404, "User not found!"));
    }

    await User.findByIdAndDelete(userId);

    res.status(200).json({
      isSuccess: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// Approve user
export const ApproveUser = async (req, res, next) => {
  const userId = req.params.id;
  try {
    const isUser = await User.findById(userId);

    if (!isUser) {
      return next(errorHandler(404, "User not found!"));
    }

    await User.findByIdAndUpdate(userId, { isApproved: true });

    res.status(200).json({
      isSuccess: true,
      message: "User approved successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const AddDriver = async (req, res, next) => {
  const { name, email, age, role, gender } = req.body;

  try {
    const isEmailExist = await User.findOne({ email });

    if (isEmailExist) {
      next(errorHandler(400, "Email already exists!"));
    }

    const generatedPassword =
      Math.random().toString(36).slice(-8) +
      Math.random().toString(36).slice(-8);

    const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

    const user = new User({
      name,
      username:
        name.toLowerCase().split(" ").join("") +
        Math.random().toString(9).slice(-4),
      email,
      age,
      role: role,
      gender,
      password: hashedPassword,
      isApproved: false,
    });

    await user.save();

    let emailTemplate = emailUtil.SendTempPasswordMail({
      name: name,
      password: generatedPassword,
    });

    await emailUtil.sendEmail(email, "Temporary Password", emailTemplate);

    res.status(201).json({
      isSuccess: true,
      message: "Driver added successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const UpdateDriver = async (req, res, next) => {
  const { name, age, gender } = req.body;
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      next(errorHandler(400, "User not found!"));
    }

    await User.findByIdAndUpdate(userId, {
      name,
      age,
      gender,
    });

    res.status(200).json({
      isSuccess: true,
      message: "Driver updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const GetDriverById = async (req, res, next) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      next(errorHandler(404, "User not found"));
    }

    res.status(200).json({
      isSuccess: true,
      user: user,
    });
  } catch (error) {
    next(error);
  }
};

export const GetProfile = async (req, res, next) => {
  const userId = req.auth.id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      next(errorHandler(404, "User not found!"));
    }

    res.status(200).json({
      isSuccess: true,
      user: user,
    });
  } catch (error) {
    next(error);
  }
};

export const UpdatePassword = async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;
  const userId = req.auth.id;

  try {
    const user = await User.findById(userId);

    const validPassword = bcryptjs.compareSync(oldPassword, user.password);

    if (!validPassword) {
      return next(errorHandler(400, "Invalid old password!"));
    }

    const hashedPassword = bcryptjs.hashSync(newPassword, 10);

    await User.findByIdAndUpdate(userId, {
      password: hashedPassword,
    });

    res.status(200).json({
      isSuccess: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    next(error);
  }
};
