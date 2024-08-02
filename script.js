// Selección de elementos del DOM
const body = document.querySelector("body"),
      nav = document.querySelector("nav"),
      modeToggle = document.querySelector(".dark-light"),
      searchToggle = document.querySelector(".searchToggle"),
      sidebarOpen = document.querySelector(".sidebarOpen"),
      sidebarClose = document.querySelector(".siderbarClose"),
      searchInput = document.getElementById("searchInput"),
      cards = document.querySelectorAll(".card");

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

// Función para el buscador
searchInput.addEventListener("input", () => {
    const searchValue = searchInput.value.toLowerCase();
    cards.forEach(card => {
        const title = card.getAttribute("data-title").toLowerCase();
        if (title.includes(searchValue)) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }
    });
});
