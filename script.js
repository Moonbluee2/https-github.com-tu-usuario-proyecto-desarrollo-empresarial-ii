const body = document.querySelector("body"),
      nav = document.querySelector("nav"),
      modeToggle = document.querySelector(".dark-light"),
      searchToggle = document.querySelector(".searchToggle"),
      sidebarOpen = document.querySelector(".sidebarOpen"),
      siderbarClose = document.querySelector(".siderbarClose"),
      searchInput = document.getElementById("searchInput"),
      card = document.querySelectorAll(".card");

let getMode = localStorage.getItem("mode");
if (getMode && getMode === "dark-mode") {
    body.classList.add("dark");
}

// Código para alternar entre modos oscuro y claro
modeToggle.addEventListener("click", () => {
    modeToggle.classList.toggle("active");
    body.classList.toggle("dark");

    // Código para mantener el modo seleccionado por el usuario al recargar la página o reabrir el archivo
    if (!body.classList.contains("dark")) {
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

    if (!clickedElm.classList.contains("sidebarOpen") && !clickedElm.classList.contains("menu")) {
        nav.classList.remove("active");
    }
});

// Función para el buscador
searchInput.addEventListener("input", () => {
    const searchValue = searchInput.value.toLowerCase();
    card.forEach(card => {
        const title = card.getAttribute("data-title").toLowerCase();
        if (title.includes(searchValue)) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }
    });
});

