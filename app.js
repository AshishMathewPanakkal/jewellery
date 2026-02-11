const products = [
  {
    id: "aurora-stacking-rings",
    name: "Aurora Stacking Rings",
    collection: "Everyday",
    metal: "14k Yellow Gold",
    stone: "White Sapphire",
    price: 320,
    image:
      "https://www.sarafrsjewellery.com/cdn/shop/files/2023-10-1811-28-19_CVDS_4024.jpg?v=1751006075&width=1200",
    badge: "Bestseller",
    detail: "Set of 3 bands • 1.5mm each",
  },
  {
    id: "solstice-solitaire",
    name: "Solstice Diamond Solitaire",
    collection: "Engagement",
    metal: "18k White Gold",
    stone: "Lab-Grown Diamond",
    price: 1890,
    image:
      "https://ppjeweller.com/cdn/shop/articles/Fusion_Jewellery_The_Blend_of_Traditional_and_Modern_Styles_for_a_1024x1024.webp?v=1726571089",
    badge: "New",
    detail: "Round brilliant • 1.0ct centre",
  },
  {
    id: "opal-dawn-pendant",
    name: "Opal Dawn Pendant",
    collection: "Occasion",
    metal: "14k Rose Gold",
    stone: "Australian Opal",
    price: 540,
    image:
      "https://rubans.in/cdn/shop/files/rubans-22k-gold-plated-red-crystal-zirconia-handcrafted-luxury-necklace-set-jewellery-sets-34448333275310.jpg",
    badge: "Limited",
    detail: "16–18\" adjustable chain",
  },
  {
    id: "luna-pearl-hoops",
    name: "Luna Pearl Hoops",
    collection: "Everyday",
    metal: "Sterling Silver",
    stone: "Freshwater Pearl",
    price: 210,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcNszjh_WqgnqbtTVzOgS5Dg_r1rDB2YHsVg&s",
    badge: "Gift pick",
    detail: "Hypoallergenic • 18mm",
  },
  {
    id: "halo-crest-ring",
    name: "Halo Crest Ring",
    collection: "Engagement",
    metal: "18k White Gold",
    stone: "Lab-Grown Diamond",
    price: 2150,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRZYYBGBpiA1bXQzBIAlZ2HjmS7nfBkqCtjg&s",
    badge: "Most loved",
    detail: "Halo setting • 0.9ct centre",
  },
  {
    id: "aurora-chain-bracelet",
    name: "Aurora Chain Bracelet",
    collection: "Everyday",
    metal: "14k Yellow Gold",
    stone: "None",
    price: 280,
    image:
      "https://cdn.shopify.com/s/files/1/0507/9865/7726/files/GoldNecklace_660x550_6df12311-a226-49ed-a709-2bd12a8006f5_2048x2048.webp?v=1682061538",
    badge: "",
    detail: "Fine cable chain • 6.5\"",
  },
  {
    id: "starlight-drop-earrings",
    name: "Starlight Drop Earrings",
    collection: "Occasion",
    metal: "14k Rose Gold",
    stone: "White Topaz",
    price: 360,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUh5uFN1YaaUNgWwhiy75b_3Q7HnTpTNemhA&s",
    badge: "",
    detail: "Drop length 22mm",
  },
  {
    id: "celeste-tennis-necklace",
    name: "Celeste Tennis Necklace",
    collection: "Occasion",
    metal: "18k White Gold",
    stone: "Lab-Grown Diamond",
    price: 2450,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQGcRqAoNBTajf_tR4Smb7usKHdjcu8whCQw&s",
    badge: "Waitlist",
    detail: "3.0ctw diamonds • 16\"",
  },
];

const currency = (value) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(
    value,
  );

const cartKey = "miralia-jewellery-cart";

