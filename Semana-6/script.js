// --- VALIDACIÓN DEL FORMULARIO ---

// Reglas de validación para cada campo
const reglas = {
  nombre: v => v.trim().length >= 3 || "Mínimo 3 caracteres",
  correo: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || "Correo inválido",
  contraseña: v => v.length >= 8 && /\d/.test(v) && /[!@#$%^&*(),.?":{}|<>]/.test(v) 
    || "Mínimo 8 caracteres, un número y un carácter especial",
  confirmar: v => v === document.getElementById('contraseña').value && v !== "" 
    || "Las contraseñas no coinciden",
  edad: v => Number(v) >= 18 && Number(v) <= 65 || "Edad entre 18 y 65"
};

const form = document.getElementById('miFormulario');
const enviar = document.getElementById('enviar');

if (form && enviar) {
  // Validación dinámica y mensajes
  form.addEventListener('input', () => {
    let valido = true;
    for (let campo in reglas) {
      const input = document.getElementById(campo);
      const error = document.getElementById('error' + campo.charAt(0).toUpperCase() + campo.slice(1));
      const resultado = reglas[campo](input.value);
      if (resultado !== true) {
        error.textContent = resultado;
        input.classList.add('input-error');
        input.classList.remove('input-ok');
        valido = false;
      } else {
        error.textContent = '';
        input.classList.remove('input-error');
        input.classList.add('input-ok');
      }
    }
    enviar.disabled = !valido;
  });

  // Mensaje de éxito al enviar
  form.addEventListener('submit', e => {
    e.preventDefault();
    alert('¡Formulario enviado correctamente!');
    form.reset();
    document.querySelectorAll('.error').forEach(e => e.textContent = '');
    document.querySelectorAll('input').forEach(i => i.classList.remove('input-ok', 'input-error'));
    enviar.disabled = true;
  });
}

// --- GALERÍA DE IMÁGENES ---

const galeria = document.getElementById('galeria');
const addBtn = document.getElementById('addBtn');
const delBtn = document.getElementById('delBtn');
const imgUrl = document.getElementById('imgUrl');
const ejemploBtns = document.querySelectorAll('.ejemplo');

// Crea un contenedor para la imagen y el precio
function crearImagen(src, precio = "$2") {
  const contenedor = document.createElement('div');
  contenedor.classList.add('img-contenedor');

  const img = document.createElement('img');
  img.src = src;
  img.alt = "Imagen de galería";
  img.addEventListener('click', () => seleccionarImagen(img));
  img.classList.add('imagen-galeria');

  const precioTag = document.createElement('div');
  precioTag.className = "precio";
  precioTag.textContent = precio;

  contenedor.appendChild(img);
  contenedor.appendChild(precioTag);
  return contenedor;
}

// Selecciona una imagen al hacer clic
function seleccionarImagen(img) {
  document.querySelectorAll('.galeria img').forEach(im => im.classList.remove('seleccionada'));
  img.classList.add('seleccionada');
}

// Agrega una nueva imagen a la galería desde URL
if (addBtn && imgUrl && galeria) {
  addBtn.addEventListener('click', () => {
    if (imgUrl.value.trim() !== '') {
      const precio = prompt("¿Cuál es el precio de la imagen?", "$2") || "$2";
      const contenedor = crearImagen(imgUrl.value.trim(), precio);
      galeria.appendChild(contenedor);
      imgUrl.value = '';
    }
  });

  // Permite agregar imagen con Enter
  imgUrl.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      addBtn.click();
    }
  });
}

// Elimina la imagen seleccionada
if (delBtn && galeria) {
  delBtn.addEventListener('click', () => {
    const seleccionada = document.querySelector('.galeria img.seleccionada');
    if (seleccionada) {
      seleccionada.classList.remove('seleccionada');
      seleccionada.style.animation = 'seleccion 0.3s reverse';
      setTimeout(() => seleccionada.parentElement.remove(), 200);
    }
  });
}

// Agrega imágenes locales con precio desde los botones de ejemplo
if (ejemploBtns && galeria) {
  ejemploBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const precio = btn.dataset.precio || "$2";
      const contenedor = crearImagen(btn.dataset.src, precio);
      galeria.appendChild(contenedor);
    });
  });
}