/* --- CONFIGURATION --- */
// Replace with your real Moroccan phone number without leading zero (e.g., 212612345678)
const WHATSAPP_NUMBER = "212600000000"; 

/* --- PRODUCT DATA --- */
const products = [
  {
    id: 1,
    name: "مجموعة العناية بالنيلة الزرقاء الملكية",
    category: "skincare",
    price: 110,
    oldPrice: 140,
    rating: "★★★★★ (4.9)",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=500&q=80",
    description: "جل وجل منظف بالنيلة الزرقاء لتفتيح البشرة وترطيبها العالي."
  },
  {
    id: 2,
    name: "سيروم مغذي ومضاد للأكسدة (Sérum Prodigieux)",
    category: "skincare",
    price: 100,
    oldPrice: 120,
    rating: "★★★★☆ (4.7)",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=500&q=80",
    description: "غني بزيوت طبيعية وفيتامينات A, C, E, H لتصفية وتغذية البشرة."
  },
  {
    id: 3,
    name: "باك الشامبو وسيروم الشعر للبروتين والعرعار",
    category: "hair",
    price: 260,
    oldPrice: 300,
    rating: "★★★★★ (5.0)",
    image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=500&q=80",
    description: "مجموعة متكاملة ضد تساقط الشعر وتقويته وإعطائه اللمعان."
  },
  {
    id: 4,
    name: "مورد الخدود والشفاة الطبيعي (Lips & Blush)",
    category: "makeup",
    price: 90,
    oldPrice: 110,
    rating: "★★★★☆ (4.8)",
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=500&q=80",
    description: "مكوّن طبيعي 100% يمنح لمسة ناعمة مع حماية من الشمس SPF 50+."
  },
  {
    id: 5,
    name: "واقي الشمس الطبيعي بكريم الأركان SPF 50+",
    category: "skincare",
    price: 110,
    oldPrice: 130,
    rating: "★★★★★ (4.9)",
    image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=500&q=80",
    description: "حماية فائقة من أشعة الشمس مع ترطيب وتفتيح البشرة."
  },
  {
    id: 6,
    name: "شاي التخسيس الطبيعي (Thé Minceur)",
    category: "skincare",
    price: 70,
    oldPrice: 90,
    rating: "★★★★☆ (4.6)",
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=500&q=80",
    description: "مزيج أعشاب طبيعية لمساعدة الجسم على التخلص من السموم والوزن."
  },
  {
    id: 7,
    name: "عطر زيتي بالعود الفاخر",
    category: "perfume",
    price: 70,
    oldPrice: 85,
    rating: "★★★★★ (4.9)",
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=500&q=80",
    description: "رائحة زكية وثبات يدوم طويلاً بمكونات طبيعية."
  },
  {
    id: 8,
    name: "مجموع أظافر مع فرشي المكياج الناعمة",
    category: "accessories",
    price: 80,
    oldPrice: 100,
    rating: "★★★★☆ (4.5)",
    image: "https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?auto=format&fit=crop&w=500&q=80",
    description: "أدوات تجميلية وعناية بالأظافر عالية الجودة."
  }
];

/* --- CART STATE --- */
let cart = JSON.parse(localStorage.getItem('glowly_cart')) || [];

/* --- DOM ELEMENTS --- */
const productsGrid = document.getElementById('productsGrid');
const cartBtn = document.getElementById('cartBtn');
const cartBadge = document.getElementById('cartBadge');
const cartDrawer = document.getElementById('cartDrawer');
const cartOverlay = document.getElementById('cartOverlay');
const closeCartBtn = document.getElementById('closeCartBtn');
const cartBody = document.getElementById('cartBody');
const cartSubtotal = document.getElementById('cartSubtotal');
const proceedCheckoutBtn = document.getElementById('proceedCheckoutBtn');

