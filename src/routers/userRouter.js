/* User Router Configuration */

import express from "express";
import { edit, remove, logout, view } from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/logout", logout);
userRouter.get("/edit", edit);
userRouter.get("/remove", remove);
userRouter.get(":id", view);

export default userRouter;
