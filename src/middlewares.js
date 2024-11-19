import multer from "multer";

export const localsMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = "LeeTube";
  res.locals.loggedInUser = req.session.user || {};
  console.log(req.session.user);
  next();
};

export const protectedMiddleware = (req, res, next) => {
  if (req.session.loggedIn) {
    next();
  } else {
    return res.redirect("/login");
  }
};

export const publicOnlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    return next();
  } else {
    return res.redirect("/");
  }
};

/* START - Multer File Upload Middleware  */
export const avatarUpload = multer({
  dest: "uploads/avatarts/", // server file destination
  limits: {
    fileSize: 1000000, // 1MB
  },
});

export const videoUpload = multer({
  dest: "uploads/videos/",
  limits: {
    fileSize: 3000000, // 3MB
  },
});
/* END */
