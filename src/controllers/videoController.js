const testUser = {
  username: "Lee",
  loggedIn: false,
};

export const trending = (req, res) => {
  const videos = [
    {
      title: "Video #1",
      rating: 5,
      comments: 2,
      createdAt: "2 minutes ago",
      views: 100,
      id: 1,
    },
    {
      title: "Video #2",
      rating: 5,
      comments: 2,
      createdAt: "2 minutes ago",
      views: 100,
      id: 1,
    },
    {
      title: "Video #3",
      rating: 5,
      comments: 2,
      createdAt: "2 minutes ago",
      views: 100,
      id: 1,
    },
  ];
  res.render("home", { pageTitle: "Home", testUser, videos });
};

export const view = (req, res) =>
  res.render("watch", { pageTitle: "Watch", videoID: `#${req.params.id}` });

export const edit = (req, res) => res.render("edit", { pageTitle: "Edit" });

export const search = (req, res) => res.send("Search", { pageTitle: "Search" });

export const upload = (req, res) => res.send("Upload", { pageTitle: "Upload" });

export const deleteVideo = (req, res) => {
  console.log(req.params);
  return res.send(`Delete Video #${req.params.id}`);
};
