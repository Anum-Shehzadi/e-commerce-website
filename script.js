
//  ================= SLIDER ===================
let slides = document.querySelectorAll('.slide');
let index = 0;

setInterval(() => {
    slides[index].classList.remove('active');
    index = (index + 1) % slides.length;
    slides[index].classList.add('active');
}, 4000);


// =============== STICKY HEADER ================
window.addEventListener("scroll", function () {
    let header = document.getElementById("header");

    if (window.scrollY > 50) {
        header.classList.add("sticky");
    } else {
        header.classList.remove("sticky");
    }
});


// =================== API ====================
let allProducts = [];

async function getProducts() {
    try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();

        allProducts = data;
        showProducts(allProducts);
    } catch (err) {
        console.log("API Error:", err);
    }
}

getProducts();                                                                                                                                                                                                              

// =============== SHOW PRODUCTS ================
function showProducts(products) {
    const container = document.getElementById("products-container");
    container.innerHTML = "";

    products.forEach(product => {

        const card = document.createElement("div");
        card.className = "card";
        card.setAttribute("data-category", product.category);

        const cardImg = document.createElement("div");
        cardImg.className = "card-img";

        cardImg.innerHTML = `
          <img src="${product.image}" alt="${product.title}">
          <span class="view-details-btn">View Details</span>
        `;

        const viewBtn = cardImg.querySelector(".view-details-btn");
        viewBtn.addEventListener("click", (e) => {
            e.stopPropagation(); // prevent parent clicks
            openDetail(product.id);
        });

        const cardDesc = document.createElement("div");
        cardDesc.className = "card-description";

        cardDesc.innerHTML = `
          <div>
            <h4>${product.title}</h4>
            <p>$${product.price}</p>
          </div>
          <div>
            <button class="heart-btn">
              <i class="far fa-heart"></i>
            </button>
          </div>
        `;

        card.appendChild(cardImg);
        card.appendChild(cardDesc);
        container.appendChild(card);
    });
}



//=========== Open product detail page============
function openDetail(id) {
     localStorage.setItem("selectedProductId", id);  
    window.location.href = "product.html?id=" + id;
}


// ============= FILTER ===================
const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        const category = button.dataset.category;

        if (category === "all") {
            showProducts(allProducts);
        } else {
            const filtered = allProducts.filter(
                p => p.category === category
            );
            showProducts(filtered);
        }

    });
});


// =================== HEART ICON =====================
document.addEventListener("click", function (e) {
    if (e.target.closest(".heart-btn")) {
        const btn = e.target.closest(".heart-btn");
        btn.classList.toggle("active");

        const icon = btn.querySelector("i");
        icon.classList.toggle("fa-regular");
        icon.classList.toggle("fa-solid");
    }
});




