// Selección de elementos del DOM
const body = document.querySelector("body"),
      nav = document.querySelector("nav"),
      modeToggle = document.querySelector(".dark-light"),
      searchToggle = document.querySelector(".searchToggle"),
      sidebarOpen = document.querySelector(".sidebarOpen"),
      sidebarClose = document.querySelector(".siderbarClose"),
      searchInput = document.getElementById("searchInput"),
      productContainer = document.getElementById("productContainer");

// Verificar el modo guardado en localStorage y aplicar el tema correspondiente
const getMode = localStorage.getItem("mode");
if (getMode && getMode === "dark-mode") {
    body.classList.add("dark");
    modeToggle.classList.add("active");
}

// Código para alternar entre modos oscuro y claro
modeToggle.addEventListener("click", () => {
    modeToggle.classList.toggle("active");
    body.classList.toggle("dark");

    // Código para mantener el modo seleccionado por el usuario al recargar la página o reabrir el archivo
    if (body.classList.contains("dark")) {
        localStorage.setItem("mode", "dark-mode");
    } else {
        localStorage.setItem("mode", "light-mode");
    }
});

// Código para la funcionalidad de la barra de búsqueda
searchToggle.addEventListener("click", () => {
    searchToggle.classList.toggle("active");
    // Opcional: Mostrar/ocultar el campo de búsqueda aquí si es necesario
});

// Código para alternar la barra lateral
sidebarOpen.addEventListener("click", () => {
    nav.classList.add("active");
});

sidebarClose.addEventListener("click", () => {
    nav.classList.remove("active");
});

// Cerrar la barra lateral si se hace clic fuera de ella
body.addEventListener("click", e => {
    const clickedElm = e.target;
    if (!clickedElm.classList.contains("sidebarOpen") && !clickedElm.classList.contains("menu") && !clickedElm.closest('.menu')) {
        nav.classList.remove("active");
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.getElementById("searchInput");
    const productContainer = document.getElementById("productContainer");
    const pages = ['INICIO.html', 'INICIO2.html', 'INICIO3.html'];

    let products = [];

    // Función para cargar productos de una página
    function loadProductsFromPage(url) {
        return fetch(url)
            .then(response => response.text())
            .then(text => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(text, 'text/html');
                const card = doc.querySelectorAll('.card');

                card.forEach(card => {
                    products.push({
                        title: card.getAttribute('data-title'),
                        description: card.querySelector('p').textContent,
                        image: card.querySelector('img').src,
                        page: url
                    });
                });
            });
    }

    // Cargar productos de todas las páginas
    Promise.all(pages.map(loadProductsFromPage)).then(() => {
        function renderProducts(productsToRender) {
            productContainer.innerHTML = ''; // Limpia los resultados previos

            if (productsToRender.length === 0) {
                productContainer.innerHTML = '<p>No se encontraron productos.</p>';
            } else {
                productsToRender.forEach(product => {
                    const card = document.createElement("div");
                    card.className = "card";
                    card.setAttribute("data-title", product.title);
                    card.innerHTML = `
                        <img src="${product.image}" alt="${product.title}">
                        <div class="card-content">
                            <h2>${product.title}</h2>
                            <p>${product.description}</p>
                            <a href="${product.page}"><button>Comprar ahora</button></a>
                        </div>
                    `;
                    productContainer.appendChild(card);
                });
            }
        }

        // Obtener la página actual
        const currentPage = window.location.pathname.split('/').pop();

        // Filtrar productos para la página actual
        const currentProducts = products.filter(product => product.page.includes(currentPage));

        // Mostrar productos de la página actual inicialmente
        renderProducts(currentProducts);

        searchInput.addEventListener("input", function() {
            const filter = searchInput.value.toLowerCase();

            if (filter === '') {
                // Si el campo de búsqueda está vacío, muestra solo las tarjetas de la página actual
                renderProducts(currentProducts);
            } else {
                // Si hay un filtro, muestra solo las tarjetas que coinciden
                const filteredProducts = products.filter(product => product.title.toLowerCase().includes(filter));
                renderProducts(filteredProducts);
            }
        });
    }).catch(error => {
        console.error("Error al cargar los productos:", error);
    });
});