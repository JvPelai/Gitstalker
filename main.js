
var errorMsg = document.querySelector(".error-msg");
var currentPage = "1";
var telaCarregamento = document.querySelector(".tela-carregamento");
var lista = document.querySelector(".lista-usuarios");
var pageList = document.querySelector(".paginas");
var orderCadBox = document.querySelector(".ordem-cadastro");
var sortOptions = document.getElementsByName("sort-option");
var sortOrderOptions = document.getElementsByName("sort-order");
var sortParams = "";
var sortOption;
var sortOrder;
var searchTypeParam;
var filtros = "";
var body = document.querySelector("body");

const accessToken = { token: "cc718bccd7ec1ff506035e49eae73806d9c3a6f4" };
const auth = accessToken.token;
const fetchParams = {
  method: "GET",
  headers: {
    Authorization: "Basic " + btoa(auth),
  },
};



var tiposDeBusca = document.getElementsByName("tipo-busca");
for (tipo of tiposDeBusca) {
  if (tipo.checked) {
    searchTypeParam = tipo.value;
  }
  tipo.addEventListener("change", function () {
    searchTypeParam = this.value;
  });
}

function changeSortParams() {
  sortParams = sortOption + sortOrder;   
}

for (option of sortOptions) {
  if (option.checked) {
    sortOption = option.value;
  }
  option.addEventListener("change", function () {
    sortOption = this.value;
    changeSortParams();
  });
}
for (option of sortOrderOptions) {
  if (option.checked) {
    sortOrder = option.value;
  }
  option.addEventListener("change", function () {
    sortOrder = this.value;
    changeSortParams();
  });
}



var searchBar = document.querySelector("#main-search");
var searchBtn = document.querySelector(".search-btn");

let timeout = null;

searchBar.addEventListener("input", function (event) {
  event.preventDefault();
  clearTimeout(timeout);
  timeout = setTimeout(function () {
    paginaUsuarios("1", searchTypeParam, filtros);
  }, 1000);
});

searchBtn.addEventListener("click", function (event) {
  event.preventDefault();
  paginaUsuarios("1", searchTypeParam, filtros);
});

var submitBtn = document.querySelector("#filter-submit");

function getFormData() {
  var filtroDataCheck = document.getElementById("filtro-data");
  var filtroSegCheck = document.getElementById("filtro-seg");
  var filtroReposCheck = document.getElementById("filtro-repos");
  var maxDataCad = document.getElementById("max-data-cad").value;
  var minDataCad = document.getElementById("min-data-cad").value;

  if (maxDataCad == "undefined" || maxDataCad == "") {
    var today = new Date();

    var dd = today.getDate();

    var mm = today.getMonth()+1;

    var yyyy = today.getFullYear();

    if(dd<10){
      dd='0'+dd;
    } 

    if(mm<10){
      mm='0'+mm;
    } 

    var date =
      yyyy +
      "-" +
      (mm + 1) +
      "-" +
      dd;

    maxDataCad = date;
  }

  if (filtroSegCheck.checked) {
    var minSeguidores = document.getElementById("min-seguidores").value;
    var maxSeguidores = document.getElementById("max-seguidores").value;
  }

  if (filtroReposCheck.checked) {
    var minRepos = document.getElementById("min-repos").value;
    var maxRepos = document.getElementById("max-repos").value;
  }

  var filters = {
    filtroDataCheck,
    filtroSegCheck,
    filtroReposCheck,
    minDataCad,
    maxDataCad,
    minSeguidores,
    maxSeguidores,
    minRepos,
    maxRepos,
  };
  return filters;
}

function buildQueryString(filters) {
  var queryString = "";
  if (filters.filtroDataCheck.checked) {
    var dataCad = `+created:${filters.minDataCad}..${filters.maxDataCad}`;
    queryString += dataCad;
  }
  if (filters.filtroSegCheck.checked) {
    if (filters.minSeguidores == "") {
      filters.minSeguidores = "0";
    }
    if (filters.maxSeguidores == "") {
      filters.maxSeguidores = "999999999";
    }
    var seguidores = `+followers:${filters.minSeguidores}..${filters.maxSeguidores}`;
    queryString += seguidores;
  }
  if (filters.filtroReposCheck.checked) {
    if (filters.minRepos == "") {
      filters.minRepos = "0";
    }
    if (filters.maxRepos == "") {
      filters.maxRepos = "999999999";
    }
    var repos = `+repos:${filters.minRepos}..${filters.maxRepos}`;
    queryString += repos;
  }
  console.log(queryString)
  return queryString;
}

submitBtn.addEventListener("click", function (event) {
  event.preventDefault();
  filtros = buildQueryString(getFormData());
  paginaUsuarios("1", searchTypeParam, filtros);
});
