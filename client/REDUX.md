## Why we need redux, and what will it do

We want to communicate from the surveyfield directly to the survey field component for review

Every time the user enters input it will call an action creator that updates the state in redux store in real-time

this allows the bottom fields to communicate instantaneously to the top store in redux

Now survey form review can use connect to pull data from the redux store that is up-to-date

Redux form does all this for us automatically for us, validation, updating,...saving us a lot of code

We will use a couple helpers

Must wire up a formReducer from the redux-form library giving us a handle into our store to take care of the busy work for us
