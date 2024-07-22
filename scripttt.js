window.onload = () => {
    console.time('Carga de la página');
    
    document.addEventListener('DOMContentLoaded', () => {
        console.timeEnd('Carga de la página');
    });

    // Verificación de elementos
    console.assert(document.querySelector('.nav-bar') !== null, 'Error: Navbar no cargada');
    console.assert(document.querySelector('.card-container') !== null, 'Error: Tarjetas de productos no cargadas');
};
