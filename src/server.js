import express from "express";

const PORT = 4000;

const app = express();

const handleHome = (req, res) => {
  return res.send("Hi Kawon!");
};

const handleLogin = (req, res) => {
  return res.send("Login Page");
};

app.get("/", handleHome);
app.get("/login", handleHome);

const handleListening = () =>
  console.log(`Server listening on port http://localhost:${PORT}`);

app.listen(PORT, handleListening);
