//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
  const completonombre = document.getElementById("nombrecompleto");
  const emailtext = document.getElementById("emailtext");
  const numerotext = document.getElementById("numerotext");
  const direcciontext = document.getElementById("direcciontext");

  let informacion = JSON.parse(localStorage.getItem("dato"));
  console.log(localStorage.getItem("dato"));

  if (informacion != null) {
    completonombre.innerHTML =
      informacion[0].nombres + " " + informacion[0].apellidos;
    emailtext.innerHTML = informacion[0].email;
    numerotext.innerHTML = informacion[0].telefono;
    direcciontext.innerHTML = informacion[0].direccion;
  } else {
    completonombre.innerHTML = "---";
    emailtext.innerHTML = "---";
    numerotext.innerHTML = "---";
    direcciontext.innerHTML = "---";
  }
});

const btn = document.getElementById("btnguardar");
const nombres = document.getElementById("nombres");
const apellidos = document.getElementById("apellidos");
const email = document.getElementById("mail");
const telefono = document.getElementById("telefono");
const direccion = document.getElementById("direccion");

btn.addEventListener("click", (e) => {
  e.preventDefault();
  let datos = Array({
    nombres: nombres.value,
    apellidos: apellidos.value,
    email: email.value,
    telefono: telefono.value,
    direccion: direccion.value,
  });
  localStorage.setItem("dato", JSON.stringify(datos));
  window.location.reload();
});