function loadCart() {
  try {
    const raw = localStorage.getItem(cartKey);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveCart(cart) {
  try {
    localStorage.setItem(cartKey, JSON.stringify(cart));
  } catch {
    // ignore
  }
}

const state = {
  cart: [],
  filters: {
    collection: "all",
    metal: "all",
    price: "all",
  },
};

function initFilters() {
  const collectionSelect = document.getElementById("filter-collection");
  const metalsSelect = document.getElementById("filter-metal");

  const collections = Array.from(new Set(products.map((p) => p.collection))).sort();
  collections.forEach((collection) => {
    const option = document.createElement("option");
    option.value = collection;
    option.textContent = collection;
    collectionSelect.appendChild(option);
  });

  const metals = Array.from(new Set(products.map((p) => p.metal))).sort();
  metals.forEach((metal) => {
    const exists = Array.from(metalsSelect.options).some((o) => o.value === metal);
    if (!exists) {
      const option = document.createElement("option");
      option.value = metal;
      option.textContent = metal;
      metalsSelect.appendChild(option);
    }
  });

  collectionSelect.addEventListener("change", (e) => {
    state.filters.collection = e.target.value;
    renderProducts();
  });

  metalsSelect.addEventListener("change", (e) => {
    state.filters.metal = e.target.value;
    renderProducts();
  });

  document.getElementById("filter-price").addEventListener("change", (e) => {
    state.filters.price = e.target.value;
    renderProducts();
  });

  document.querySelectorAll(".link-button[data-collection]").forEach((button) => {
    button.addEventListener("click", () => {
      const collection = button.getAttribute("data-collection");
      state.filters.collection = collection;
      collectionSelect.value = collection;
      renderProducts({ scrollIntoView: true });
    });
  });
}

function filteredProducts() {
  return products.filter((product) => {
    const { collection, metal, price } = state.filters;

    if (collection !== "all" && product.collection !== collection) return false;
    if (metal !== "all" && product.metal !== metal) return false;
    if (price !== "all" && product.price > Number(price)) return false;

    return true;
  });
}

function renderProducts(options = {}) {
  const grid = document.getElementById("product-grid");
  const countEl = document.getElementById("product-count");
  const items = filteredProducts();

  grid.innerHTML = "";

  if (countEl) {
    const count = items.length;
    countEl.textContent =
      count === 0 ? "No pieces match your filters." : `${count} piece${count > 1 ? "s" : ""} curated for you.`;
  }

  items.forEach((product) => {
    const card = document.createElement("article");
    card.className = "product-card";
    card.innerHTML = `
      <div class="product-media">
        <img src="${product.image}" alt="${product.name}" loading="lazy" />
        <span class="product-pill">${product.collection}</span>
        ${
          product.badge
            ? `<span class="product-badge">${product.badge}</span>`
            : ""
        }
      </div>
      <div class="product-body">
        <h3 class="product-title">${product.name}</h3>
        <p class="product-meta">${product.metal}${
          product.stone && product.stone !== "None" ? ` • ${product.stone}` : ""
        }</p>
        <div class="product-price-row">
          <p class="product-price">${currency(product.price)}</p>
          <p class="product-detail">${product.detail}</p>
        </div>
        <div class="product-actions">
          <button class="btn btn-primary" data-add-to-cart="${product.id}">Add to cart</button>
          <button class="product-secondary" data-view-detail="${product.id}">Details</button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });

  grid.querySelectorAll("[data-add-to-cart]").forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.getAttribute("data-add-to-cart");
      addToCart(id);
    });
  });

  grid.querySelectorAll("[data-view-detail]").forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.getAttribute("data-view-detail");
      const product = products.find((p) => p.id === id);
      if (product) {
        const message = `${product.name}\n${product.metal}${
          product.stone && product.stone !== "None" ? ` • ${product.stone}` : ""
        }\n${product.detail}\n\nPrice: ${currency(product.price)}\n\nFor full product pages and deep content (certificates, customisation, etc.), you can extend this first version into separate product detail pages later.`;
        alert(message);
      }
    });
  });

  if (options.scrollIntoView) {
    document.getElementById("bestsellers")?.scrollIntoView({ behavior: "smooth" });
  }
}

function addToCart(id) {
  const product = products.find((p) => p.id === id);
  if (!product) return;

  const existing = state.cart.find((item) => item.id === id);
  if (existing) {
    existing.quantity += 1;
  } else {
    state.cart.push({ ...product, quantity: 1 });
  }
  saveCart(state.cart);
  renderCart();
  showToast(`Added “${product.name}” to your cart.`);
  openCart();
}

function removeFromCart(id) {
  state.cart = state.cart.filter((item) => item.id !== id);
  saveCart(state.cart);
  renderCart();
}

function setQuantity(id, quantity) {
  const item = state.cart.find((i) => i.id === id);
  if (!item) return;
  const next = Math.max(1, quantity);
  item.quantity = next;
  saveCart(state.cart);
  renderCart();
}

function cartSubtotal() {
  return state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function renderCart() {
  const list = document.getElementById("cart-items");
  const empty = document.getElementById("cart-empty");
  const subtotalEl = document.getElementById("cart-subtotal");
  const countEl = document.getElementById("cart-count");

  list.innerHTML = "";

  if (state.cart.length === 0) {
    empty.classList.remove("hidden");
  } else {
    empty.classList.add("hidden");
  }

  state.cart.forEach((item) => {
    const li = document.createElement("li");
    li.className = "cart-item";
    li.innerHTML = `
      <div class="cart-thumb">
        <img src="${item.image}" alt="${item.name}" />
      </div>
      <div>
        <div class="cart-item-header">
          <div>
            <p class="cart-item-title">${item.name}</p>
            <p class="cart-item-meta">${item.metal}${
              item.stone && item.stone !== "None" ? ` • ${item.stone}` : ""
            }</p>
          </div>
          <button class="icon-button" aria-label="Remove item" data-remove="${item.id}">×</button>
        </div>
        <div class="cart-row">
          <div class="quantity-controls" aria-label="Quantity selector">
            <button data-qty-dec="${item.id}" aria-label="Decrease quantity">−</button>
            <span>${item.quantity}</span>
            <button data-qty-inc="${item.id}" aria-label="Increase quantity">+</button>
          </div>
          <div class="cart-item-price">${currency(item.price * item.quantity)}</div>
        </div>
      </div>
    `;
    list.appendChild(li);
  });

  list.querySelectorAll("[data-remove]").forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.getAttribute("data-remove");
      removeFromCart(id);
    });
  });

  list.querySelectorAll("[data-qty-dec]").forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.getAttribute("data-qty-dec");
      const item = state.cart.find((i) => i.id === id);
      if (item) {
        if (item.quantity === 1) {
          removeFromCart(id);
        } else {
          setQuantity(id, item.quantity - 1);
        }
      }
    });
  });

  list.querySelectorAll("[data-qty-inc]").forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.getAttribute("data-qty-inc");
      const item = state.cart.find((i) => i.id === id);
      if (item) {
        setQuantity(id, item.quantity + 1);
      }
    });
  });

  if (subtotalEl) {
    subtotalEl.textContent = currency(cartSubtotal());
  }

  if (countEl) {
    const count = state.cart.reduce((total, item) => total + item.quantity, 0);
    countEl.textContent = String(count);
  }
}

function openCart() {
  const drawer = document.getElementById("cart-drawer");
  if (!drawer) return;
  drawer.classList.add("open");
  drawer.setAttribute("aria-hidden", "false");
}

function closeCart() {
  const drawer = document.getElementById("cart-drawer");
  if (!drawer) return;
  drawer.classList.remove("open");
  drawer.setAttribute("aria-hidden", "true");
}

function initCartUI() {
  const toggle = document.getElementById("cart-toggle");
  const close = document.getElementById("cart-close");
  const overlay = document.getElementById("cart-overlay");

  toggle?.addEventListener("click", openCart);
  close?.addEventListener("click", closeCart);
  overlay?.addEventListener("click", closeCart);

  document.getElementById("checkout-button")?.addEventListener("click", () => {
    if (state.cart.length === 0) {
      showToast("Your cart is empty. Add a piece you love first.");
      return;
    }

    const subtotal = cartSubtotal();
    alert(
      `This is a demo checkout.\n\nSubtotal: ${currency(
        subtotal,
      )}\n\nIn a production version you would now:\n• Collect shipping & contact details\n• Integrate Stripe, PayPal, or a local payment provider\n• Create the order record in your database\n• Send order confirmation emails.`,
    );
  });
}

let toastTimeout;

function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 2600);
}

function initYear() {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }
}

document.addEventListener("DOMContentLoaded", () => {
  state.cart = loadCart();
  initFilters();
  renderProducts();
  renderCart();
  initCartUI();
  initYear();
});

