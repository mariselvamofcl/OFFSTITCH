/* =========================================================
   OFFSTITCH — MAIN JAVASCRIPT
   ========================================================= */

let cart = [];

const products = [
    {
        id: 1,
        name: "Modern Dress",
        category: "women",
        categoryName: "Women's Collection",
        price: 1499,
        image: "images/dress.JPG",
        description: "A clean modern silhouette designed for effortless everyday style."
    },
    {
        id: 2,
        name: "Street Hoodie",
        category: "unisex",
        categoryName: "Unisex Collection",
        price: 1799,
        image: "images/hoodie.JPG",
        description: "Relaxed unisex hoodie with a contemporary streetwear feel."
    },
    {
        id: 3,
        name: "Premium Top",
        category: "women",
        categoryName: "Women's Collection",
        price: 999,
        image: "images/top.JPG",
        description: "Minimal premium top made for easy styling across different looks."
    },
    {
        id: 4,
        name: "Graphic T-Shirt",
        category: "men",
        categoryName: "Men's Collection",
        price: 899,
        image: "images/tshirt.JPG",
        description: "Statement graphic tee with an effortless everyday street style."
    },
    {
        id: 5,
        name: "Classic Handbag",
        category: "accessories",
        categoryName: "Accessories",
        price: 2299,
        image: "images/handbag.JPG",
        description: "A versatile handbag designed to complete everyday outfits."
    },
    {
        id: 6,
        name: "Classic Sunglasses",
        category: "accessories",
        categoryName: "Accessories",
        price: 1199,
        image: "images/sunglasses.JPG",
        description: "Classic sunglasses with a clean fashion-forward finish."
    }
];

/* =========================================================
   HELPERS
   ========================================================= */

function formatPrice(price) {
    return `₹${price.toLocaleString("en-IN")}`;
}

function getProduct(id) {
    return products.find(product => product.id === Number(id));
}

/* =========================================================
   MENU
   ========================================================= */

function openMenu() {
    const menu = document.getElementById("menuOverlay");

    if (menu) {
        menu.classList.add("active");
        document.body.style.overflow = "hidden";
    }
}

function closeMenu() {
    const menu = document.getElementById("menuOverlay");

    if (menu) {
        menu.classList.remove("active");
        document.body.style.overflow = "";
    }
}

function toggleMenu() {
    const menu = document.getElementById("menuOverlay");

    if (!menu) return;

    if (menu.classList.contains("active")) {
        closeMenu();
    } else {
        openMenu();
    }
}

/* =========================================================
   SCROLL
   ========================================================= */

function goHome() {
    closeMenu();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function shopNow() {
    const section = document.getElementById("new-arrivals");

    if (section) {
        section.scrollIntoView({
            behavior: "smooth"
        });
    }

    closeMenu();
}

/* =========================================================
   CATEGORY FILTER
   ========================================================= */

function filterProducts(category) {

    const cards = document.querySelectorAll(".product-card");
    const buttons = document.querySelectorAll(".filter-btn");

    buttons.forEach(button => {
        button.classList.remove("active");

        const buttonCategory = button.dataset.category;

        if (buttonCategory === category) {
            button.classList.add("active");
        }
    });

    cards.forEach(card => {

        const cardCategory = card.dataset.category;

        if (category === "all" || cardCategory === category) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }
    });

    closeMenu();
}

/* =========================================================
   OPEN CATEGORY FROM MENU
   ========================================================= */

function openCategory(category) {

    const section = document.getElementById("new-arrivals");

    closeMenu();

    if (section) {
        section.scrollIntoView({
            behavior: "smooth"
        });
    }

    setTimeout(() => {
        filterProducts(category);
    }, 450);
}

/* =========================================================
   PRODUCT MODAL
   ========================================================= */

function openProduct(productId) {

    const product = getProduct(productId);

    if (!product) return;

    const modal = document.getElementById("productModal");

    if (!modal) return;

    const image = document.getElementById("modalProductImage");
    const name = document.getElementById("modalProductName");
    const category = document.getElementById("modalProductCategory");
    const price = document.getElementById("modalProductPrice");
    const description = document.getElementById("modalProductDescription");
    const addButton = document.getElementById("modalAddCart");

    if (image) {
        image.src = product.image;
        image.alt = product.name;
    }

    if (name) {
        name.textContent = product.name;
    }

    if (category) {
        category.textContent = product.categoryName;
    }

    if (price) {
        price.textContent = formatPrice(product.price);
    }

    if (description) {
        description.textContent = product.description;
    }

    if (addButton) {
        addButton.onclick = function () {
            addToCart(product.id);
        };
    }

    modal.classList.add("active");

    document.body.style.overflow = "hidden";
}

function closeProduct(event) {

    if (
        event &&
        event.target &&
        event.target.id !== "productModal"
    ) {
        return;
    }

    const modal = document.getElementById("productModal");

    if (modal) {
        modal.classList.remove("active");
        document.body.style.overflow = "";
    }
}

/* =========================================================
   CART
   ========================================================= */

function addToCart(productId) {

    const product = getProduct(productId);

    if (!product) return;

    const existing = cart.find(item => item.id === product.id);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCart();

    closeProduct();

    openCart();
}

function removeFromCart(productId) {

    cart = cart.filter(item => item.id !== Number(productId));

    updateCart();
}

