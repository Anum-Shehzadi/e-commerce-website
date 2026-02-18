async function getProduct() {
    try {
        const productId = localStorage.getItem("selectedProductId");
        const res = await fetch(`https://fakestoreapi.com/products/${productId}`);
        const product = await res.json();

        showProductDetail(product);
    } catch (err) {
        console.log("API Error:", err);
    }
}

getProduct();

function showProductDetail(product) {
    const container = document.getElementById("product-detail");

    container.innerHTML = `
        <div class="detail-card">
            <div class="detail-img">
                <img src="${product.image}" alt="${product.title}">
            </div>
            <div class="detail-info">
                <p><strong>Product ID:</strong> ${product.id}</p>
                <h2>${product.title}</h2>
                <p><strong>Price:</strong> $${product.price}</p>
                <p><strong>Category:</strong> ${product.category}</p>
                <p>${product.description}</p>
                <button class="add-to-cart">Add to Cart</button>
            </div>
        </div>
    `;
}
