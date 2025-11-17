require('dotenv').config();
const express = require('express');
const Stripe = require('stripe');
const bodyParser = require('body-parser');
const app = express();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const YOUR_DOMAIN = process.env.YOUR_DOMAIN || 'http://localhost:3000';

app.use(express.static('public'));
app.use(express.json());

// Création session Stripe
app.post('/create-checkout-session', async (req, res) => {
  const { items } = req.body;

  const line_items = items.map(i => ({
    price_data: {
      currency: 'eur',
      product_data: { name: i.name },
      unit_amount: Math.round(i.unit_amount * 100),
    },
    quantity: i.quantity || 1,
  }));

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items,
      success_url: `${YOUR_DOMAIN}/success.html`,
      cancel_url: `${YOUR_DOMAIN}/cancel.html`,
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur Stripe' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