const checkoutModal = document.getElementById('checkoutModal');
const closeCheckoutBtn = document.getElementById('closeCheckoutBtn');
const checkoutForm = document.getElementById('checkoutForm');
const checkoutItemsSummary = document.getElementById('checkoutItemsSummary');
const finalTotal = document.getElementById('finalTotal');

const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const sortSelect = document.getElementById('sortSelect');

/* --- INITIALIZATION --- */
document.addEventListener('DOMContentLoaded', () => {
  renderProducts(products);
  updateCartUI();

  // Contact Phone Dynamic Link Update
  const phoneLink = document.getElementById('contactPhoneLink');
  if (phoneLink) phoneLink.href = `https://wa.me/${WHATSAPP_NUMBER}`;
});

/* --- RENDER PRODUCTS --- */
function renderProducts(items) {
  productsGrid.innerHTML = '';
  if (items.length === 0) {
    productsGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center;">لم يتم العثور على منتجات مطابقة.</p>';
    return;
  }

  items.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <div class="product-image-wrap">
        <img src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.src='https://via.placeholder.com/300x220?text=Glowly+Beauty'">
        ${product.oldPrice ? `<span class="discount-badge">خصم</span>` : ''}
      </div>
      <div class="product-info">
        <div class="product-title">${product.name}</div>
        <div class="product-rating">${product.rating}</div>
        <div class="product-price">
          <span class="current-price">${product.price} DH</span>${product.oldPrice ? `<span class="old-price">${product.oldPrice} DH</span>` : ''}
        </div>
        <button class="add-to-cart-btn" onclick="addToCart(${product.id})">إضافة إلى السلة 🛒</button>
      </div>
    `;
    productsGrid.appendChild(card);
  });
}

/* --- CART FUNCTIONS --- */
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  const existingItem = cart.find(item => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart();
  updateCartUI();
  openCart();
}

function updateCartQuantity(productId, change) {
  const item = cart.find(item => item.id === productId);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      cart = cart.filter(p => p.id !== productId);
    }
  }
  saveCart();
  updateCartUI();
}

function saveCart() {
  localStorage.setItem('glowly_cart', JSON.stringify(cart));
}

function updateCartUI() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartBadge.textContent = totalItems;

  cartBody.innerHTML = '';
  if (cart.length === 0) {
    cartBody.innerHTML = '<p style="text-align: center; color: #777; margin-top: 30px;">سلة التسوق فارغة حالياً.</p>';
    cartSubtotal.textContent = '0 DH';
    return;
  }

  let subtotal = 0;
  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;

    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="cart-item-details">
        <div class="cart-item-title">${item.name}</div>
        <div class="cart-item-price">${item.price} DH x ${item.quantity} =${itemTotal} DH</div>
        <div class="cart-qty-controls">
          <button class="cart-qty-btn" onclick="updateCartQuantity(${item.id}, -1)">-</button>
          <span>${item.quantity}</span>
          <button class="cart-qty-btn" onclick="updateCartQuantity(${item.id}, 1)">+</button>
        </div>
      </div>
    `;
    cartBody.appendChild(div);
  });

  cartSubtotal.textContent = `${subtotal} DH`;
}

function openCart() {
  cartDrawer.classList.add('open');
  cartOverlay.style.display = 'block';
}

function closeCart() {
  cartDrawer.classList.remove('open');
  cartOverlay.style.display = 'none';
}

cartBtn.addEventListener('click', openCart);
closeCartBtn.addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);

/* --- CHECKOUT & WHATSAPP INTEGRATION --- */
proceedCheckoutBtn.addEventListener('click', () => {
  if (cart.length === 0) {
    alert('سلة التسوق فارغة!');
    return;
  }
  closeCart();
  openCheckout();
});

function openCheckout() {
  checkoutModal.style.display = 'block';
  
  let itemsHtml = '';
  let subtotal = 0;

  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;
    itemsHtml += `<div class="summary-line"><span>${item.name} (${item.quantity}x)</span><span>${itemTotal} DH</span></div>`;
  });

  checkoutItemsSummary.innerHTML = itemsHtml;
  const shipping = 30; // 30 DH Shipping fee
  const grandTotal = subtotal + shipping;
  finalTotal.textContent = `${grandTotal} DH`;
}

