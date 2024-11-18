/* User Router Configuration */

import express from "express";
import {
  remove,
  logout,
  view,
  startGithubLogin,
  finishGithubLogin,
  getEdit,
  postEdit,
  getChangePassword,
  postChangePassword,
} from "../controllers/userController";
import {
  protectedMiddleware,
  publicOnlyMiddleware,
  uploadFiles,
} from "../middlewares";

const userRouter = express.Router();

userRouter.get("/logout", protectedMiddleware, logout);
userRouter
  .route("/edit")
  .all(protectedMiddleware)
  .get(getEdit)
  .post(uploadFiles.single("avatar"), postEdit);
userRouter
  .route("/change-password")
  .all(protectedMiddleware)
  .get(getChangePassword)
  .post(postChangePassword);
userRouter.get("/remove", remove);
userRouter.get("/github/login", publicOnlyMiddleware, startGithubLogin);
userRouter.get("/github/finish", publicOnlyMiddleware, finishGithubLogin);
userRouter.get(":id", view);

export default userRouter;
