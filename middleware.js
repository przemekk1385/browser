const requireUrls = (req, res, next) => {
  const {
    query: { urls },
  } = req;

  if (!urls) {
    res.status(400).json({ detail: "urls query parameter is required" });
  } else {
    next();
  }
};

module.exports = { requireUrls };
