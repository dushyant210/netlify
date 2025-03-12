document.addEventListener('DOMContentLoaded', function() {
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
        row.addEventListener('click', function() {
            navigateToStoreProducts(this.dataset);
        });
    });
    
    // Add click event to mobile cards
    const storeCards = document.querySelectorAll('.store-card');
    storeCards.forEach(card => {
        card.addEventListener('click', function() {
            navigateToStoreProducts(this.dataset);
        });
    });
    
    // Function to navigate to store products page
    function navigateToStoreProducts(storeData) {
        const params = new URLSearchParams({
            name: storeData.name,
            code: storeData.code,
            state: storeData.state,
            city: storeData.city
        });
        
        window.location.href = `store-products.html?${params.toString()}`;
    }
});



document.addEventListener('DOMContentLoaded', function() {
    // Get store details from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const storeName = urlParams.get('name');
    const storeCode = urlParams.get('code');
    const state = urlParams.get('state');
    const city = urlParams.get('city');

    // Display store information
    document.getElementById('storeInfo').innerHTML = `
        <h2>${storeName}</h2>
        <p>Code: ${storeCode} | Location: ${city}, ${state}</p>
    `;

    // Fetch and display products
    fetchAndDisplayProducts(storeCode);

    // Create a modal instance
    const productModal = new bootstrap.Modal(document.getElementById('productModal'));

    // Add click event listener to the product table
    document.getElementById('productTable').addEventListener('click', function(e) {
        const target = e.target.closest('tr');
        if (target && target.dataset.sku) {
            showProductModal(target.dataset, productModal);
        }
    });
    
    // Add click event listener to the product cards
    document.getElementById('productCards').addEventListener('click', function(e) {
        const target = e.target.closest('.product-card');
        if (target && target.dataset.sku) {
            showProductModal(target.dataset, productModal);
        }
    });
});

function showProductModal(data, modal) {
    // Update modal content
    document.getElementById('modalSkuCode').textContent = data.sku;
    document.getElementById('modalProductName').textContent = data.name;
    document.getElementById('modalPrice').textContent = data.price;
    document.getElementById('modalInventory').textContent = data.inventory;

    // Show the modal
    modal.show();
}

function fetchAndDisplayProducts(storeCode) {
    // This is a mock function. In a real application, you would fetch this data from a server.
    const mockProducts = [
        { sku: 'SKU2985473', name: '22 Karat Gold Earrings-Gross Weight-10.947g', price: '₹96,623', inventory: 5 },
        { sku: 'SKU2985474', name: '18 Karat Gold Necklace-Gross Weight-15.320g', price: '₹78,450', inventory: 3 },
        { sku: 'SKU2985475', name: '24 Karat Gold Bangle-Gross Weight-20.105g', price: '₹1,25,000', inventory: 2 },
        { sku: 'SKU2985476', name: '22 Karat Gold Ring-Gross Weight-5.678g', price: '₹45,890', inventory: 8 },
        { sku: 'SKU2985477', name: '18 Karat Gold Bracelet-Gross Weight-12.345g', price: '₹62,780', inventory: 4 }
    ];

    // Populate the table for desktop view
    const tableBody = document.querySelector('#productTable tbody');
    tableBody.innerHTML = '';

    // Populate the cards container for mobile view
    const cardsContainer = document.getElementById('productCards');
    cardsContainer.innerHTML = '';

    mockProducts.forEach(product => {
        // Create table row for desktop
        const row = document.createElement('tr');
        row.dataset.sku = product.sku;
        row.dataset.name = product.name;
        row.dataset.price = product.price;
        row.dataset.inventory = product.inventory;
        
        row.innerHTML = `
            <td>${product.sku}</td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>${product.inventory}</td>
        `;
        
        tableBody.appendChild(row);
        
        // Create card for mobile
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
}