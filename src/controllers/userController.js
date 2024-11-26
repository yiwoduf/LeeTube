import User from "../models/User";
import Video from "../models/Video";
import bcrypt from "bcrypt";

export const getJoin = (req, res) =>
  res.render("users/join", { pageTitle: "Join" });

export const postJoin = async (req, res) => {
  const { name, username, email, password, passwordConfirm, location } =
    req.body;

  /* Username & Email duplicate check */
  const usernameExists = await User.exists({ username });
  if (usernameExists) {
    return res.status(400).render("users/join", {
      pageTitle: "Join",
      errorMessage: "This username cannot be used.",
    });
  }

  const emailExists = await User.exists({ email });
  if (emailExists) {
    return res.status(400).render("users/join", {
      pageTitle: "Join",
      errorMessage: "This email is already used.",
    });
  }
  /* END */

  /* Check Password Confirm */
  if (password !== passwordConfirm) {
    return res.status(400).render("users/join", {
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
    return res.status(400).render("users/join", {
      pageTitle: "Join",
      errorMessage: error._message,
    });
  }
  return res.redirect("/login");
};

export const getLogin = (req, res) =>
  res.render("users/login", { pageTitle: "Login" });

export const postLogin = async (req, res) => {
  const { username, password } = req.body;
  const pageTitle = "Login";
  let errorMessage = "Can't find account with entered credentials.";

  const user = await User.findOne({ username });
  // No User Found
  if (!user) {
    return res.status(400).render("users/login", {
      pageTitle,
      errorMessage,
    });
  }
  // Social Only Account
  if (user.socialOnly) {
    errorMessage =
      "This account is created with social login, please login with your social acount";
    return res.status(400).render("users/login", {
      pageTitle,
      errorMessage,
    });
  }
  const success = await bcrypt.compare(password, user.password);
  if (!success) {
    return res.status(400).render("users/login", {
      pageTitle,
      errorMessage,
    });
  }

  /* Store Login Info & User to Session */
  req.session.loggedIn = true;
  req.session.user = user;

  return res.redirect("/");
};

/* START - GITHUB OAUTH */
export const startGithubLogin = (req, res) => {
  const baseUrl = "https://github.com/login/oauth/authorize?";
  const config = {
    client_id: process.env.GITHUB_CLIENT,
    // allow_signup: false,
    scope: "read:user user:email",
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}${params}`;
  return res.redirect(finalUrl);
};

export const finishGithubLogin = async (req, res) => {
  const baseUrl = "https://github.com/login/oauth/access_token?";
  const config = {
    client_id: process.env.GITHUB_CLIENT,
    client_secret: process.env.GITHUB_SECRET,
    code: req.query.code,
  };

  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}${params}`;
  const tokenRequest = await (
    await fetch(finalUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    })
  ).json(); // FETCH URL & GET DATA FROM GITHUB
  if ("access_token" in tokenRequest) {
    // REQUEST TOKEN FROM CODE
    const { access_token } = tokenRequest;
    const apiUrl = "https://api.github.com";
    const userData = await (
      await fetch(`${apiUrl}/user`, {
        headers: { Authorization: `token ${access_token}` },
      })
    ).json();
    console.log(userData);
    const emailData = await (
      await fetch(`${apiUrl}/user/emails`, {
        headers: { Authorization: `token ${access_token}` },
      })
    ).json();
    const emailObj = emailData.find(
      (emailObj) => emailObj.primary === true && emailObj.verified === true
    );
    if (!emailObj) {
      return red.redirect("/login");
    }
    let user = await User.findOne({ email: emailObj.email });
    if (!user) {
      user = await User.create({
        name: userData.name,
        username: userData.login,
        email: emailObj.email,
        password: "",
        socialOnly: true,
        location: userData.location,
      });
    }
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect("/");
  } else {
    return res.redirect("/login");
  }
};
/* END - GITHUB OAUTH */

/* START - PROFILE EDIT */
export const getEdit = (req, res) => {
  return res.render("users/edit-profile", { pageTitle: "Edit Profile" });
};

export const postEdit = async (req, res) => {
  const {
    session: {
      user: {
        _id,
        avatarUrl: currentAvatarUrl,
        email: currentEmail,
        username: currentUsername,
        name: currentName,
        location: currentLocation,
      },
    },
    body: { name, email, username, location },
    file,
  } = req;

  const updates = {};
  if (name !== currentName) updates.name = name;
  if (location !== currentLocation) updates.location = location;

  // Check if email has changed THEN if it is duplicate & not the same user
  if (email !== currentEmail) {
    const existingEmail = await User.findOne({ email, _id: { $ne: _id } });
    if (existingEmail) {
      return res.status(400).render("users/edit-profile", {
        pageTitle: "Edit Profile",
        errorMessage: "This email is already taken.",
      });
    }
    updates.email = email;
  }

  // Check if username has changed THEN if it is duplicate & not the same user
  if (username !== currentUsername) {
    const existingUsername = await User.findOne({
      username,
      _id: { $ne: _id },
    });
    if (existingUsername) {
      return res.status(400).render("users/edit-profile", {
        pageTitle: "Edit Profile",
        errorMessage: "This username is already taken.",
      });
    }
    updates.username = username;
  }

  // Check if user uploaded avatar THEN change avatar URL
  if (file) {
    updates.avatarUrl = file.path;
  } else {
    updates.avatarUrl = currentAvatarUrl;
  }

  // Only update if there are changes
  if (Object.keys(updates).length > 0) {
    const updatedUser = await User.findByIdAndUpdate(_id, updates, {
      new: true,
    });
    req.session.user = updatedUser;
  }

  return res.redirect("/users/edit");
};

export const getChangePassword = (req, res) => {
  if (req.session.user.socialOnly === true) {
    return res.redirect("/");
  }
  return res.render("users/change-password", { pageTitle: "Change Password" });
};

export const postChangePassword = async (req, res) => {
  // send notification
  const {
    session: {
      user: { _id },
    },
    body: { oldPassword, newPassword, newPasswordConfirm },
  } = req;
  const user = await User.findById(_id);
  const success = await bcrypt.compare(oldPassword, user.password);
  if (!success) {
    return res.status(400).render("users/change-password", {
      pageTitle: "Change Password",
      errorMessage: "Password is incorrect",
    });
  }
  if (newPassword != newPasswordConfirm) {
    return res.status(400).render("users/change-password", {
      pageTitle: "Change Password",
      errorMessage: "Password does not match",
    });
  }
  user.password = newPassword;
  // Write to DB
  await user.save();
  return res.redirect("/users/logout");
};

/* END - PROFILE EDIT */

export const remove = (req, res) => res.send("Remove User");

export const logout = (req, res) => {
  req.session.destroy();
  return res.redirect("/");
};

export const view = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).populate("videos");
  if (!user) {
    return res.status(404).render("404", { pageTitle: "User not found." });
  }
  return res.render("users/profile", {
    pageTitle: user.name,
    user,
  });
};
