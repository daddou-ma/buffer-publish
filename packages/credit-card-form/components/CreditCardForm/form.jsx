import React, { Component } from "react";
import { CardElement, injectStripe } from "react-stripe-elements";

class CreditCardForm extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  componentDidUpdate() {}

  componentWillUnmount() {}

  onChange = () => {};

  onSubmit = e => {
    e.preventDefault();
  };

  render() {
    return <CardElement />;
  }
}

export default injectStripe(CreditCardForm);
