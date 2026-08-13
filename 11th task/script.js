const products = [
    { id: 1, name: "Fresh Apples", price: 140, category: "grocery", icon: "🍎" },
    { id: 2, name: "Organic Milk", price: 65, category: "grocery", icon: "🥛" },
    { id: 3, name: "Wireless Earbuds", price: 1299, category: "electronics", icon: "🎧" },
    { id: 4, name: "Smart Watch", price: 1899, category: "electronics", icon: "⌚" },
    { id: 5, name: "Face Wash", price: 299, category: "beauty", icon: "🧴" },
    { id: 6, name: "Perfume", price: 599, category: "beauty", icon: "🌸" },
    { id: 7, name: "Coffee Mug", price: 199, category: "home", icon: "☕" },
    { id: 8, name: "Table Lamp", price: 749, category: "home", icon: "💡" }
];

let cart = [];

function displayProducts(list) {
    const productGrid = document.getElementById("productGrid");

    productGrid.innerHTML = list.map(product => `
        <div class="product-card">
            <div class="product-image">${product.icon}</div>
            <p class="product-category">${product.category}</p>
            <h3>${product.name}</h3>
            <div class="product-bottom">
                <span class="price">₹${product.price}</span>
                <button class="add-btn" onclick="addToCart(${product.id})">Add</button>
            </div>
        </div>
    `).join("");

    document.getElementById("productCount").textContent = `${list.length} products`;
}

function filterProducts(category) {
    if (category === "all") {
        displayProducts(products);
    } else {
        const filtered = products.filter(product => product.category === category);
        displayProducts(filtered);
    }
}

function addToCart(id) {
    const product = products.find(product => product.id === id);
    cart.push(product);
    updateCart();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

function updateCart() {
    document.getElementById("cartCount").textContent = cart.length;

    const cartItems = document.getElementById("cartItems");

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your basket is empty.</p>";
    } else {
        cartItems.innerHTML = cart.map((item, index) => `
            <div class="cart-item">
                <div class="cart-icon">${item.icon}</div>
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>₹${item.price}</p>
                </div>
                <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
            </div>
        `).join("");
    }

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    document.getElementById("cartTotal").textContent = `₹${total}`;
}

function openCart() {
    document.getElementById("cartPanel").classList.add("active");
    document.getElementById("overlay").classList.add("active");
}

function closeCart() {
    document.getElementById("cartPanel").classList.remove("active");
    document.getElementById("overlay").classList.remove("active");
}

function placeOrder() {
    if (cart.length === 0) {
        alert("Your basket is empty.");
        return;
    }

    alert("Order placed successfully!");
    cart = [];
    updateCart();
    closeCart();
}

displayProducts(products);
updateCart();