// Utilizamos módulos para mantener el código organizado y modular
(function() {
    'use strict';

    // Función principal que se ejecuta cuando el DOM está completamente cargado
    function main() {
        // Variables globales
        const apiUrl = 'https://api.example.com/data';
        const header = document.querySelector('header');
        const productsContainer = document.querySelector('.product-list');

        // Evento de clic en el encabezado para cambiar el color de fondo
        header.addEventListener('click', function() {
            header.style.backgroundColor = '#ffcc00';
        });

        // Función para obtener y mostrar productos desde una API
        async function fetchProducts() {
            try {
                const response = await fetch(apiUrl);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const products = await response.json();
                renderProducts(products);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        }

        // Función para renderizar productos en la página
        function renderProducts(products) {
            productsContainer.innerHTML = ''; // Limpiar contenedor antes de agregar nuevos productos

            products.forEach(product => {
                const productCard = createProductCard(product);
                productsContainer.appendChild(productCard);
            });
        }

        // Función para crear el HTML de una tarjeta de producto
        function createProductCard(product) {
            const card = document.createElement('div');
            card.classList.add('product-card');

            const image = document.createElement('img');
            image.src = product.image;
            image.alt = product.name;
            card.appendChild(image);

            const title = document.createElement('h3');
            title.textContent = product.name;
            card.appendChild(title);

            const description = document.createElement('p');
            description.textContent = product.description;
            card.appendChild(description);

            const link = document.createElement('a');
            link.href = product.url;
            link.textContent = 'Ver Detalles';
            link.classList.add('btn');
            card.appendChild(link);

            return card;
        }

        // Iniciar la carga de productos al cargar completamente el DOM
        fetchProducts();
    }

    // Ejecutar la función principal al cargar completamente el DOM
    document.addEventListener('DOMContentLoaded', main);

})();
