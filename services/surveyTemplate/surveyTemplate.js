// contains all the actual html to be displayed in any email we send out
const keys = require("../../config/keys");

module.exports = survey => {
  return `
    <html>
      <body>
        <div style="text-align: center;">
          <h3>I'd like your input!</h3>
          <p>Please answer the following question: </p>
          <p>${survey.body}</p>
        <div>
          <a href="${keys.redirectDomain}/api/surveys/${survey.id}/yes">
          Yes  
          </a>
          <a href="${keys.redirectDomain}/api/surveys/${survey.id}/no">
          No
          </a>
        </div>
        </div>
      </body>
    </html>
  `;
};
// now have a function that takes a survey that returns a string of the actual html we want in the BODY of our email
