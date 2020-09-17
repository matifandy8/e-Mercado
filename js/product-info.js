var product = {};

function showImagesGallery(array) {
  let htmlContentToAppend = "";

  for (let i = 0; i < array.length; i++) {
    let imageSrc = array[i];

    htmlContentToAppend +=
      `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` +
      imageSrc +
      `" alt="">
            </div>
        </div>
        `;

    document.getElementById(
      "productImagesGallery"
    ).innerHTML = htmlContentToAppend;
  }
}

function showRelatedImages(array) {
  htmlContentToAppend = "";

  for (i = 0; i < product.relatedProducts.length; i++) {

      let pos = product.relatedProducts[i];
      let related = array[pos];

      htmlContentToAppend += `
      <div class="col-lg-3 col-md-4 col-6">
      <div class="d-block mb-4 h-100">
   <img class="img-fluid img-thumbnail" src="` + related.imgSrc + `" alt="">
      </div>
      </div>  `

      document.getElementById("relatedImages").innerHTML = htmlContentToAppend;
  }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      product = resultObj.data;

      let productNameHTML = document.getElementById("productName");
      let productDescriptionHTML = document.getElementById(
        "productDescription"
      );
      let productCostHTML = document.getElementById("productCost");
      let productCountHTML = document.getElementById("productCount");
      let productCriteriaHTML = document.getElementById("productCriteria");

      productNameHTML.innerHTML = product.name;
      productDescriptionHTML.innerHTML = product.description;
      productCostHTML.innerHTML = product.cost;
      productCountHTML.innerHTML = product.soldCount;
      productCriteriaHTML.innerHTML = product.category;

      //Muestro las imagenes en forma de galería
      showImagesGallery(product.images);
   
   
      getJSONData(PRODUCTS_URL).then(function (resultProd) {
        if (resultProd.status === "ok") {

            related = resultProd.data;
            showRelatedImages(related);
        }
    });

   
   
    }
  });

  getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      let htmlContentToAppend = "";

      for (let i = 0; i < resultObj.data.length; i++) {
        let comment = resultObj.data[i];

        htmlContentToAppend += `
        <article class="row border">
            <div class="col-md-10 col-sm-10">
              <div class="panel panel-default arrow left">
                <div class="panel-body">
                  <header class="text-left">
                    <div class="comment-user"><i class="fa fa-user"></i> ${comment.user}</div>
                    <time class="comment-date" datetime="dateTime"><i class="fa fa-clock-o"></i>${comment.dateTime}</time>
                  </header>
                  <div class="comment-post">
                    <p>
                      ${comment.description}
                    </p>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star"></span>
                    <span class="fa fa-star"></span>
                  </div>
                </div>
              </div>
            </div>
          </article>
        `;

        document.getElementById(
          "comment-list-container"
        ).innerHTML = htmlContentToAppend;
      }
    }
  });
});

