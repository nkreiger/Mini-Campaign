// next is a function we call when our middleware is done authenticating that user is logged in
module.exports = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send({
      error: "You must log In!"
    });
  }

  next(); // proceed
};
