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
            const sku = target.dataset.sku;
            const name = target.dataset.name;
            const price = target.dataset.price;
            const inventory = target.dataset.inventory;

            // Update modal content
            document.getElementById('modalSkuCode').textContent = sku;
            document.getElementById('modalProductName').textContent = name;
            document.getElementById('modalPrice').textContent = price;
            document.getElementById('modalInventory').textContent = inventory;

            // Show the modal
            productModal.show();
        }
    });
});

function fetchAndDisplayProducts(storeCode) {
    // This is a mock function. In a real application, you would fetch this data from a server.
    const mockProducts = [
        { sku: 'SKU2985473', name: '22 Karat Gold Earrings-Gross Weight-10.947g', price: '₹96,623', inventory: 5 },
        { sku: 'SKU2985474', name: '18 Karat Gold Necklace-Gross Weight-15.320g', price: '₹78,450', inventory: 3 },
        { sku: 'SKU2985475', name: '24 Karat Gold Bangle-Gross Weight-20.105g', price: '₹1,25,000', inventory: 2 },
        { sku: 'SKU2985476', name: '22 Karat Gold Ring-Gross Weight-5.678g', price: '₹45,890', inventory: 8 },
        { sku: 'SKU2985477', name: '18 Karat Gold Bracelet-Gross Weight-12.345g', price: '₹62,780', inventory: 4 }
    ];

    const tableBody = document.querySelector('#productTable tbody');
    tableBody.innerHTML = '';

    mockProducts.forEach(product => {
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
    });
}



document.addEventListener('DOMContentLoaded', function() {
    const table = document.getElementById('storeTable');
    const tbody = table.querySelector('tbody');
    const rows = tbody.querySelectorAll('tr');
    
    // Add click event to each row
    rows.forEach(row => {
        row.addEventListener('click', function() {
            // Get store details
            const storeName = this.cells[0].textContent;
            const storeCode = this.cells[1].textContent;
            const state = this.cells[2].textContent;
            const city = this.cells[3].textContent;
            
            // Encode the store details to pass in the URL
            const params = new URLSearchParams({
                name: storeName,
                code: storeCode,
                state: state,
                city: city
            });
            
            // Navigate to the store products page
            window.location.href = `store-products.html?${params.toString()}`;
        });
    });
});