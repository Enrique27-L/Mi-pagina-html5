//validaciones del lado del cliente (Frontend/JavaScript)
<input type="email" required></input>

if (CSSMathProduct.value===""){
    alert("El campo no puede estar vacío");
}
//Validar un correo en un servidor (PHP):
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) { echo
"Correo no válido"; }
document.getElementById('miFormulario').addEventLis
tener('submit', function(event) {
 event.preventDefault(); // Evita el envío
});
//const campo = document.getElementById('nombre');
const mensajeError = document.getElementById('mensajeError');
campo.addEventListener('input', () => {
  if (campo.value.length < 3) {
    mensajeError.textContent = 'El nombre es demasiado corto';
  } else {
    mensajeError.textContent = ''; // Limpiar el mensaje si la validación es exitosa
  }
});
const correoInput = document.getElementById('correo');
correoInput.addEventListener('input', () => {
 const correo = correoInput.value;
 const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

 if (!regex.test(correo)) {
 mensajeError.textContent = 'Correo inválido';
 } else {
 mensajeError.textContent = ''; // Limpiar mensaje de error si el correo es válido
 }
});
const campo = document.getElementById('nombre');constmensajeError =
document.getElementById('mensajeError');campo.addEventListener('input', () => { if (campo.value.length < 3) {
mensajeError.textContent = 'El nombre es demasiado corto'; } else {
mensajeError.textContent = ''; // Limpiar el mensaje si la validación es
exitosa }});
const contraseñaInput = document.getElementById('contraseña');
const mensajeErro = document.getElementById('mensajeError');
contraseñaInput.addEventListener('input', () => {
 const contraseña = contraseñaInput.value;
 // Verificar longitud mínima de 8 caracteres
if (contraseña.length < 8) {
 mensajeError.textContent = 'La contraseña debe tener al menos 8 caracteres';
}
 // Verificar si contiene caracteres especiales
else if (!/[!@#$%^&*(),.?":{}|<>]/.test(contraseña)) {
 mensajeError.textContent = 'La contraseña debe incluir al menos un carácter especial';
}
 else {
 mensajeError.textContent = '';// Limpiar mensaje de error si la contraseña es válida
}
});

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

