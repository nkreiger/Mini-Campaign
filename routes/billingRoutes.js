const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);
const requireLogin = require("../middlewares/requireLogin");
// middleware to check if user exists before we crash server
// assuming that the user is logged in to access these routes, so make sure you check this

module.exports = app => {
  // @route POST api/stripe
  // @desc  use token to add credits
  // @access private, accessed only after stripe payment
  // could pass in as many middlewares as you want
  app.post("/api/stripe", requireLogin, async (req, res) => {
    const resCharge = await stripe.charges.create({
      // pass in configuration object to instruct stripe what to do with this object
      amount: 500, // amt to bill
      currency: "usd",
      description: "5 dollars for five credits",
      source: req.body.id // get token id
    });

    // user is signed in at this point so can access user model
    req.user.credits += 5;
    const user = await req.user.save(); // must save changes to DB and update copy of user to keep model updated
    res.send(user); // send back updated copy of model
  });
};
