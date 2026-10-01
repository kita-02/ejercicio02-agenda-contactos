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
  mostrarContactos();
}

function mostrarError(elemento, texto) {
  elemento.className = "error";
  elemento.innerText = texto;
}

function mostrarContactos() {
  let lista = document.getElementById("listaContactos");
  let filtro = document.getElementById("buscar").value.trim().toLowerCase();
  lista.innerHTML = "";

  let visibles = contactos.filter(function (contacto) {
    return filtro === "" || contacto.nombre.toLowerCase().includes(filtro);
  });

  visibles.forEach(function (contacto) {
    let item = document.createElement("li");

    let datos = document.createElement("div");
    datos.className = "datos";
    datos.innerHTML =
      "<strong>" + contacto.nombre + "</strong>" +
      "<span>" + contacto.telefono + "</span>" +
      "<span>" + contacto.correo + "</span>";

    item.appendChild(datos);
    lista.appendChild(item);
  });

  document.getElementById("total").innerText = contactos.length;
  document.getElementById("vacio").style.display = visibles.length ? "none" : "block";
  if (visibles.length === 0 && contactos.length > 0) {
    document.getElementById("vacio").innerText = "No se encontraron contactos con ese nombre.";
  } else {
    document.getElementById("vacio").innerText = "No hay contactos registrados.";
  }
}

function limpiarFormulario() {
  document.getElementById("nombre").value = "";
  document.getElementById("telefono").value = "";
  document.getElementById("correo").value = "";
  document.getElementById("nombre").focus();
}

document.getElementById("buscar").addEventListener("input", mostrarContactos);
mostrarContactos();
