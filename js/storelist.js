document.addEventListener('DOMContentLoaded', function () {
    // Initialize the store list
    initializeStoreList();

    // Check screen size and adjust view
    checkScreenSize();

    // Listen for window resize to adjust view
    window.addEventListener('resize', checkScreenSize);
});

// Initialize the store list
function initializeStoreList() {
    // Get all store data from the table
    const storeData = [];
    const tableRows = document.querySelectorAll('#storeTable tbody tr');

    tableRows.forEach(row => {
        storeData.push({
            name: row.dataset.name,
            code: row.dataset.code,
            state: row.dataset.state,
            city: row.dataset.city
        });
    });

    // Populate mobile cards
    const cardsContainer = document.getElementById('storeCards');
    cardsContainer.innerHTML = '';

    storeData.forEach(store => {
        const card = document.createElement('div');
        card.className = 'store-card';
        card.dataset.name = store.name;
        card.dataset.code = store.code;
        card.dataset.state = store.state;
        card.dataset.city = store.city;

        card.innerHTML = `
            <div class="store-card-name">${store.name}</div>
            <div class="store-card-code">Code: ${store.code}</div>
            <div class="store-card-location">${store.city}, ${store.state}</div>
            <div class="store-card-arrow"><i class="bi bi-chevron-right"></i></div>
        `;

        cardsContainer.appendChild(card);
    });

    // Add click event to table rows
    tableRows.forEach(row => {
        row.addEventListener('click', function () {
            navigateToStore(this.dataset);
        });
    });

    // Add click event to mobile cards
    const storeCards = document.querySelectorAll('.store-card');
    storeCards.forEach(card => {
        card.addEventListener('click', function () {
            navigateToStore(this.dataset);
        });
    });
}

// Navigate to store products page
function navigateToStore(storeData) {
    const params = new URLSearchParams({
        name: storeData.name,
        code: storeData.code,
        state: storeData.state,
        city: storeData.city
    });

    window.location.href = `store-products.html?${params.toString()}`;
}

// Check screen size and adjust view
function checkScreenSize() {
    const isMobile = window.innerWidth <= 768;
    const desktopTable = document.querySelector('.desktop-table');
    const mobileCards = document.querySelector('.mobile-cards');

    if (isMobile) {
        desktopTable.style.display = 'none';
        mobileCards.style.display = 'block';
    } else {
        desktopTable.style.display = 'block';
        mobileCards.style.display = 'none';
    }
}



















// Initialize the product modal
let productModal;

document.addEventListener('DOMContentLoaded', function () {
    // Initialize the Bootstrap modal
    productModal = new bootstrap.Modal(document.getElementById('productModal'));

    // Get store information from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('name') && urlParams.has('code')) {
        const store = {
            name: urlParams.get('name'),
            code: urlParams.get('code'),
            state: urlParams.get('state'),
            city: urlParams.get('city')
        };

        // Display store information
        displayStoreInfo(store);
    }

    // Initialize the product list
    initializeProductList();

    // Check screen size and adjust view
    checkScreenSize();

    // Listen for window resize to adjust view
    window.addEventListener('resize', checkScreenSize);
});

// Display store information
function displayStoreInfo(store) {
    document.getElementById('storeInfo').innerHTML = `
                <h2>${store.name}</h2>
                <p>Code: ${store.code} | Location: ${store.city}, ${store.state}</p>
            `;
}

// Initialize the product list
function initializeProductList() {
    // Get all product data from the table
    const productData = [];
    const tableRows = document.querySelectorAll('#productTable tbody tr');

    tableRows.forEach(row => {
        productData.push({
            sku: row.dataset.sku,
            name: row.dataset.name,
            price: row.dataset.price,
            inventory: row.dataset.inventory
        });
    });

    // Populate mobile cards
    const cardsContainer = document.getElementById('productCards');
    cardsContainer.innerHTML = '';

    productData.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.dataset.sku = product.sku;
        card.dataset.name = product.name;
        card.dataset.price = product.price;
        card.dataset.inventory = product.inventory;

        card.innerHTML = `
                    <div class="product-card-title">${product.name}</div>
                    <div class="product-card-sku">SKU: ${product.sku}</div>
                    <div class="product-card-price">${product.price}</div>
                    <div class="product-card-inventory">In Stock: ${product.inventory}</div>
                `;

        cardsContainer.appendChild(card);
    });

    // Add click event to table rows
    tableRows.forEach(row => {
        row.addEventListener('click', function () {
            showProductModal(this.dataset);
        });
    });

    // Add click event to mobile cards
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('click', function () {
            showProductModal(this.dataset);
        });
    });
}

// Show the product modal
function showProductModal(data) {
    // Update modal content
    document.getElementById('modalSkuCode').textContent = data.sku;
    document.getElementById('modalProductName').textContent = data.name;
    document.getElementById('modalPrice').textContent = data.price;
    document.getElementById('modalInventory').textContent = data.inventory;

    // Show the modal
    productModal.show();
}

// Check screen size and adjust view
function checkScreenSize() {
    const isMobile = window.innerWidth <= 768;
    const desktopTable = document.querySelector('.desktop-table');
    const mobileCards = document.querySelector('.mobile-cards');

    if (isMobile) {
        desktopTable.style.display = 'none';
        mobileCards.style.display = 'block';
    } else {
        desktopTable.style.display = 'block';
        mobileCards.style.display = 'none';
    }
}