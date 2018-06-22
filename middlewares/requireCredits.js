// next is a function we call when our middleware is done authenticating that user has enough credits
module.exports = (req, res, next) => {
  if (req.user.credits < 1) {
    return res.status(403).send({
      error: "Insufficient Credits!"
    });
  }

  next(); // proceed
};
