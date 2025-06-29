// Aqui se define el comportamiento de la página web
let div = document.querySelector('div')
// Se define el evento de clic en el div
function colores(){
  div.innerHTML =  " Bienvenido a la semana 5";
  div.style.marginTop = '20px';
  div.style.background = "aliceblue";
}
// Se añade un evento de clic al div
function cambiarColor(color) {
  div.style.background = color;
  div.style.color = 'black';
}
// Se añaden eventos de clic a los botones
const galeria = document.getElementById('galeria');
const addBtn = document.getElementById('addBtn');
const delBtn = document.getElementById('delBtn');
const imgUrl = document.getElementById('imgUrl');
const ejemploBtns = document.querySelectorAll('.ejemplo');
// Esta función crea un contenedor para la imagen y el precio
// y añade un evento para seleccionar la imagen al hacer clic.
function crearImagen(src, precio = "$2") {
  const contenedor = document.createElement('div');
  contenedor.classList.add('img-contenedor');
  // Añadir clase para el contenedor de la imagen
  const img = document.createElement('img');
  img.src = src;
  img.alt = "Imagen de galería";
  img.addEventListener('click', () => seleccionarImagen(img));
  // Añadir clase para la imagen
  img.classList.add('imagen-galeria');
  const precioTag = document.createElement('div');
  precioTag.className = "precio";
  precioTag.textContent = precio;
  // Añadir clase para el precio
  contenedor.appendChild(img);
  contenedor.appendChild(precioTag);
  // Añadir el contenedor a la galería
  return contenedor;
}
// Esta función selecciona una imagen al hacer clic en ella
// y resalta la imagen seleccionada.
function seleccionarImagen(img) {
  document.querySelectorAll('.galeria img').forEach(im => im.classList.remove('seleccionada'));
  img.classList.add('seleccionada');
}
// Esta función agrega una nueva imagen a la galería
// al hacer clic en el botón "Agregar Imagen".
addBtn.addEventListener('click', () => {
  if (imgUrl.value.trim() !== '') {
    const precio = prompt("¿Cuál es el precio de la imagen?", "$2") || "$2";
    const contenedor = crearImagen(imgUrl.value.trim(), precio);
    galeria.appendChild(contenedor);
    imgUrl.value = '';
  }
});
// Se añade un evento de teclado para permitir agregar la imagen
// al presionar "Enter" en el campo de entrada de URL.
imgUrl.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    addBtn.click();
  }
});
// Esta función elimina la imagen seleccionada al hacer clic en el botón "Eliminar Imagen Seleccionada".
delBtn.addEventListener('click', () => {
  const seleccionada = document.querySelector('.galeria img.seleccionada');
  if (seleccionada) {
    seleccionada.classList.remove('seleccionada');
    seleccionada.style.animation = 'seleccion 0.3s reverse';
    setTimeout(() => seleccionada.remove(), 200);
  }
});
// Se añaden eventos de clic a los botones de ejemplo
// para agregar imágenes locales a la galería con un precio predeterminado.
ejemploBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const precio = btn.dataset.precio || "$2";
    const contenedor = crearImagen(btn.dataset.src, precio);
    galeria.appendChild(contenedor);
  });
});