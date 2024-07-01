import express from "express";
import morgan from "morgan";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

/* SETUP EXPRESS SERVER */
const app = express();
/* MORGAN HTTP REQ LOG (DEV) */
const logger = morgan("dev");

/* SET NAVIGATORS & VIEW ENGINE */
app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);
app.use(express.urlencoded({ extended: true })); // HTML form data to JS
app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

export default app;
