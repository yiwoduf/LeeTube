/* Video Router Configuration */

import express from "express";
import {
  view,
  getEdit,
  postEdit,
  getUpload,
  postUpload,
  deleteVideo,
} from "../controllers/videoController";
import { protectedMiddleware, videoUpload } from "../middlewares";

const videoRouter = express.Router();

videoRouter.get("/:id([0-9a-f]{24})", view);
videoRouter
  .route("/:id([0-9a-f]{24})/edit")
  .all(protectedMiddleware)
  .get(getEdit)
  .post(postEdit);
videoRouter
  .route("/:id([0-9a-f]{24})/delete")
  .all(protectedMiddleware)
  .get(deleteVideo);
videoRouter
  .route("/upload")
  .get(getUpload)
  .all(protectedMiddleware)
  .post(videoUpload.single("video"), postUpload);

export default videoRouter;
