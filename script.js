let contactos = [];

function guardarContacto() {
  let mensaje = document.getElementById("mensaje");

  let nombre = document.getElementById("nombre").value.trim();
  let telefono = document.getElementById("telefono").value.trim();
  let correo = document.getElementById("correo").value.trim();

  if (nombre === "") {
    return mostrarError(mensaje, "Debe ingresar el nombre del contacto.");
  }

  if (telefono === "") {
    return mostrarError(mensaje, "Debe ingresar el número de teléfono.");
  }

  if (!/^[0-9]{9}$/.test(telefono)) {
    return mostrarError(mensaje, "El teléfono debe tener 9 dígitos.");
  }

  if (correo === "") {
    return mostrarError(mensaje, "Debe ingresar el correo electrónico.");
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
    return mostrarError(mensaje, "El correo electrónico no tiene un formato válido.");
  }

  contactos.push({ nombre: nombre, telefono: telefono, correo: correo });

  mensaje.className = "exito";
  mensaje.innerText = "Contacto registrado correctamente.";

  limpiarFormulario();
}

function mostrarError(elemento, texto) {
  elemento.className = "error";
  elemento.innerText = texto;
}

function limpiarFormulario() {
  document.getElementById("nombre").value = "";
  document.getElementById("telefono").value = "";
  document.getElementById("correo").value = "";
  document.getElementById("nombre").focus();
}
