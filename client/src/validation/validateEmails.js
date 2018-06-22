// eslint-disable-next-line
const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// receive string with all emails in them
export default emails => {
  // 1. split emails by comma and take care of any spaces = now have an array of emails
  const invalidEmailsArray = emails
    .split(",")
    .map(email => email.trim()) // map function takes value out of array and adds it to new array and runs the function on it... end result ends up on email array

    // now run filter function to dump bad emails for display, and keep good emails
    .filter(
      email =>
        // if true it will stay in array, if else it will be removed... emailregex.com good way to find validation for emails
        re.test(email) === false
    );

  if (invalidEmailsArray.length) {
    return `These emails are invalid: ${invalidEmailsArray}`;
  }

  return;
};
