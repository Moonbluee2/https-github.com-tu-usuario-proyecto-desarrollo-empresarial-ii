const body = document.querySelector("body"),
      nav = document.querySelector("nav"),
      modeToggle = document.querySelector(".dark-light"),
      searchToggle = document.querySelector(".searchToggle"),
      sidebarOpen = document.querySelector(".sidebarOpen"),
      siderbarClose = document.querySelector(".siderbarClose");

let getMode = localStorage.getItem("mode");
if(getMode && getMode === "dark-mode"){
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

// Código para alternar la barra lateral
sidebarOpen.addEventListener("click", () => {
    nav.classList.add("active");
});

body.addEventListener("click", e => {
    let clickedElm = e.target;

    if(!clickedElm.classList.contains("sidebarOpen") && !clickedElm.classList.contains("menu")){
        nav.classList.remove("active");
    }
});


function changePreview(image) {
    document.getElementById('preview').src = image.src;
}

document.addEventListener('DOMContentLoaded', function () {
    const cartItemsContainer = document.querySelector('.cart-items');
    const totalElement = document.querySelector('#total');

    function loadCart() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        let total = 0;

        cartItemsContainer.innerHTML = '';
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;

            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
                <span>${item.name}</span>
                <span>$${item.price.toFixed(2)} x ${item.quantity}</span>
                <button class="remove-item" data-id="${item.id}">X</button>
            `;
            cartItemsContainer.appendChild(itemElement);
        });

        totalElement.textContent = total.toFixed(2);

        // Añadir eventos de eliminar producto
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', function () {
                removeFromCart(this.getAttribute('data-id'));
            });
        });
    }

    function removeFromCart(id) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart = cart.filter(item => item.id !== id);
        localStorage.setItem('cart', JSON.stringify(cart));
        loadCart(); // Recargar el carrito
    }

    // Inicializar el carrito al cargar la página
    loadCart();
});
// Carrito de compras
document.addEventListener('DOMContentLoaded', () => {
    // Seleccionar elementos
    const cartItemsContainer = document.querySelector('.cart-items');
    const totalElement = document.getElementById('total');

    // Obtener productos del carrito del localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    let total = 0;

    // Limpiar el contenedor antes de agregar nuevos productos
    cartItemsContainer.innerHTML = '';

    // Agrupar productos similares y sumar la cantidad
    const productGroups = cart.reduce((acc, item) => {
        if (!acc[item.id]) {
            acc[item.id] = { ...item };
        } else {
            acc[item.id].quantity += item.quantity;
        }
        return acc;
    }, {});

    // Mostrar productos en el carrito
    Object.values(productGroups).forEach(item => {
        if (typeof item.price === 'number' && !isNaN(item.price)) {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <div class="item-info">
                    <h4>${item.title}</h4>
                    <p>$${item.price.toFixed(2)} x ${item.quantity}</p>
                    <button class="remove-btn" data-id="${item.id}">Eliminar</button>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);

            total += item.price * item.quantity;
        } else {
            console.error('Precio no definido o inválido para el producto:', item);
        }
    });

    // Actualizar el total
    totalElement.textContent = total.toFixed(2);

    // Manejar el clic en el botón de eliminar
    document.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', () => {
            const id = button.getAttribute('data-id');
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            const updatedCart = cart.filter(item => item.id !== id);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            location.reload(); // Recarga la página para actualizar el carrito
        });
    });

    // Manejar el clic en el botón de comprar
    document.getElementById('checkoutBtn').addEventListener('click', () => {
        const confirmPurchase = confirm('¿Quieres comprar estos productos?');
        if (confirmPurchase) {
            alert('Gracias por tu compra.');
            localStorage.removeItem('cart');
            location.reload(); // Recarga la página para limpiar el carrito
        }
    });
});

// Agregar productos al carrito (esto va en la página de productos)
document.querySelectorAll('.agregar-carrito').forEach(button => {
    button.addEventListener('click', () => {
        const id = button.getAttribute('data-id');
        const name = button.getAttribute('data-name');
        const price = parseFloat(button.getAttribute('data-price'));
        const image = button.getAttribute('data-image');

        const cart = JSON.parse(localStorage.getItem('cart')) || [];

        const existingProductIndex = cart.findIndex(item => item.id === id);

        if (existingProductIndex > -1) {
            cart[existingProductIndex].quantity += 1;
        } else {
            cart.push({ id, title: name, price, image, quantity: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Producto agregado al carrito');
    });
});
