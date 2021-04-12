const express = require("express");
const app = express();
// This is your real test secret API key.
const stripe = require("stripe")("sk_test_51IfNeFIcNwtJp8IXRUNmKJWgZh2IyoZLmlqkRVZv86BF02Nf0Cl4P3h8QK1GFW35UtKxyfX6HfHsWG2mJa963noD00rcg8m3Kw");
app.use(express.static("."));
app.use(express.json());
const calculateOrderAmount = items => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  console.log(items[0].amount)
  return items[0].amount;
};
app.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;
  const { currency } = req.body;
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: currency
  });
  res.send({
    clientSecret: paymentIntent.client_secret
  });
});
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log('Node server listening on ${PORT}'));
