const body = document.querySelector("body"),
      nav = document.querySelector("nav"),
      modeToggle = document.querySelector(".dark-light"),
      searchToggle = document.querySelector(".searchToggle"),
      sidebarOpen = document.querySelector(".sidebarOpen"),
      siderbarClose = document.querySelector(".siderbarClose");

// Verificar el modo guardado en localStorage y aplicar el tema correspondiente
    const getMode = localStorage.getItem("mode");
    if (getMode && getMode === "dark-mode") {
        body.classList.add("dark");
    }

// Código para alternar entre modos oscuro y claro
modeToggle.addEventListener("click", () => {
    modeToggle.classList.toggle("active");
    body.classList.toggle("dark");

    // Código para mantener el modo seleccionado por el usuario al recargar la página o reabrir el archivo
    if(!body.classList.contains("dark")){
        localStorage.setItem("mode", "light-mode");
    } else {
        localStorage.setItem("mode", "dark-mode");
    }
});

// Código para alternar la caja de búsqueda
searchToggle.addEventListener("click", () => {
    searchToggle.classList.toggle("active");
});

// Cerrar la barra lateral al hacer clic fuera de ella
body.addEventListener("click", e => {
    const clickedElm = e.target;
    if (!clickedElm.classList.contains("sidebarOpen") && !clickedElm.classList.contains("menu") && !clickedElm.closest('.menu')) {
        nav.classList.remove("active");
    }
});


// Carrito de compras
const products = [
    { id: 1, name: 'LUCKY BLACK', price: 850.00, imgSrc: 'images/LUCKY BLACK.png' },
    { id: 2, name: 'LUCKY BLUE', price: 850.00, imgSrc: 'images/LUCKY BLUE.png' },
    { id: 3, name: 'COLORS 2024 CURVE', price: 800.00, imgSrc: 'images/COLORS 2024 CURVE.png' },
    { id: 4, name: 'COLORS GOLD 2023', price: 850.00, imgSrc: 'images/COLORS GOLD 2023.png' },
    { id: 5, name: 'POKER GOLD', price: 850.00, imgSrc: 'images/POKER GOLD.png' },
    // Añadir más productos según sea necesario
];
// Función para mostrar productos en tarjetas
function displayProducts() {
    const productsContainer = document.querySelector('.products');
    products.forEach(product => {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card';
        cardDiv.innerHTML = `
            <img src="${product.imgSrc}" alt="Imagen de producto">
            <div class="card-content">
                <h2>${product.name}</h2>
                <p>$ ${product.price.toFixed(2)}</p>
                <button class="add-to-cart" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}">Añadir al carrito</button>
            </div>
        `;
        productsContainer.appendChild(cardDiv);
    });

    // Añadir eventos a los botones "Añadir al carrito"
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function () {
            const productId = this.getAttribute('data-id');
            const productName = this.getAttribute('data-name');
            const productPrice = parseFloat(this.getAttribute('data-price'));

            addToCart(productId, productName, productPrice);
        });
    });
}

// Función para agregar producto al carrito
function addToCart(productId, productName, productPrice) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let product = { id: productId, name: productName, price: productPrice };
    
    // Verificar si el producto ya está en el carrito
    let existingProductIndex = cart.findIndex(item => item.id === productId);
    if (existingProductIndex >= 0) {
        // Si el producto ya está, actualiza la cantidad
        cart[existingProductIndex].quantity = (cart[existingProductIndex].quantity || 1) + 1;
    } else {
        // Si el producto no está, agrégalo al carrito
        cart.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

// Función para mostrar el carrito
function updateCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.querySelector('.cart-items');
    cartItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.className = 'cart-item';
        cartItemDiv.innerHTML = `
            <p>${item.name} - $${item.price.toFixed(2)} x ${item.quantity} <button onclick="removeFromCart(${index})">X</button></p>
        `;
        cartItemsContainer.appendChild(cartItemDiv);
        total += item.price * item.quantity;
    });

    document.getElementById('total').innerText = total.toFixed(2);
}

// Función para eliminar producto del carrito
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

// Función para proceder al checkout
function checkout() {
    alert('Compra realizada');
    localStorage.removeItem('cart');
    updateCart();
}

// Inicializar la página
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    updateCart();
});
// Funcionalidad del buscador de productos
const searchInput = document.getElementById('searchInput');
const productContainer = document.getElementById('card-container');
const cards = productContainer.getElementsByClassName('card');

searchInput.addEventListener('input', function () {
    const searchQuery = searchInput.value.toLowerCase();

    Array.from(cards).forEach(card => {
        const productName = card.getAttribute('data-title').toLowerCase();

        if (productName.includes(searchQuery)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});



