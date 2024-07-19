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



