/* SET ENVIRONMENT VARIABLES */
import "dotenv/config";

/* INITIALIZE SERVER */
import "./db";
import "./models/Video";
import "./models/User";
import app from "./server";

const PORT = 4000;

const handleListening = () =>
  console.log(`[O] Server listening on port http://localhost:${PORT}`);

app.listen(PORT, handleListening);
