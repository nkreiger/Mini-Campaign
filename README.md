



This is another of my big projects called Mini-Campaign. It showcases my ability to work more with redux-forms, and adds in elements that were not seen in previous projects.
In this coding masterpiece I work with Google OAuth, Stripe payments, and the Send Grid API. Basically, it allows you to send large survey emails to as many people as you want using the SendGrid API. Because i have to pay...the feedback from the surveys (WebHook data) is not hooked up. Mayber in the future I will hook it up, however, you can receive feedback from your surveys.

This Web Application is currently hosted on Heroku:
https://ancient-plateau-92232.herokuapp.com/ ... check it out

Best regards,
Noah Kreiger
































## HTTP is stateless, which is why we need redux to keep the state, for example to know that a user is still logged in

## MongoDB Storage

Collections -> Mongoose Model Class includes an entire collection

    * User -> profile... -> Model Instance
    * Posts -> Model Instance
    * Payments -> Model Instance

one class is one collection
one instance is one component of collection

# schemaless, so inside every collection, each part can have different properties instead of the exact same in other databases like mysql...

## REDUX EXPLANATION

Redux is all about holding all the state or data inside of our application

Redux Store => // where all of our state exists
// we call an action in an action creator to change our state which dispatches an action that is then sent to all of our reducers which are combined to use to update the state in our redux store causing them to re-render
CombineReducers = 1. authReducer 2. surveysReducer
