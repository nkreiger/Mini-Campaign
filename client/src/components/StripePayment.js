import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";

import { connect } from "react-redux";

import * as actions from "../actions";

class StripePayment extends Component {
  render() {
    return (
      <StripeCheckout
        name="Mini-Campaign"
        description="$5 for 5 email credits!"
        amount={500} // amt is in cents, so 100 = 1 dollar
        token={token => this.props.handleToken(token)} // this is the callback token representing the authorized charge from stripe
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <button className="btn btn-primary">Add Credits</button>
      </StripeCheckout>
    );
  }
}

export default connect(null, actions)(StripePayment);
