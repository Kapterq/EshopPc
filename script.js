const cartButtons = document.querySelectorAll(".add-to-cart");

cartButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const card = btn.closest(".white-card-pc");
    const name = card.querySelector(".name-pc").textContent;
    const price = card.querySelector(".price").textContent;
    const img = card.querySelector("img").getAttribute("src");

    const product = {
      name,
      price,
      img,
      quantity: 1,
    };

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find(item => item.name === product.name);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    const counter = document.querySelector(".cart-counter");
    if (counter) {
      counter.textContent = cart.reduce((acc, item) => acc + item.quantity, 0);
    }
  });
});

window.addEventListener("DOMContentLoaded", () => {
  const counter = document.querySelector(".cart-counter");
  if (counter) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    counter.textContent = cart.reduce((acc, item) => acc + item.quantity, 0);
  }
});

function cardpage() {
  window.location.href = "cart.html";
}
