import Video from "../models/Video";

export const home = async (req, res) => {
  const videos = await Video.find({});
  return res.render("home", { pageTitle: "Home", videos });
};

export const view = (req, res) => {
  const { id } = req.params;
  return res.render("watch", {
    pageTitle: `Watching`,
  });
};

export const getEdit = (req, res) => {
  const { id } = req.params;
  return res.render("edit", {
    pageTitle: `Editing`,
  });
};

export const postEdit = (req, res) => {
  const { id } = req.params;
  return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload Video" });
};

export const postUpload = (req, res) => {
  const { title } = req.body;
  return res.redirect("/");
};

export const search = (req, res) => res.send("Search", { pageTitle: "Search" });

export const upload = (req, res) => res.send("Upload", { pageTitle: "Upload" });

export const deleteVideo = (req, res) => {
  console.log(req.params);
  return res.send(`Delete Video #${req.params.id}`);
};
