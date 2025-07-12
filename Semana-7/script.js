// Arreglo inicial de productos
let productos = [
    {nombre: "Guanabana", precio: 5, descripcion: "Guanabana fresca"},
    {nombre: "Platanos", precio: 4, descripcion: "Platanos frescos"},
    {nombre: "Chontaduro", precio: 6, descripcion: "Chontaduro fresco"}
];

// Elementos del DOM
const lista = document.getElementById("lista-productos");
const botonAgregar = document.getElementById("btnAgregar");
const botonEliminar = document.getElementById("delBtn");
const botonSeleccionar = document.getElementById("btnSelect");
const botonLimpiar = document.getElementById("btnLimpiar");
const nombreInput = document.getElementById("nombreProducto");
const precioInput = document.getElementById("precioProducto");
const descInput = document.getElementById("descProducto");

// Variable para guardar el índice del producto seleccionado
let seleccionado = null;

// Función para renderizar la lista de productos
function renderizar() {
    lista.innerHTML = ""; // Limpiar la lista antes de renderizar
    productos.forEach((producto, idx) => {
        const item = document.createElement("li");
        item.textContent = `${producto.nombre} - $${producto.precio} - ${producto.descripcion}`;
        // Si el producto está seleccionado, resáltalo
        if (seleccionado === idx) {
            item.style.background = "#ffe082";
        }
        // Permite seleccionar el producto al hacer clic
        item.addEventListener("click", () => {
            seleccionado = idx;
            renderizar();
        });
        lista.appendChild(item);
    });
}

// Renderizar al cargar la página
renderizar();

// Evento para agregar un nuevo producto
botonAgregar.addEventListener("click", () => {
    const nombre = nombreInput.value.trim();
    const precio = parseFloat(precioInput.value);
    const descripcion = descInput.value.trim();

    // Validación básica
    if (nombre && !isNaN(precio) && descripcion) {
        productos.push({nombre, precio, descripcion});
        nombreInput.value = "";
        precioInput.value = "";
        descInput.value = "";
        seleccionado = null; // Deselecciona cualquier producto
        renderizar();
    } else {
        alert("Completa todos los campos correctamente.");
    }
});
// Evento para seleccionar el primer producto (ejemplo de uso del botón)
botonSeleccionar.addEventListener("click", () => {
    if (productos.length > 0) {
        seleccionado = 0; // Selecciona el primer producto
        renderizar();
    }
});

// Evento para eliminar el producto seleccionado
botonEliminar.addEventListener("click", () => {
    if (seleccionado !== null) {
        productos.splice(seleccionado, 1);
        seleccionado = null;
        renderizar();
    } else {
        alert("Selecciona un producto para eliminar.");
    }
});

// Evento para limpiar toda la lista de productos
botonLimpiar.addEventListener("click", () => {
    productos = [];
    seleccionado = null;
    renderizar();
});
