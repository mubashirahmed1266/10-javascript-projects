// Product Data

const products = [
    // iPhone Collection
    {
        id: 1,
        name: "iPhone 15 Pro",
        category: "iphone",
        price: 250000,
        image: "images/iphone--2.jpg"
    },
    {
        id: 2,
        name: "iPhone 16 Pro",
        category: "iphone",
        price: 310000,
        image: "images/iphone2.jpg"
    },
    {
        id: 3,
        name: "iPhone 17 Pro",
        category: "iphone",
        price: 390000,
        image: "images/iphone-3.jpg"
    },

    // Samsung Collection
    {
        id: 4,
        name: "Samsung Galaxy S24 Ultra",
        category: "samsung",
        price: 250000,
        image: "images/samsung-1.jpg"
    },
    {
        id: 5,
        name: "Samsung Galaxy S25 Ultra",
        category: "samsung",
        price: 330000,
        image: "images/samsung-3.jpg"
    },
    {
        id: 6,
        name: "Samsung Galaxy S26 Ultra",
        category: "samsung",
        price: 450000,
        image: "images/samsung3.jpg"
    },

    // HP Laptop Collection
    {
        id: 7,
        name: "HP Pavilion 15",
        category: "hp",
        price: 250000,
        image: "images/hp-1.jpg"
    },
    {
        id: 8,
        name: "HP EliteBook 840",
        category: "hp",
        price: 100000,
        image: "images/hp-2.jpg"
    },
    {
        id: 9,
        name: "HP Victus Gaming",
        category: "hp",
        price: 285000,
        image: "images/hp3.jpg"
    },

    // Dell Laptop Collection
    {
        id: 10,
        name: "Dell Inspiron 15",
        category: "dell",
        price: 200000,
        image: "images/dell1.jpg"
    },
    {
        id: 11,
        name: "Dell Latitude 5420",
        category: "dell",
        price: 80000,
        image: "images/dell2.jpg"
    },
    {
        id: 12,
        name: "Dell XPS 13",
        category: "dell",
        price: 300000,
        image: "images/dell-3.jpg"
    },

    // Headphones Collection
    {
        id: 13,
        name: "Sony Wireless Headphones",
        category: "headphones",
        price: 18000,
        image: "images/head1.jpg"
    },
    {
        id: 14,
        name: "JBL Bluetooth Headphones",
        category: "headphones",
        price: 12000,
        image: "images/head-2.jpg"
    },
    {
        id: 15,
        name: "Boat Rockerz Headphones",
        category: "headphones",
        price: 8000,
        image: "images/head3.jpg"
    },

    // Smart Watch Collection
    {
        id: 16,
        name: "Apple Watch Series 10",
        category: "watches",
        price: 95000,
        image: "images/watch-1.jpg"
    },
    {
        id: 17,
        name: "Samsung Galaxy Watch",
        category: "watches",
        price: 65000,
        image: "images/watch-2.jpg"
    },
    {
        id: 18,
        name: "Amazfit Smart Watch",
        category: "watches",
        price: 25000,
        image: "images/watch3.jpg"
    }
];

// Select Products Grid
const productsGrid = document.getElementById("products-grid");

// Display Products Function
function displayProducts(productsArray) {

    productsGrid.innerHTML = productsArray.map(product => {

        return `
            <div class="product-card">

                <img src="${product.image}" alt="${product.name}">

                <div class="product-info">
                    <h3>${product.name}</h3>

                    <p>Rs. ${product.price.toLocaleString("en-PK")}</p>

                    <button class="add-to-cart">
                        Add to Cart
                    </button>
                </div>

            </div>
        `;

    }).join("");
}

// Display All Products
displayProducts(products);

// Search Products

const searchInput = document.getElementById("search-input");

searchInput.addEventListener("input", function () {

    applyFilters();

});

// Category Filtering

const categoryButtons = document.querySelectorAll(".category-btn");

let selectedCategory = "all";

categoryButtons.forEach(button => {

    button.addEventListener("click", function () {

        categoryButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        this.classList.add("active");

        selectedCategory = this.dataset.category;

        applyFilters();

    });

});

// Price Filtering

const minPriceInput = document.getElementById("min-price");

const maxPriceInput = document.getElementById("max-price");

const priceFilterButton = document.getElementById("price-filter-btn");

let minimumPrice = 0;

let maximumPrice = Infinity;

priceFilterButton.addEventListener("click", function () {

    const minValue = minPriceInput.value.trim();

    const maxValue = maxPriceInput.value.trim();

    minimumPrice = minValue === "" ? 0 : Number(minValue);

    maximumPrice = maxValue === "" ? Infinity : Number(maxValue);

    if (
        !Number.isFinite(minimumPrice) ||
        minimumPrice < 0 ||
        (maxValue !== "" && (!Number.isFinite(maximumPrice) || maximumPrice < 0)) ||
        minimumPrice > maximumPrice
    ) {

        alert("Please enter valid price values.");

        return;

    }

    applyFilters();

});

// Sort Products

const sortSelect = document.getElementById("sort-products");

sortSelect.addEventListener("change", function () {

    applyFilters();

});

// Apply All Filters

const noProducts = document.getElementById("no-products");

function applyFilters() {

    let filteredProducts = [...products];

    // Search Filter

    const searchValue = searchInput.value.toLowerCase().trim();

    if (searchValue !== "") {

        filteredProducts = filteredProducts.filter(product =>
            product.name.toLowerCase().includes(searchValue)
        );

    }

    // Category Filter

    if (selectedCategory !== "all") {

        filteredProducts = filteredProducts.filter(product =>
            product.category === selectedCategory
        );

    }

    // Price Filter

    filteredProducts = filteredProducts.filter(product =>
        product.price >= minimumPrice &&
        product.price <= maximumPrice
    );

    // Sorting

    if (sortSelect.value === "low-high") {

        filteredProducts.sort((a, b) => a.price - b.price);

    }

    else if (sortSelect.value === "high-low") {

        filteredProducts.sort((a, b) => b.price - a.price);

    }

    // Display Filtered Products

    displayProducts(filteredProducts);

    // No Products Found

    if (filteredProducts.length === 0) {

        noProducts.style.display = "block";

    } else {

        noProducts.style.display = "none";

    }

}
