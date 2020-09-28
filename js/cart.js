function showProducts(articles) {
  let contenidoHTML = "";

  for (let i = 0; i < articles.length; i++) {
    let article = articles[i];
    contenidoHTML +=
      `
          <div class="list-group-item">
              <div class="row">
                  <div class="col-2">
                      <img src="` +
      article.src +
      `" alt="` +
      `" class="img-thumbnail">
                  </div>
                  <div class="col">
                      <h5><strong>Nombre</strong></h5>
                      <p class="lead"> ` +
      article.name +
      ` </p>
                  </div>
                  <div class="col">
                      <h5><strong>Precio por unidad</strong></h5>
                      <p class="lead" id="unitCost">  ` +
      article.unitCost +
      ` ` +
      article.currency +
      `</p>
                  </div> 
                  <div class="col">
                      <h5><strong>N° de artículos</strong></h5>
                      <div class="row">
                          <div class="col-6">       
                              <input class="form-control" type="number" id="prodCount" placeholder=" ` +
      article.count +
      ` " value= "2" min= "0"> 
                          </div>
                      </div>
                  </div> 
              </div>    
          </div>  
          `;
    costoArticulo = article.unitCost;
    document.getElementById("cart-container").innerHTML = contenidoHTML;
  }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(CART_INFO_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      datos = resultObj.data;

      //Muestra el producto en el carrito
      showProducts(datos.articles);
    }
  });
});
