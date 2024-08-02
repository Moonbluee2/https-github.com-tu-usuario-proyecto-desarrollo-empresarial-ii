document.addEventListener('DOMContentLoaded', () => {
    // Seleccionar el contenedor principal de la página
    const mainContent = document.querySelector('main');
    
    if (mainContent) {
        // Crear un nuevo elemento <section> para el botón de descarga
        const downloadSection = document.createElement('section');
        downloadSection.classList.add('download-section');
        downloadSection.innerHTML = `
            <h1>Bienvenido a Nuestra Tienda</h1>
            <p>Haz clic en el botón de abajo para descargar el recibo de compra.</p>
            <a href="ruta/al/recibo.pdf" download="recibo_compra.pdf" class="download-btn">Descargar Recibo de Compra</a>
        `;

        // Insertar el nuevo <section> en el contenedor principal
        mainContent.appendChild(downloadSection);

        // Crear y agregar estilos CSS para el botón de descarga
        const style = document.createElement('style');
        style.textContent = `
            .download-section {
                text-align: center;
                margin: 20px;
            }

            .download-btn {
                display: inline-block;
                padding: 10px 20px;
                background-color: #007bff;
                color: #fff;
                text-decoration: none;
                border-radius: 5px;
                font-size: 16px;
            }

            .download-btn:hover {
                background-color: #0056b3;
            }
        `;
        document.head.appendChild(style);
    }
});
