const body = document.querySelector("body"),
      nav = document.querySelector("nav"),
      modeToggle = document.querySelector(".dark-light"),
      searchToggle = document.querySelector(".searchToggle"),
      sidebarOpen = document.querySelector(".sidebarOpen"),
      siderbarClose = document.querySelector(".siderbarClose"),
      searchInput = document.getElementById("searchInput"),
      productContainer = document.getElementById("productContainer");

let getMode = localStorage.getItem("mode");
if (getMode && getMode === "dark-mode") {
    body.classList.add("dark");
}

// Código para alternar entre modos oscuro y claro
modeToggle.addEventListener("click", () => {
    modeToggle.classList.toggle("active");
    body.classList.toggle("dark");

    if (!body.classList.contains("dark")) {
        localStorage.setItem("mode", "light-mode");
    } else {
        localStorage.setItem("mode", "dark-mode");
    }
});

// Código para la funcionalidad de la barra de búsqueda
searchToggle.addEventListener("click", () => {
    searchToggle.classList.toggle("active");
});

sidebarOpen.addEventListener("click", () => {
    nav.classList.add("active");
});

body.addEventListener("click", e => {
    let clickedElm = e.target;

    if (!clickedElm.classList.contains("sidebarOpen") && !clickedElm.classList.contains("menu")) {
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
                const cards = doc.querySelectorAll('.card');

                cards.forEach(card => {
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
        searchInput.addEventListener("input", function() {
            const filter = searchInput.value.toLowerCase();
            productContainer.innerHTML = ''; // Limpia los resultados previos

            if (filter === '') {
                // Si el campo de búsqueda está vacío, muestra todas las tarjetas
                products.forEach(product => {
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
            } else {
                // Si hay un filtro, muestra solo las tarjetas que coinciden
                const filteredProducts = products.filter(product => product.title.toLowerCase().includes(filter));

                filteredProducts.forEach(product => {
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

                if (productContainer.innerHTML === '') {
                    productContainer.innerHTML = '<p>No se encontraron productos.</p>';
                }
            }
        });
    }).catch(error => {
        console.error("Error al cargar los productos:", error);
    });
});