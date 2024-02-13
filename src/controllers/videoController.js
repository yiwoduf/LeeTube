export const trending = (req, res) => res.send("Homepage Videos");

export const view = (req, res) => {
  console.log(req.params);
  return res.send(`Watch Video #${req.params.id}`);
};

export const edit = (req, res) => {
  console.log(req.params);
  return res.send(`Edit #${req.params.id}`);
};

export const search = (req, res) => res.send("Search");

export const upload = (req, res) => res.send("Upload");

export const deleteVideo = (req, res) => {
  console.log(req.params);
  return res.send(`Delete Video #${req.params.id}`);
};
