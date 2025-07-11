// Начало корзины
const cartButtons = document.querySelectorAll(".add-to-cart");

cartButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const card = btn.closest(".white-card-pc");
    const name = card.querySelector(".name-pc").textContent;  // Вытягиваем данные
    const price = card.querySelector(".price").textContent;
    const img = card.querySelector("img").getAttribute("src");

    const product = {
      name,
      price,
      img,
      quantity: 1,
    };

    let cart = JSON.parse(localStorage.getItem("cart")) || [];  // Прогружаем корзину

    const existing = cart.find(item => item.name === product.name);
    if (existing) {
      existing.quantity += 1; // проверка на наличие товара в корзине
    } else {
      cart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(cart)); 

    const counter = document.querySelector(".cart-counter");
    if (counter) {
      counter.textContent = cart.reduce((acc, item) => acc + item.quantity, 0); // Меняем текст в счетчике товаров
    }
  });
});

window.addEventListener("DOMContentLoaded", () => {
  const counter = document.querySelector(".cart-counter");
  if (counter) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];  // Показывает количество товара при загрузке страницы
    counter.textContent = cart.reduce((acc, item) => acc + item.quantity, 0);
  }
});

function cardpage() {
  window.location.href = "cart.html";
}

function skipPage() {
  window.location.href = "panzer.html";
}

function skipPage1() {
  window.location.href = "crusader.html";
}

function skipPage2() {
  window.location.href = "galaxy.html";
}

function officePage1(){
  window.location.href = "officebasic.html"
}

function pcpage2(){
  window.location.href = "pcpage2.html"
}

function pcpage1(){
  window.location.href = "index.html"
}

function pcpage3(){
  window.location.href = "pcpage3.html"
}

// Поиск
document.addEventListener("DOMContentLoaded", () => {
  const openBtn = document.querySelector(".magnifying-glass");
  const modal = document.getElementById("searchModal");
  const closeBtn = document.getElementById("closeSearchBtn");
  const input = document.getElementById("searchInput"); 
  const results = document.getElementById("searchResults");
  const allCards = document.querySelectorAll(".white-card-pc");

  openBtn.addEventListener("click", () => {
    modal.style.display = "flex";  // Открываем модальное окно
    input.focus();
  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
    input.value = ""; // крестик
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

        imgEl.style.cursor = "pointer";
        title.style.cursor = "pointer";

        const goToProduct = () => {
          if (name.includes("Panzer")) {
            skipPage();
          } else if (name.includes("Crusader")) {  // функция перехода на страницу товара
            skipPage1();
          } else if (name.includes("Galaxy")) {
            skipPage2();
          }
        };

        imgEl.addEventListener("click", goToProduct);
        title.addEventListener("click", goToProduct);

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

// Личная карточка товара
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

   // при загрузке страницы показывает количество товаров в корзине
  const counter = document.querySelector(".cart-counter");
  if (counter) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    counter.textContent = cart.reduce((acc, item) => acc + item.quantity, 0);
  }
});

async function getCards() {
  const pages = ['index.html', 'pcpage1.html', 'pcpage2.html', 'pcpage3.html', 'office.html'];
  let cards = [];
  for (let url of pages) {
    const res = await fetch(url);
    const text = await res.text();
    const div = document.createElement('div');
    div.innerHTML = text;
    const cardEls = div.querySelectorAll('.white-card-pc');         // Собираем данные со всех страниц
    cardEls.forEach(card => {
      const nameEl = card.querySelector('.name-pc');
      const name = nameEl?.innerText.trim();
      const price = parseFloat(card.querySelector('.price')?.innerText.replace(/[^\d]/g, ''));
      const img = card.querySelector('img')?.getAttribute('src');
      const series = card.querySelector('.class-siries')?.innerText.trim();
      const onclickAttr = nameEl?.getAttribute('onclick');

      if (name && price && img && series && onclickAttr) {
        cards.push({ name, price, img, series, onclick: onclickAttr });
      }
    });
  }
  return cards;
}

document.getElementById('filterBtn').addEventListener('click', async () => {
  const min = parseInt(document.getElementById('minPrice').value) || 0;
  const max = parseInt(document.getElementById('maxPrice').value) || Infinity;  // получаем значения минимальной и максимальной цены из инпутов
  const cards = await getCards();
  const filtered = cards.filter(c => c.price >= min && c.price <= max);       // фильтр по цене
  const modal = document.getElementById('modal');
  const modalResults = document.getElementById('modalResults');
  modalResults.innerHTML = '';

  if (filtered.length === 0) {
    modalResults.innerHTML = '<p>Нічого не знайдено</p>';
  } else {
    filtered.forEach(c => {
      const el = document.createElement('div');
      el.className = 'item';

      const img = document.createElement('img');
      img.src = c.img;

      const info = document.createElement('div');

      const h3 = document.createElement('h3');
      h3.innerText = c.name;
      h3.style.cursor = 'pointer';
      h3.addEventListener('click', () => {
        eval(c.onclick);
      });

      const p = document.createElement('p');
      p.innerText = c.series;
      p.style.color = '#93A0F5';
      p.style.cursor = 'pointer';
      p.addEventListener('click', () => {
        if (c.series.toLowerCase().includes('office')) {
          window.open('office.html', '_blank');
        } else {
          window.open('index.html', '_blank');
        }
      });

      const price = document.createElement('span');
      price.innerText = `${c.price} ₴`;
      price.style.display = 'block';
      price.style.color = '#fff';

      info.appendChild(h3);
      info.appendChild(p);
      info.appendChild(price);
      el.appendChild(img);
      el.appendChild(info);
      modalResults.appendChild(el);
    });
  }

  document.body.classList.add('modal-open');
  modal.style.display = 'block';
});

document.getElementById('modalClose').addEventListener('click', () => {
  document.getElementById('modal').style.display = 'none';  // закрытие модального окна
  document.body.classList.remove('modal-open');
});

document.querySelectorAll('.price-input').forEach(input => {
  input.addEventListener('input', e => {
    e.target.value = e.target.value.replace(/[.,]/g, '');
  });
});