//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
const ORDER_ASC_BY_COST = "De menor a mayor";
const ORDER_DESC_BY_COST = "De mayor a menor";
const ORDER_BY_PROD_REL = "Relevancia";
const ORDER_BY_SEARCH = "según búsqueda";
var currentSortCriterio = undefined;
var minCost = undefined;
var maxCost = undefined;

// Muestro lo lista de productos
function showProductsList() {
  let htmlContentToAppend = "";
  for (let i = 0; i < currentProductsArray.length; i++) {
    let product = currentProductsArray[i];
    let searchProduct = document
      .getElementById("searchTXT")
      .value.toLowerCase();

    // Si el usuario no seleccionó mínimo o máximo muestro todos los artículos
    if (
      (minCost == undefined ||
        (minCost != undefined && parseInt(product.cost) >= minCost)) &&
      (maxCost == undefined ||
        (maxCost != undefined && parseInt(product.cost) <= maxCost)) &&
      product.name.toLowerCase().includes(searchProduct)
    ) {
      htmlContentToAppend +=
        `
        <div class="col-6">
        <a href="product-info.html?` +
        product.name +
        `" class="list-group-item list-group-item-action">
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-6">
                    <img src="` +
        product.imgSrc +
        `" alt="` +
        product.desc +
        `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">` +
        product.name +
        `</h4>
                        <small class="text-muted">` +
        product.soldCount +
        ` artículos vendidos</small>
                    </div>
                    <div>` +
        product.cost +
        ` ` +
        product.currency +
        `</div> 
                    <div>` +
        product.description +
        `</div>
                </div>
            </div>
        </div>
        </a>
        </div>
        `;
    }
  }
  document.getElementById("showPRODUCTS").innerHTML = htmlContentToAppend;
}

// Establezco los criterios para ordenar los productos
function sortProducts(criterio, array) {
  let result = [];
  if (criterio === ORDER_ASC_BY_COST) {
    result = array.sort(function (a, b) {
      if (a.cost < b.cost) {
        return -1;
      }
      if (a.cost > b.cost) {
        return 1;
      }
      return 0;
    });
  } else if (criterio === ORDER_DESC_BY_COST) {
    result = array.sort(function (a, b) {
      if (a.cost > b.cost) {
        return -1;
      }
      if (a.cost < b.cost) {
        return 1;
      }
      return 0;
    });
  } else if (criterio === ORDER_BY_PROD_REL) {
    result = array.sort(function (a, b) {
      let aSold = parseInt(a.soldCount);
      let bSold = parseInt(b.soldCount);

      if (aSold > bSold) {
        return -1;
      }
      if (aSold < bSold) {
        return 1;
      }
      return 0;
    });
  }

  return result;
}

// Ordena y muestra los productos ordenados según el criterio seleccionado
function sortAndShowProducts(sortCriterio, productsArray) {
  currentSortCriterio = sortCriterio;

  if (productsArray != undefined) {
    currentProductsArray = productsArray;
  }

  currentProductsArray = sortProducts(
    currentSortCriterio,
    currentProductsArray
  );

  //Muestro los productos ordenados según el criterio elegido
  showProductsList();
}

// Hasta acá definí las funciones

document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(PRODUCTS_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      sortAndShowProducts(ORDER_ASC_BY_COST, resultObj.data);
    }
  }); // Automáticamente se muestra por orden de menor a mayor

  document.getElementById("sortAsc").addEventListener("click", function () {
    sortAndShowProducts(ORDER_ASC_BY_COST);
  });

  document.getElementById("sortDesc").addEventListener("click", function () {
    sortAndShowProducts(ORDER_DESC_BY_COST);
  });

  document
    .getElementById("sortBySoldCount")
    .addEventListener("click", function () {
      sortAndShowProducts(ORDER_BY_PROD_REL);
    });

  document
    .getElementById("clearRangeFilter")
    .addEventListener("click", function () {
      document.getElementById("rangeFilterCostMin").value = "";
      document.getElementById("rangeFilterCostMax").value = "";

      minCost = undefined;
      maxCost = undefined;

      showProductsList();
    });

  document
    .getElementById("rangeFilterCost")
    .addEventListener("click", function () {
      //Obtengo el mínimo y máximo de los intervalos para filtrar por precio

      minCost = document.getElementById("rangeFilterCostMin").value;
      maxCost = document.getElementById("rangeFilterCostMax").value;

      if (minCost != undefined && minCost != "" && parseInt(minCost) >= 0) {
        minCost = parseInt(minCost);
      } else {
        minCost = undefined;
      }

      if (maxCost != undefined && maxCost != "" && parseInt(maxCost) >= 0) {
        maxCost = parseInt(maxCost);
      } else {
        maxCost = undefined;
      }

      showProductsList();
    });
});
