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

