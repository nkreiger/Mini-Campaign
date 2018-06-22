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
