const body = document.querySelector("body"),
  nav = document.querySelector("nav"),
  modeToggle = document.querySelector(".dark-light"),
  searchToggle = document.querySelector(".searchToggle"),
  sidebarOpen = document.querySelector(".sidebarOpen"),
  siderbarClose = document.querySelector(".siderbarClose");

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

body.addEventListener("click", (e) => {
  let clickedElm = e.target;

  if (
    !clickedElm.classList.contains("sidebarOpen") &&
    !clickedElm.classList.contains("menu")
  ) {
    nav.classList.remove("active");
  }
});

function changePreview(image) {
  document.getElementById("preview").src = image.src;
}

document.addEventListener("DOMContentLoaded", function () {
  const cartItemsContainer = document.querySelector(".cart-items");
  const totalElement = document.querySelector("#total");

  function loadCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    let total = 0;

    cartItemsContainer.innerHTML = "";
    cart.forEach((item) => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;

      const itemElement = document.createElement("div");
      itemElement.classList.add("cart-item");
      itemElement.innerHTML = `
                <span>${item.name}</span>
                <span>$${item.price.toFixed(2)} x ${item.quantity}</span>
                <button class="remove-item" data-id="${item.id}">X</button>
            `;
      cartItemsContainer.appendChild(itemElement);
    });

    totalElement.textContent = total.toFixed(2);

    // Añadir eventos de eliminar producto
    document.querySelectorAll(".remove-item").forEach((button) => {
      button.addEventListener("click", function () {
        removeFromCart(this.getAttribute("data-id"));
      });
    });
  }

  function removeFromCart(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter((item) => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart(); // Recargar el carrito
  }

  // Inicializar el carrito al cargar la página
  loadCart();
});
// Carrito de compras
document.addEventListener("DOMContentLoaded", () => {
  const cartItemsContainer = document.querySelector(".cart-items");
  const totalElement = document.getElementById("total");
  const checkoutBtn = document.getElementById("checkoutBtn");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  let total = 0;

  // Limpiar el contenedor antes de agregar nuevos productos
  cartItemsContainer.innerHTML = "";

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
  Object.values(productGroups).forEach((item) => {
    if (typeof item.price === "number" && !isNaN(item.price)) {
      const cartItem = document.createElement("div");
      cartItem.classList.add("cart-item");
      cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <div class="item-info">
                    <h4>${item.title}</h4>
                    <p>$${item.price.toFixed(2)} x ${item.quantity}</p>
                    <button class="remove-btn" data-id="${
                      item.id
                    }">Eliminar</button>
                </div>
            `;
      cartItemsContainer.appendChild(cartItem);

      total += item.price * item.quantity;
    } else {
      console.error("Precio no definido o inválido para el producto:", item);
    }
  });

  // Actualizar el total
  totalElement.textContent = total.toFixed(2);

  // Manejar el clic en el botón de eliminar
  document.querySelectorAll(".remove-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.getAttribute("data-id");
      const updatedCart = cart.filter((item) => item.id !== id);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      location.reload(); // Recarga la página para actualizar el carrito
    });
  });

  // Manejar el clic en el botón de comprar
  checkoutBtn.addEventListener("click", () => {
    if (cart.length > 0) {
      showModal();
    } else {
      alert("Tu carrito está vacío.");
    }
  });

  function showModal() {
    // Crear el modal si no existe
    let modal = document.getElementById("checkoutModal");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "checkoutModal";
      modal.className = "modal";
      modal.innerHTML = `
                <div class="modal-content">
                    <h2>Confirmar Compra</h2>
                    <p>¿Quieres comprar estos productos?</p>
                    <button id="confirmPurchaseBtn">Confirmar Compra</button>
                    <button id="cancelPurchaseBtn">Cancelar</button>
                    <button id="downloadReceiptBtn">Descargar Recibo</button>
                </div>
            `;
      document.body.appendChild(modal);

      // Manejar clic en los botones del modal
      document
        .getElementById("confirmPurchaseBtn")
        .addEventListener("click", () => {
          alert("Gracias por tu compra.");
          downloadReceipt(); // Descargar recibo
          clearCart(); // Limpiar carrito después de compra
          modal.style.display = "none";
        });

      document
        .getElementById("cancelPurchaseBtn")
        .addEventListener("click", () => {
          modal.style.display = "none";
        });

      document
        .getElementById("downloadReceiptBtn")
        .addEventListener("click", () => {
          if (cart.length > 0) {
            downloadReceipt(); // Descargar recibo
            clearCart(); // Limpiar carrito después de descarga
            modal.style.display = "none";
          } else {
            alert("No hay productos para descargar el recibo.");
          }
        });
    }

    modal.style.display = "flex";
  }

  function downloadReceipt() {
    // Generar y descargar el archivo PDF (puedes usar una librería como jsPDF aquí)
    const blob = new Blob(["Recibo de Compra"], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "recibo.txt";
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
  }

  function clearCart() {
    localStorage.removeItem("cart");
    cartItemsContainer.innerHTML = ""; // Limpiar el contenedor de productos
    totalElement.textContent = "0.00"; // Restablecer el total
    setTimeout(() => {
      location.reload(); // Recargar la página para mostrar el carrito vacío
    }, 100); // Retardo de 100ms para asegurar la limpieza
  }
});

// Agregar productos al carrito (esto va en la página de productos)
document.querySelectorAll(".agregar-carrito").forEach((button) => {
  button.addEventListener("click", () => {
    const id = button.getAttribute("data-id");
    const name = button.getAttribute("data-name");
    const price = parseFloat(button.getAttribute("data-price"));
    const image = button.getAttribute("data-image");

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingProductIndex = cart.findIndex((item) => item.id === id);

    if (existingProductIndex > -1) {
      cart[existingProductIndex].quantity += 1;
    } else {
      cart.push({ id, title: name, price, image, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Producto agregado al carrito");
  });
});
