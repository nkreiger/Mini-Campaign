const passport = require("passport"); // brings in original passport module

module.exports = app => {
  // first is route, second is what should be executed when a req comes to this route

  // @route GET auth/google
  // @desc  Authenticate user with google log-in
  // @access public, anyone can sign up or try to login

  app.get(
    "/auth/google", // passport, attempt to authenticate the user coming in on this route
    passport.authenticate("google", {
      // google strategy has internal code, that is 'google', so passport will know to find the google passport authenticator
      scope: ["profile", "email"] // options object
      // specifies to google we want access to this users profile and email information from their account, these are premade strings in the google oauth process not made up
    })
  );

  // in this callback route they are going to have the code, and google will see that and it will handle it differnetly by exchanging the code for an actual profile, it will call the next part of the GoogleStrategy, aka the accessToken to be saved to Database

  // @route GET auth/google/callback
  // @desc  Get callback data from google to redirect user if signed in
  // @access Private can only access this after signed in

  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    // after authenticate process is done, send user to correct route
    (req, res) => {
      // redirect to dashboard route after sign-in
      res.redirect("/surveys");
      // full HTTP requrest, so it reloads versus AJAX request which uses react and redux and is much faster
    }
  );

  // @route GET api/logout
  // @desc  logout user and clear cookie
  // @access Private, have to be signed in
  app.get("/api/logout", (req, res) => {
    // kills cookie
    req.logout();

    // prove to user they are no longer signed in
    res.redirect("/");
  });

  // @route GET api/current_user
  // @desc  Get current user signed in
  // @access public, anyone can find current user logged in only returns id unless logged in...
  app.get("/api/current_user", (req, res) => {
    res.send(req.user); // send back user that has been through OAuth flow
  });
};
