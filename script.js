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



document.addEventListener("DOMContentLoaded", () => {
  const openBtn = document.querySelector(".magnifying-glass");
  const modal = document.getElementById("searchModal");
  const closeBtn = document.getElementById("closeSearchBtn");
  const input = document.getElementById("searchInput");
  const results = document.getElementById("searchResults");
  const allCards = document.querySelectorAll(".white-card-pc");

  openBtn.addEventListener("click", () => {
    modal.style.display = "flex";
    input.focus();
  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
    input.value = "";
    results.innerHTML = "";
  });
  
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
      input.value = "";
      results.innerHTML = "";
    }
  });

  input.addEventListener("input", () => {
    const query = input.value.toLowerCase().trim();
    results.innerHTML = "";

    if (!query) return;

    allCards.forEach(card => {
      const name = card.querySelector(".name-pc")?.textContent || "";
      const series = card.querySelector(".class-siries")?.textContent || "";
      const img = card.querySelector("img")?.src || "";

      if (name.toLowerCase().includes(query) || series.toLowerCase().includes(query)) {
        const div = document.createElement("div");
        div.className = "search-card";

        const imgEl = document.createElement("img");
        imgEl.src = img;

        const info = document.createElement("div");
        info.className = "search-card-info";

        const title = document.createElement("div");
        title.className = "search-card-title";
        title.textContent = name;

        const seriesEl = document.createElement("div");
        seriesEl.className = "search-card-series";
        seriesEl.textContent = series;

        info.appendChild(title);
        info.appendChild(seriesEl);
        div.appendChild(imgEl);
        div.appendChild(info);

        results.appendChild(div);
      }
    });
  });
});

function skipPage(){
  window.location.href = "panzer.html";
}

function skipPage1(){
  window.location.href = "crusader.html";
}

function skipPage2(){
  window.location.href = "galaxy.html";
}


document.addEventListener("DOMContentLoaded", () => {
  const buyBtn = document.querySelector(".buy-button");
  if (!buyBtn) return;

  buyBtn.addEventListener("click", () => {
    const card = buyBtn.closest(".product-wrapper");
    if (!card) return;

    const nameEl = card.querySelector(".product-name");
    const priceEl = buyBtn.querySelector("span");
    const imgEl = card.querySelector("img.product-photo");

    if (!nameEl || !priceEl || !imgEl) return;

    const product = {
      name: nameEl.textContent.trim(),
      price: priceEl.textContent.trim(),
      img: imgEl.getAttribute("src"),
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

  const counter = document.querySelector(".cart-counter");
  if (counter) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    counter.textContent = cart.reduce((acc, item) => acc + item.quantity, 0);
  }
});
