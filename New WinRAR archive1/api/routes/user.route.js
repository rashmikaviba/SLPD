import express from "express";
import {
  ApproveUser,
  DeleteUser,
  GetAllUsers,
  AddDriver,
  UpdateDriver,
  GetDriverById,
  GetProfile,
  UpdatePassword,
} from "../controllers/user.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import constants from "../constants.js";

const UserRouter = express.Router();

UserRouter.get(
  "/getAll",
  authMiddleware.authorize([constants.USER.ROLES.ADMIN]),
  GetAllUsers
);

UserRouter.delete(
  "/:id",
  authMiddleware.authorize([constants.USER.ROLES.ADMIN]),
  DeleteUser
);

UserRouter.put(
  "/approve/:id",
  authMiddleware.authorize([constants.USER.ROLES.ADMIN]),
  ApproveUser
);

UserRouter.post(
  "/create",
  authMiddleware.authorize([constants.USER.ROLES.ADMIN]),
  AddDriver
);

UserRouter.put(
  "/update/:id",
  authMiddleware.authorize([constants.USER.ROLES.ADMIN]),
  UpdateDriver
);

UserRouter.get("/getById/:id", GetDriverById);

UserRouter.get(
  "/profile",
  authMiddleware.authorize([
    constants.USER.ROLES.ADMIN,
    constants.USER.ROLES.DRIVER,
  ]),
  GetProfile
);

UserRouter.put(
  "/updatePassword",
  authMiddleware.authorize([
    constants.USER.ROLES.ADMIN,
    constants.USER.ROLES.DRIVER,
  ]),
  UpdatePassword
);

export default UserRouter;
