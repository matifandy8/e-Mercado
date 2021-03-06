var product = {};
var num_stars = 1;

//Mostrar imágenes del producto en un carrusel
function showImagesGallery(array) {
  let htmlContentToAppend = "";

  for (let i = 0; i < array.length; i++) {
      if (i == 0) {                             
          htmlContentToAppend += ` 
          <div class="carousel-item active">
              <img class="d-block w-100" src="` + array[i] + `" > 
          </div> 
          `
      } else {
          htmlContentToAppend += `
          <div class="carousel-item">
              <img class="d-block w-100" src="` + array[i] + `">
          </div>
          `
      }
  }
  document.getElementById("Caruzel").innerHTML = htmlContentToAppend;
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
                    <p><b>Puntuacion:</b> `+comment.score+` <i class="fa fa-star"></i></p>

                  </div>
                </div>
              </div>
            </div>
          </article>
        `;
        stars_score();

        document.getElementById(
          "users"
        ).innerHTML = htmlContentToAppend;
      }
    }
  });
});



// Mostar el nombre del usuario actual en la sección de comentar
var userComment = JSON.parse(localStorage.getItem('user'));
  document.getElementById("userCom").innerHTML = userComment[0].email;

function stars_score() {
stars ="";
for(let s=5; s>0; s--) {
  if(s > num_stars) {
    stars +=`<span class="fa fa-star float-right"></span>`
  } else {
    stars +=`<span class="fa fa-star checked float-right"></span>`
  }
  document.getElementById("stars_rating").innerHTML=stars;
}
}



//Agregar estrellas a la calificación
function add_star() {
  if(num_stars < 5) {
    num_stars++;
  }
}

//Restar estrellas a la calificación
function take_star() {
  if(num_stars > 1) {
    num_stars--;
  }
}

//Mostrar las estrellas en el formulario, para calificar
function show_rating(num) {
  let rating = "";
  
  for(let x=5; x>0; x--) {
    
    if(x > num) {
      rating +=`<span class="fa fa-star float-right"></span>`
    } else {
      rating +=`<span class="fa fa-star checked float-right"></span>`
    }
    document.getElementById("stars_rating").innerHTML= rating;

  }
}



//Añadir comentario a la pantalla actual
function addComment(event) {
  event.preventDefault();
  let opinion = document.getElementById("opinion").value;
  

  let comment = "";
  var today = new Date();
  var todayDate = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
  comment = `
          <h4><b>Su comentario:</b></h4>
          <p><b>Usuario: `+userComment[0].email+`</b></p>
          <p><b>Comentario:</b> `+opinion+`</p>`
          for(let y = 5; y > 0; y--) {
    
            if(y > num_stars) {
              comment += `<span class="fa fa-star float-right"></span>`
            } else {
              comment += `<span class="fa fa-star checked float-right"></span>`
            }}
          comment+=
          `
          <p><b>Fecha:</b> `+todayDate+`</p>
          <hr>
        `
      document.getElementById("users").innerHTML += comment;
}
