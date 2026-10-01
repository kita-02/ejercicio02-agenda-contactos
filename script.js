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

  let duplicado = contactos.some(function (contacto) {
    return contacto.telefono === telefono;
  });

  if (duplicado) {
    return mostrarError(mensaje, "Ya existe un contacto con ese número de teléfono.");
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
    let indiceReal = contactos.indexOf(contacto);
    let item = document.createElement("li");

    let datos = document.createElement("div");
    datos.className = "datos";
    datos.innerHTML =
      "<strong>" + contacto.nombre + "</strong>" +
      "<span>" + contacto.telefono + "</span>" +
      "<span>" + contacto.correo + "</span>";

    let acciones = document.createElement("div");
    acciones.className = "acciones";

    let ver = document.createElement("button");
    ver.type = "button";
    ver.className = "ver";
    ver.innerText = "Ver";
    ver.onclick = function () {
      verContacto(indiceReal);
    };

    let eliminar = document.createElement("button");
    eliminar.type = "button";
    eliminar.className = "eliminar";
    eliminar.innerText = "Eliminar";
    eliminar.onclick = function () {
      eliminarContacto(indiceReal);
    };

    acciones.appendChild(ver);
    acciones.appendChild(eliminar);

    item.appendChild(datos);
    item.appendChild(acciones);
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

function verContacto(indice) {
  let contacto = contactos[indice];
  let detalle = document.getElementById("detalle");

  detalle.innerHTML =
    '<button type="button" class="cerrar" onclick="cerrarDetalle()">Cerrar</button>' +
    "<h3>Detalle del contacto</h3>" +
    "<dl>" +
    "<dt>Nombre</dt><dd>" + contacto.nombre + "</dd>" +
    "<dt>Teléfono</dt><dd>" + contacto.telefono + "</dd>" +
    "<dt>Correo</dt><dd>" + contacto.correo + "</dd>" +
    "</dl>";

  detalle.style.display = "block";
}

function eliminarContacto(indice) {
  let nombre = contactos[indice].nombre;

  if (!confirm("¿Desea eliminar el contacto " + nombre + "?")) {
    return;
  }

  contactos.splice(indice, 1);
  mostrarContactos();

  let mensaje = document.getElementById("mensaje");
  mensaje.className = "exito";
  mensaje.innerText = "Se eliminó el contacto " + nombre + ".";

  if (contactos.length === 0) {
    document.getElementById("detalle").style.display = "none";
  }
}

function cerrarDetalle() {
  document.getElementById("detalle").style.display = "none";
}

function limpiarFormulario() {
  document.getElementById("nombre").value = "";
  document.getElementById("telefono").value = "";
  document.getElementById("correo").value = "";
  document.getElementById("nombre").focus();
}

document.getElementById("buscar").addEventListener("input", mostrarContactos);
mostrarContactos();
