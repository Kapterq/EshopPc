document.addEventListener("DOMContentLoaded", () => {
    const cartContainer = document.getElementById("cart-container");
    const clearBtn = document.getElementById("clear-cart-btn");
    const totalPriceElem = document.getElementById("total-price");
    const payBtn = document.getElementById("pay-btn");
    const counter = document.querySelector(".cart-counter");
  
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
    function updateCounter() {
      if (counter) {
        counter.textContent = cart.reduce((acc, item) => acc + item.quantity, 0);  // считает общее колиство товаров и отображает
      }
    }
  
    // функция для отрисовки корзины:
    function renderCart() {
      cartContainer.innerHTML = "";
  
      if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Корзина порожня.</p>"; // если пустая корзина
        totalPriceElem.textContent = "";
        payBtn.style.display = "none";
        clearBtn.style.display = "none";
        updateCounter();
        return;
      }
  
      cart.forEach((item, index) => {
        const card = document.createElement("div"); // если есть товары
        card.className = "cart-item";
        card.innerHTML = `
          <img src="${item.img}" width="100" alt="${item.name}">
          <h2>${item.name}</h2>
          <p>Ціна: ${item.price}</p>
          <p>Кількість: ${item.quantity}</p>
          <button class="remove" data-index="${index}">Видалити</button>
          <button class="plus" data-index="${index}">+</button>
          <button class="minus" data-index="${index}">-</button>
        `;
        cartContainer.appendChild(card);
      });
  
      const total = cart.reduce((acc, item) => {
        const priceNumber = parseFloat(item.price.replace(/[^\d,.-]/g, "").replace(/\s+/g, '').replace(',', '.'));
        return acc + priceNumber * item.quantity;
      }, 0);
      // считаем общую сумму
      totalPriceElem.textContent = `Загальна сума: ${total.toLocaleString('ru-RU')} ₴`;
      payBtn.style.display = "inline-block";
      clearBtn.style.display = "inline-block";
      updateCounter();
    }
  
    cartContainer.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      if (index === undefined) return;
  
      if (e.target.classList.contains("remove")) {
        cart.splice(index, 1);
      } else if (e.target.classList.contains("plus")) { // обработка кнопок в корзине
        cart[index].quantity++;
      } else if (e.target.classList.contains("minus")) {
        if (cart[index].quantity > 1) cart[index].quantity--;
      }
  
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
    });
  
    clearBtn.addEventListener("click", () => {
      localStorage.removeItem("cart");  // очистить корзину
      cart = [];
      renderCart();
    });
  
    payBtn.addEventListener("click", () => {
      alert("Дякуємо за покупку!");
      localStorage.removeItem("cart");  //оплатить
      cart = [];
      renderCart();
    });
  
    renderCart();
  });
  