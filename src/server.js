import express from "express";
import morgan from "morgan";
import session from "express-session";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import { localsMiddleware } from "./middlewares";

/* SETUP EXPRESS SERVER */
const app = express();
/* MORGAN HTTP REQ LOG (DEV) */
const logger = morgan("dev");

/* SET NAVIGATORS & VIEW ENGINE */
app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);
app.use(express.urlencoded({ extended: true })); // HTML form data to JS

/* SETUP SESSION */
app.use(session({ secret: "test", resave: true, saveUninitialized: true }));

/* SET ROUTERS */
app.use(localsMiddleware);
app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

export default app;
