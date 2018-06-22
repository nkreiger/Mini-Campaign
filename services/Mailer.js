const sendgrid = require("sendgrid");
const helper = sendgrid.mail;
const keys = require("../config/keys");

// adding additional customization to the mailer class with helper
class Mailer extends helper.Mail {
  // receives the two properties passed in, and destructor them into what we want, so 1. Object 2. Template for body of email
  constructor({ subject, recipients }, content) {
    // make sure any constructor defined on mail class is called
    super(); // ES2015 classes

    this.sgApi = sendgrid(keys.sendGridKey); // returns an object we can use in order to send
    this.from_email = new helper.Email("no-reply@minicampaign.com");
    this.subject = subject; // bringing this in
    this.body = new helper.Content("text/html", content);
    this.recipients = this.formatAddresses(recipients); // calls helper function we are making to get all the addresses put in

    this.addContent(this.body); // adds built-in helper function from helper.Mail class that adds content to the email

    // enable click-tracking inside of our email
    this.addClickTracking();

    this.addRecipients();
  }

  formatAddresses(recipients) {
    // iterate through list and extract the email
    return recipients.map(({ email }) => {
      return new helper.Email(email);
    });
  }

  addClickTracking() {
    const trackingSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true, true);

    // take first variable and pass in the second
    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
    // add it to email settings
  }

  addRecipients() {
    const personalize = new helper.Personalization(); // define var
    // iterate through list of recipients and add to object
    this.recipients.forEach(recipient => {
      personalize.addTo(recipient);
    });

    // add entire object
    this.addPersonalization(personalize);
  }

  // asynchronous
  async send() {
    const req = await this.sgApi.emptyRequest({
      method: "POST",
      path: "/v3/mail/send",
      body: this.toJSON() // conver to json
    });

    const res = await this.sgApi.API(req);
    return res;
  }
}

module.exports = Mailer;
