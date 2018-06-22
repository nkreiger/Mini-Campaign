const _ = require("lodash");
const Path = require("path-parser").default;
const { URL } = require("url");
// to parse through and pull correct email
// default module that will help us parse through the url

const mongoose = require("mongoose");

// middlewares
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");

const Mailer = require("../services/Mailer");
// templates
const surveyTemplate = require("../services/surveyTemplate/surveyTemplate");

// now have access to model class in order to create instance of a survey
const Survey = mongoose.model("surveys");

module.exports = app => {
  // @route POST api/surveys
  // @desc  create and save new survey to DB, and send out the survey to all the recipients
  // @access private, accessed only if logged in
  app.get("/api/surveys/:surveyId/:choice", (req, res) => {
    res.send(`
      <div style="width: 100%; text-align: center;">
        <h1>Thanks for your feedback!</h1>
        <p>
          Here at Mini-Campaign it's the users feedback that helps improve our
          service, we appreciate you taking the time and we will act on your
          feedback ASAP
        </p>
        <p>
          Best, <br />
          CEO/Founder Noah Kreiger
        </p>
      </div>
      `);
  });

  // @route POST api/surveys
  // @desc  create and save new survey to DB, and send out the survey to all the recipients
  // @access private, accessed only if logged in
  app.post("/api/surveys", requireLogin, requireCredits, async (req, res) => {
    // create and save new survey to DB
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(",").map(email => {
        return {
          // could be just ({ email })
          email: email.trim()
        };
      }),
      _user: req.user.id, // id property of user, not in body because its not an input from user, its already established
      dateSent: Date.now()
    });

    // Great place to send an email
    // first argument: subject and recipients
    // second argument: body of email, html to show in email itself
    const mailer = new Mailer(survey, surveyTemplate(survey));

    try {
      await mailer.send(); // asynch which makes our post request async...
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();
      res.send(user); // send back updated user model with new credit value
    } catch (err) {
      res.status(422).send(err);
    }
  });

  // @route POST api/surveys/webhooks
  // @desc  receive webhook data
  // @access private, accessed only if logged in
  app.post("/api/surveys/webhooks", (req, res) => {
    // only need one new path instance
    // will return null if no surveyId and choice exist in url
    const p = new Path("/api/surveys/:surveyId/:choice");
    // don't need async because we have nothing to responde to SendGrid...so we can wait
    _.chain(req.body)
      .map(({ email, url }) => {
        // pull pathname /api/survey... from url
        const match = p.test(new URL(url).pathname); // will either have values or null, so can't destructor because could return null
        if (match) {
          return {
            email,
            surveyId: match.surveyId,
            choice: match.choice
          }; // exists
        }
      })
      .compact()
      .uniqBy("email", "surveyId")
      .each(({ surveyId, email, choice }) => {
        // for every event do this...
        // find one record with certain survey id
        Survey.updateOne(
          {
            _id: surveyId, // mongoDb = _id
            recipients: {
              // for every survey in the survey collection look through the recipients column to find one that matches these requirements
              $elemMatch: {
                email: email,
                responded: false
              }
            }
          },
          {
            // update it with this after found, entirely done in the mongoDB world

            // mongo operator = $inc
            // so find choice property (either yes or no) and increment that by exactly one, so add one vote to either yes or no property, replace yes or no with choice... ES6 key interprolation
            $inc: {
              [choice]: 1
            },

            // update responded property to true by setting this property, find appropriate recipient at index $ then update responded property
            $set: {
              "recipients.$.responded": true
            },
            lastResponded: new Date()
          }
        ).exec(); //executes to database
      })
      .value();

    // compactEvents will return only event objects

    // go through list of elements and look at email and survey property to remove duplicates
    console.log("done");
    res.send({});
  });

  // want to do all the heavy searches inside the database because takes power to move it back and forth and search through

  // @route Get api/surveys/
  // @desc  Get current users surveys
  // @access private, accessed only if logged in by current user
  app.get("/api/surveys", requireLogin, async (req, res) => {
    // pull out all different surveys by curr user
    // must be logged in
    const surveys = await Survey.find({
      _user: req.user.id
    }).select({
      recipients: false
    }); //select given properties inside, not allll that we don't need

    res.send(surveys);
  });
};

// call chain, do each individual step, then call value to get end value
