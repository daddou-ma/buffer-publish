const stripePublishableKey = process.env.STRIPE_PUBLISHABLE;

const stripeScript = `
  <script id="stripe-js" src="https://js.stripe.com/v3/" async></script>
  <script type="text/javascript">
    window.STRIPE_PUBLISHABLE_KEY = '${stripePublishableKey}';
  </script>
`;

module.exports = () => stripeScript;
