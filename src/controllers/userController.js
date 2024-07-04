import User from "../models/User";
import bcrypt from "bcrypt";

export const getJoin = (req, res) => res.render("join", { pageTitle: "Join" });

export const postJoin = async (req, res) => {
  const { name, username, email, password, passwordConfirm, location } =
    req.body;

  /* Username & Email duplicate check */
  const usernameExists = await User.exists({ username });
  if (usernameExists) {
    return res.status(400).render("join", {
      pageTitle: "Join",
      errorMessage: "This username cannot be used.",
    });
  }

  const emailExists = await User.exists({ email });
  if (emailExists) {
    return res.status(400).render("join", {
      pageTitle: "Join",
      errorMessage: "This email is already used.",
    });
  }
  /* END */

  /* Check Password Confirm */
  if (password !== passwordConfirm) {
    return res.status(400).render("join", {
      pageTitle: "Join",
      errorMessage: "Password does not match.",
    });
  }
  /* END */

  try {
    await User.create({
      name,
      username,
      email,
      password,
      location,
    });
  } catch (error) {
    console.log("[!] Error", error);
    return res.status(400).render("join", {
      pageTitle: "Join",
      errorMessage: error._message,
    });
  }
  return res.redirect("/login");
};

export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "Login" });

export const postLogin = async (req, res) => {
  const { username, password } = req.body;
  const pageTitle = "Login";
  const errorMessage = "Can't find account with entered credentials.";

  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).render("login", {
      pageTitle,
      errorMessage,
    });
  }

  const success = await bcrypt.compare(password, user.password);
  if (!success) {
    return res.status(400).render("login", {
      pageTitle,
      errorMessage,
    });
  }

  console.log("Logged In");
  return res.redirect("/");
};

export const edit = (req, res) => res.send("Edit User");

export const remove = (req, res) => res.send("Remove User");

export const logout = (req, res) => res.send("Logout");

export const view = (req, res) => res.send("View");
