// script-boutique.js

let cart = [];

function addToCart(item, price) {
  cart.push({ item, price });
  updateCartDisplay();
  alert(item + " ajouté au panier !");
}

function updateCartDisplay() {
  const cartCount = document.getElementById("cart-count");
  const cartTotal = document.getElementById("cart-total");
  const cartItems = document.getElementById("cart-items");

  if (!cartCount || !cartTotal || !cartItems) return;

  let total = 0;
  cartItems.innerHTML = "";
  cart.forEach(i => {
    total += i.price;
    const li = document.createElement("li");
    li.textContent = `${i.item} - ${i.price.toFixed(2)}€`;
    cartItems.appendChild(li);
  });

  cartCount.innerText = cart.length;
  cartTotal.innerText = total.toFixed(2);
}

function toggleCart() {
  const cartDiv = document.getElementById("cart");
  cartDiv.classList.toggle("show");
}

async function checkout() {
  if (cart.length === 0) return alert("Votre panier est vide.");

  const items = cart.map(i => ({ name: i.item, unit_amount: i.price, quantity: 1 }));

  try {
    const res = await fetch('/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items })
    });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
    else alert("Erreur lors de la création de la session Stripe.");
  } catch (err) {
    console.error(err);
    alert("Erreur réseau durant le paiement.");
  }
}