closeCheckoutBtn.addEventListener('click', () => {
  checkoutModal.style.display = 'none';
});

checkoutForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('custName').value.trim();
  const phone = document.getElementById('custPhone').value.trim();
  const city = document.getElementById('custCity').value.trim();
  const address = document.getElementById('custAddress').value.trim();

  // Validate Moroccan phone number (06..., 07..., 212...)
  const phoneRegex = /^(06|07|2126|2127|\+2126|\+2127)[0-9]{8}$/;
  if (!phoneRegex.test(phone.replace(/\s+/g, ''))) {
    alert('الرجاء إدخال رقم هاتف مغربي صحيح (مثال: 0612345678 أو 0712345678)');
    return;
  }

  let subtotal = cart.reduce((sum, i) => sum + (i.price * i.quantity), 0);
  let shipping = 30;
  let total = subtotal + shipping;

  // Build WhatsApp Order Message
  let message = `🛍️ *طلب جديد من موقع Glowly Beauty*\n\n`;
  message += `👤 *الاسم:* ${name}\n`;
  message += `📞 *رقم الهاتف:* ${phone}\n`;
  message += `🏙️ *المدينة:* ${city}\n`;
  message += `📍 *العنوان:* ${address}\n\n`;
  message += `🛒 *المنتجات المطلوبة:*\n`;

  cart.forEach((item, index) => {
    message += `${index + 1}.${item.name} - الكمية: ${item.quantity} - السعر: ${item.price * item.quantity} DH\n`;
  });

  message += `\n💵 *المجموع الفرعي:* ${subtotal} DH\n`;
  message += `🚚 *رسوم التوصيل:* ${shipping} DH\n`;
  message += `💰 *المجموع النهائي:* ${total} DH\n\n`;
  message += `💳 *طريقة الدفع:* الدفع عند الاستلام (COD)`;

  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

  // Reset Cart & Close Modal
  cart = [];
  saveCart();
  updateCartUI();
  checkoutModal.style.display = 'none';

  // Redirect to WhatsApp
  window.open(whatsappUrl, '_blank');
});

/* --- FILTERS & SEARCH & SORT --- */
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');

    const filter = e.target.dataset.filter;
    if (filter === 'all') {
      renderProducts(products);
    } else {
      const filtered = products.filter(p => p.category === filter);
      renderProducts(filtered);
    }
  });
});

document.querySelectorAll('.category-card').forEach(card => {
  card.addEventListener('click', () => {
    const cat = card.dataset.category;
    document.querySelector('#shop').scrollIntoView({ behavior: 'smooth' });
    if (cat === 'all') {
      renderProducts(products);
    } else {
      renderProducts(products.filter(p => p.category === cat));
    }
  });
});

function handleSearch() {
  const query = searchInput.value.toLowerCase().trim();
  const searched = products.filter(p => p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query));
  renderProducts(searched);
}

searchBtn.addEventListener('click', handleSearch);
searchInput.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') handleSearch();
});

sortSelect.addEventListener('change', (e) => {
  const val = e.target.value;
  let sorted = [...products];
  if (val === 'price-low') {
    sorted.sort((a, b) => a.price - b.price);
  } else if (val === 'price-high') {
    sorted.sort((a, b) => b.price - a.price);
  }
  renderProducts(sorted);
});

/* --- MOBILE NAVIGATION --- */
mobileMenuBtn.addEventListener('click', () => {
  navMenu.classList.toggle('open');
});

/* --- NEWSLETTER FORM --- */
document.getElementById('newsletterForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const msg = document.getElementById('newsletterMessage');
  msg.textContent = 'شكراً لاشتراكك! تم تسجيل بريدك بنجاح ✨';
  msg.style.color = 'green';
  document.getElementById('newsletterEmail').value = '';
});
