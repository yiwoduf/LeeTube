import mongoose from "mongoose";

/* CONNECT TO MONGO DB LOCAL */
mongoose.connect("mongodb://127.0.0.1:27017/leetube");

/* CONSOLE LOG CONNECTION INFO */
const db = mongoose.connection;

const handleOpen = () => console.log("[O] Connected to DB");
const handleError = (error) => console.log("[!] DB Error", error);

db.on("error", handleError);
db.once("open", handleOpen);
