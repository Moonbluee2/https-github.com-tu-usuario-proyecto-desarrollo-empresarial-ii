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
// Obtener elementos del DOM
const cartItemsContainer = document.querySelector('.cart-items');
const totalElement = document.getElementById('total');

// Función para añadir productos al carrito
function addToCart(event) {
    const productId = event.target.getAttribute('data-id');
    const productName = event.target.getAttribute('data-name');
    const productPrice = event.target.getAttribute('data-price');

    // Obtener el carrito del localStorage o inicializar uno nuevo
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Verificar si el producto ya está en el carrito
    const existingProductIndex = cart.findIndex(item => item.id === productId);
    if (existingProductIndex > -1) {
        // Actualizar la cantidad del producto existente
        cart[existingProductIndex].quantity += 1;
    } else {
        // Añadir el nuevo producto al carrito
        cart.push({
            id: productId,
            name: productName,
            price: parseFloat(productPrice),
            quantity: 1
        });
    }

    // Guardar el carrito actualizado en el localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Mostrar el carrito actualizado
    displayCartItems();

    // Mostrar mensaje de confirmación
    alert(`El producto ${productName} ha sido añadido al carrito.`);
}

// Función para eliminar un producto del carrito
function removeFromCart(productId) {
    console.log('Intentando eliminar el producto con ID:', productId);  // Verifica el ID
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    console.log('Carrito actual:', cart);  // Verifica el carrito actual

    // Filtrar el producto a eliminar
    cart = cart.filter(item => item.id !== productId);
    console.log('Carrito después de eliminar:', cart);  // Verifica el carrito después de eliminar

    // Guardar el carrito actualizado en el localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Mostrar el carrito actualizado
    displayCartItems();
}

// Función para mostrar los productos del carrito
function displayCartItems() {
    // Obtener el carrito del localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Limpiar el contenedor de los productos del carrito
    cartItemsContainer.innerHTML = '';

    let total = 0;

    // Recorrer los productos del carrito y agregarlos al DOM
    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        
        // Crear el contenido del producto
        itemElement.innerHTML = `
            ${item.name} - $${item.price.toFixed(2)} x ${item.quantity}
            <button onclick="removeFromCart('${item.id}')">Eliminar</button>
        `;
        
        cartItemsContainer.appendChild(itemElement);
        total += item.price * item.quantity;
    });

    // Actualizar el total en el DOM
    totalElement.textContent = total.toFixed(2);
}

// Mostrar los productos del carrito cuando se carga la página del carrito
document.addEventListener('DOMContentLoaded', () => {
    displayCartItems();
});

// Función de checkout (puedes personalizarla según tus necesidades)
function checkout() {
    alert('Funcionalidad de compra aún no implementada.');
}
