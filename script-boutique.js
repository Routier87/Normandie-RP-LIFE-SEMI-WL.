// script-boutique.js

let cart = [];

// Récupère toutes les boîtes de produits
document.querySelectorAll('.logo-box').forEach((box, index) => {
  const btn = box.querySelector('.buy-btn');
  // Si le logo a un titre, sinon crée un nom par défaut
  const title = box.querySelector('.logo-title') ? box.querySelector('.logo-title').innerText : 'Produit ' + (index + 1);
  // Récupère le prix depuis le texte (ex : "100.000k" devient 100)
  const priceText = box.querySelector('.logo-price').innerText.replace(/[^\d]/g, '');
  const price = priceText ? parseFloat(priceText) : 0;

  btn.addEventListener('click', () => {
    cart.push({ item: title, price });
    updateCartDisplay();
    alert(`${title} ajouté au panier !`);
  });
});

// Met à jour l'affichage du panier
function updateCartDisplay() {
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');

  if (!cartItems || !cartTotal) return;

  cartItems.innerHTML = '';
  let total = 0;

  cart.forEach(product => {
    total += product.price;
    const li = document.createElement('li');
    li.textContent = `${product.item} - ${product.price.toFixed(2)} €`;
    cartItems.appendChild(li);
  });

  cartTotal.innerText = total.toFixed(2);
}

// Fonction de paiement Stripe
async function checkout() {
  if (cart.length === 0) {
    alert('Votre panier est vide.');
    return;
  }

  const items = cart.map(i => ({ name: i.item, unit_amount: i.price, quantity: 1 }));

  try {
    const res = await fetch('/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items })
    });

    const data = await res.json();
    if (data.url) {
      window.location.href = data.url; // Redirection vers Stripe Checkout
    } else {
      alert('Erreur lors de la création de la session Stripe.');
    }
  } catch (err) {
    console.error(err);
    alert('Erreur réseau durant le paiement.');
  }
}
