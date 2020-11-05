var porcentajeShipping = 0.15;
var datosCart = [];

function mostrarArticulos(arts) {
  var htmlContenido = "";

  if (arts.length == 0) {
    console.log(arts.length);
    htmlContenido += `<th scope="row">
     <td> <h3>El Carrito está vacío...</h3> <span><a href="products.html"> Agregar Productos</a></span> </td>
    </th>`;
  } else {
    for (var i = 0; i < arts.length; i++) {
      let costoUnitario = arts[i].unitCost;
      let monedaProducto = arts[i].currency;
      let tipoCambio = 1;
      if (monedaProducto == "USD") {
        tipoCambio = 40;
      }

      var valorSubtotal = tipoCambio * costoUnitario * arts[i].count;
      costoTipoMoneda = monedaProducto + " " + costoUnitario;
      htmlContenido +=
        `
      <tr id="fila` +
        i +
        ` id="articulo` +
        i +
        `">
        <td><img src="` +
        arts[i].src +
        `" class="img-thumbnail" width="80%"></td>
        <td>` +
        arts[i].name +
        `</td>
        <td id="monedaCosto` +
        i +
        `">` +
        costoTipoMoneda +
        `</td>
        <td><input onchange="actualizarSubtotal(` +
        i +
        `)" id="inputCantArticulos` +
        i +
        `" class="inputClase quantity" min="1" name="quantity"
        value="` +
        arts[i].count +
        `" type="number"></td>
        <td><span id="subtotalProd` +
        i +
        `" class="subtotalProdClase">` +
        "UYU " +
        valorSubtotal +
        `</span></td>
        <td><span><button type="button" class="btn btn-outline-secondary" onclick="borrarProd(this)" > <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                         <path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/> </svg></button></span></td>
        
                     
      </tr>
      `;
    }
    document.getElementById("articulosCarrito").innerHTML = htmlContenido;
  }
}

function actualizarSubtotal(id) {
  let count = parseInt(
    document.getElementById("inputCantArticulos" + id).value
  );
  monedaProd = document.getElementById("monedaCosto" + id).textContent;
  monedaProd2 = monedaProd.split(" ");

  var moneda = 1;
  if (monedaProd2[0] == "USD") {
    moneda = 40;
  }

  subtotal = monedaProd2[1] * count * moneda;

  document.getElementById("subtotalProd" + id).innerHTML = "UYU " + subtotal;

  actualizaTotal();
}

function actualizaTotal() {
  let subTotCostoHTML = document.getElementById("subTotalHTML");
  let costoShippingHTML = document.getElementById("costoEnvioHTML");
  let costoTotHTML = document.getElementById("costoTotal");

  var sumaSubTotales = 0;

  for (var i = 0; i < datosCart.length; i++) {
    var texto = document.getElementById("subtotalProd" + i).textContent;
    var arText = texto.split(" ");
    var valorTexto = arText[1];
    sumaSubTotales += parseInt(valorTexto);
  }

  let costoShipping = Math.round(porcentajeShipping * sumaSubTotales);

  subTotCostoHTML.innerHTML = "UYU " + sumaSubTotales;
  costoShippingHTML.innerHTML = "UYU " + costoShipping;
  costoTotHTML.innerHTML = "UYU " + (sumaSubTotales + costoShipping);
}

document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(CART_INFO_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      datosCarrito = resultObj.data;
      datosCart = datosCarrito.articles;
      mostrarArticulos(datosCart);

      primerSubtotal = 0;
      primerTotal = 0;
      primerSubtotal2 = 0;

      for (let i = 0; i < datosCart.length; i++) {
        primerSubtotal = document
          .getElementById("subtotalProd" + i)
          .textContent.split(" ");
        primerSubtotal2 += parseInt(primerSubtotal[1]);
      }
      primerTotal = primerSubtotal2 * porcentajeShipping;

      document.getElementById("subTotalHTML").innerHTML = primerSubtotal2;
      document.getElementById("costoEnvioHTML").innerHTML =
        primerSubtotal2 * porcentajeShipping;
      document.getElementById("costoTotal").innerHTML =
        primerSubtotal2 * porcentajeShipping + primerSubtotal2;
    }
  });

  document
    .getElementById("premiumradio")
    .addEventListener("change", function () {
      porcentajeShipping = 0.15;
      actualizaTotal();
    });
  document
    .getElementById("expressradio")
    .addEventListener("change", function () {
      porcentajeShipping = 0.07;
      actualizaTotal();
    });
  document
    .getElementById("standardradio")
    .addEventListener("change", function () {
      porcentajeShipping = 0.05;
      actualizaTotal();
    });
});

function comprar() {
  var calleEnvio = document.getElementById("calleEnvio").value;
  var numeroEnvio = document.getElementById("numeroEnvio").value;
  var esquinaEnvio = document.getElementById("esquinaEnvio").value;

  if (calleEnvio === "") {
    swal("Escriba su calle", "Error", "error");
    return false;
  }
  if (numeroEnvio === "") {
    swal("Escriba su numero", "Error", "error");
    return false;
  }
  if (esquinaEnvio === "") {
    swal("Escriba su esquina", "Error", "error");
    return false;
  }
  if (!document.querySelector('input[name="tipoDePago"]:checked')) {
    swal("Selecciona la forma de pago", "Error", "error");
    hasError = true;
  } else {
    swal(
      "Compra Realizada con exito",
      "Disfruta tus nuevos productos!",
      "success"
    );
  }
}

const btn = document.getElementById("btnpago");

btn.addEventListener("click", (e) => {
  e.preventDefault();
});

//Eliminar un producto
function borrarProd(id) {
  id.parentNode.parentNode.parentNode.remove();
}
