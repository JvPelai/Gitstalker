var fetchParams = {
    method: 'GET',
    headers: {
      Authorization: 'Basic ' + btoa("dc27a2a2db0ee9ec98a95e29f012db82ab9a0272"),
    },
  };

fetch("https://api.github.com/rate_limit",fetchParams).then( response => {return response.json()}).then(json => {console.log(json)})

var lista = document.querySelector(".lista-usuarios");
var pagina = document.querySelectorAll('.pagina');

var tiposDeBusca = document.getElementsByName("tipo-busca");
var searchTypeParam;

var filtros = ""

for(tipo of tiposDeBusca){
    if(tipo.checked){
        console.log(typeof(tipo.value))
        searchTypeParam = tipo.value
    }
    tipo.addEventListener('change', function(){
        searchTypeParam = this.value;
        console.log(searchTypeParam);
    })
}

pagina.forEach(p => {
    p.addEventListener("click", function(event){
        event.preventDefault();
        paginaUsuarios(p.textContent,searchTypeParam,filtros)
        
    });
});

var searchBar = document.querySelector("#main-search");
var searchBtn = document.querySelector(".search-btn");

searchBar.addEventListener("input",function(event){
    event.preventDefault();
    paginaUsuarios("1",searchTypeParam,filtros);
})

searchBtn.addEventListener("click", function(event){
    event.preventDefault();
    paginaUsuarios("1",searchTypeParam,filtros);
});

var submitBtn = document.querySelector("#filter-submit");

function getFormData(){
    var filtroDataCheck = document.getElementById("filtro-data");
    var filtroSegCheck = document.getElementById("filtro-seg");
    var filtroReposCheck = document.getElementById("filtro-repos");

    if(filtroDataCheck.checked){
        var minDataCad = document.getElementById("min-data-cad").value;
        var maxDataCad = document.getElementById("max-data-cad").value;
        console.log(filtroDataCheck.checked,minDataCad, maxDataCad);
    };

    if(filtroSegCheck.checked){
        var minSeguidores = document.getElementById("min-seguidores").value;
        var maxSeguidores = document.getElementById("max-seguidores").value;
        console.log(filtroSegCheck.checked, minSeguidores, maxSeguidores);
    };

    if(filtroReposCheck.checked){
        var minRepos = document.getElementById("min-repos").value;
        var maxRepos = document.getElementById("max-repos").value;
        console.log(filtroReposCheck.checked, minRepos, maxRepos);
    }

    var filters ={minDataCad,maxDataCad,minSeguidores,maxSeguidores,minRepos,maxRepos};
    return filters
    
}

function buildQueryString(filters){
    console.log(filters.maxRepos);
    var dataCad = `+created:${filters.minDataCad}..${filters.maxDataCad}`;
    var seguidores = `+followers:${filters.minSeguidores}..${filters.maxSeguidores}`;
    var repos = `+repos:${filters.minRepos}..${filters.maxRepos}`;
    var queryString = dataCad + seguidores + repos;
    console.log(queryString)
    return queryString;
}

submitBtn.addEventListener("click",function(event){
    event.preventDefault();
    console.log(event.target);
    filtros = buildQueryString(getFormData());
    console.log(filtros)
})


