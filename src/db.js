import mongoose from "mongoose";

/* CONNECT TO MONGO DB LOCAL */
mongoose.connect(process.env.DB_URL);

/* CONSOLE LOG CONNECTION INFO */
const db = mongoose.connection;

const handleOpen = () => console.log("[O] Connected to DB");
const handleError = (error) => console.log("[!] DB Error", error);

db.on("error", handleError);
db.once("open", handleOpen);