function updateCart() {

    const cartCount = document.getElementById("cartCount");
    const cartItems = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");

    const totalQuantity = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const totalPrice = cart.reduce(
        (total, item) => total + (item.price * item.quantity),
        0
    );

    if (cartCount) {
        cartCount.textContent = totalQuantity;
    }

    if (cartTotal) {
        cartTotal.textContent = formatPrice(totalPrice);
    }

    if (!cartItems) return;

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="cart-empty">
                <p>Your cart is empty.</p>
            </div>
        `;

        return;
    }

    cartItems.innerHTML = cart.map(item => {

        return `
            <div class="cart-item">

                <img
                    src="${item.image}"
                    alt="${item.name}"
                >

                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>
                        ${formatPrice(item.price)}
                        × ${item.quantity}
                    </p>
                </div>

                <button
                    class="remove-cart"
                    onclick="removeFromCart(${item.id})"
                    aria-label="Remove ${item.name}"
                >
                    ×
                </button>

            </div>
        `;

    }).join("");
}

/* =========================================================
   CART OPEN / CLOSE
   ========================================================= */

function openCart() {

    const cartOverlay = document.getElementById("cartOverlay");

    if (cartOverlay) {
        cartOverlay.classList.add("active");
        document.body.style.overflow = "hidden";
    }
}

function closeCart() {

    const cartOverlay = document.getElementById("cartOverlay");

    if (cartOverlay) {
        cartOverlay.classList.remove("active");
        document.body.style.overflow = "";
    }
}

/* =========================================================
   SEARCH
   ========================================================= */

function openSearch() {

    const overlay = document.getElementById("searchOverlay");
    const input = document.getElementById("searchInput");

    if (!overlay) return;

    overlay.classList.add("active");

    document.body.style.overflow = "hidden";

    setTimeout(() => {

        if (input) {
            input.focus();
        }

    }, 200);
}

function closeSearch() {

    const overlay = document.getElementById("searchOverlay");

    if (overlay) {
        overlay.classList.remove("active");
        document.body.style.overflow = "";
    }
}

function searchProducts() {

    const input = document.getElementById("searchInput");
    const results = document.getElementById("searchResults");

    if (!input || !results) return;

    const query = input.value
        .trim()
        .toLowerCase();

    if (!query) {

        results.innerHTML = `
            <p style="
                color:#777;
                font-size:13px;
                padding:15px 0;
            ">
                Start typing to search OFFSTITCH.
            </p>
        `;

        return;
    }

    const matches = products.filter(product => {

        return (
            product.name.toLowerCase().includes(query) ||
            product.categoryName.toLowerCase().includes(query) ||
            product.category.toLowerCase().includes(query)
        );

    });

    if (matches.length === 0) {

        results.innerHTML = `
            <p style="
                color:#777;
                font-size:13px;
                padding:15px 0;
            ">
                No products found.
            </p>
        `;

        return;
    }

    results.innerHTML = matches.map(product => {

        return `
            <div
                class="search-result-item"
                onclick="openSearchProduct(${product.id})"
            >

                <img
                    src="${product.image}"
                    alt="${product.name}"
                >

                <div>
                    <h4>${product.name}</h4>

                    <p>
                        ${product.categoryName}
                    </p>
                </div>

            </div>
        `;

    }).join("");
}

function openSearchProduct(productId) {

    closeSearch();

    setTimeout(() => {
        openProduct(productId);
    }, 250);
}

/* =========================================================
   AI STYLE
   ========================================================= */

function toggleStyles() {

    const options = document.getElementById("styleOptions");

    if (!options) return;

    options.classList.toggle("active");
}

function selectStyle(style) {

    const result = document.getElementById("aiResult");

    if (!result) return;

    const styleData = {

        street: {
            title: "Street Energy",
            text: "Relaxed silhouettes, bold graphics and effortless layers."
        },

        minimal: {
            title: "Minimal Mode",
            text: "Clean lines, neutral tones and timeless essentials."
        },

        casual: {
            title: "Everyday Casual",
            text: "Comfort-first pieces designed for everyday movement."
        },

        party: {
            title: "Party Edit",
            text: "Statement pieces created for nights that need attention."
        }
    };

    const selected = styleData[style];

    if (!selected) return;

    result.innerHTML = `
        <span class="section-label">
            AI STYLE PICK
        </span>

        <h3>
            ${selected.title}
        </h3>

        <p>
            ${selected.text}
        </p>

        <button
            class="primary-btn"
            onclick="shopNow()"
        >
            Explore Look
        </button>
    `;

    document.querySelectorAll(".style-option").forEach(option => {
        option.classList.remove("active");
    });

    const selectedButton = document.querySelector(
        `[data-style="${style}"]`
    );

    if (selectedButton) {
        selectedButton.classList.add("active");
    }
}

/* =========================================================
   CHECKOUT
   ========================================================= */

function checkout() {

    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    alert(
        "Checkout is ready to be connected to your payment system."
    );
}

/* =========================================================
   ESC KEY
   ========================================================= */

document.addEventListener("keydown", function (event) {

    if (event.key !== "Escape") return;

    closeMenu();
    closeCart();
    closeSearch();
    closeProduct();

});

/* =========================================================
   BACKDROP CLICK
   ========================================================= */

document.addEventListener("click", function (event) {

    const menuOverlay = document.getElementById("menuOverlay");
    const cartOverlay = document.getElementById("cartOverlay");
    const searchOverlay = document.getElementById("searchOverlay");
    const productModal = document.getElementById("productModal");

    if (
        menuOverlay &&
        event.target === menuOverlay
    ) {
        closeMenu();
    }

    if (
        cartOverlay &&
        event.target === cartOverlay
    ) {
        closeCart();
    }

    if (
        searchOverlay &&
        event.target === searchOverlay
    ) {
        closeSearch();
    }

    if (
        productModal &&
        event.target === productModal
    ) {
        closeProduct();
    }

});

/* =========================================================
   SEARCH ENTER KEY
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const searchInput = document.getElementById("searchInput");

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            searchProducts
        );

        searchInput.addEventListener(
            "keydown",
            function (event) {

                if (event.key === "Enter") {
                    searchProducts();
                }

            }
        );
    }

    updateCart();

});