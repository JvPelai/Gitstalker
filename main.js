var errorMsg = document.querySelector(".no-results");

var fetchParams = {
    method: 'GET',
    headers: {
        Authorization: 'Basic ' + btoa(`25f7d66e3d5c4f500b94682c9c8822ae645e8aa0`),
    },
  };

fetch("https://api.github.com/rate_limit",fetchParams).then( response => {return response.json()}).then(json => {console.log(json)});

var lista = document.querySelector(".lista-usuarios");
var pagina = document.querySelectorAll('.pagina');

var filtros = "";

var tiposDeBusca = document.getElementsByName("tipo-busca");
var searchTypeParam;


for(tipo of tiposDeBusca){
    if(tipo.checked){
        console.log(typeof(tipo.value))
        searchTypeParam = tipo.value
    }
    tipo.addEventListener('change', function(){
        searchTypeParam = this.value;
        console.log(searchTypeParam);
    })
};

var sortCheckBox = document.querySelector("#sort-results");
var sortOptions = document.getElementsByName("sort-option");
var sortOrderOptions = document.getElementsByName("sort-order");
var sortParams = "";
var sortOption;
var sortOrder;

function changeSortParams(){
    if(sortCheckBox.checked){
        sortParams = sortOption + sortOrder
    }else{
        sortParams = "";
    }
    console.log(sortParams, sortOption, sortOrder);
};

for(option of sortOptions){
    if(option.checked){
        sortOption = option.value;
    }
    option.addEventListener('change', function(){
        sortOption = this.value;
        changeSortParams()
    })
};
for(option of sortOrderOptions){
    if(option.checked){
        sortOrder = option.value;
    }
    option.addEventListener('change', function(){
        sortOrder = this.value;
        changeSortParams()
    })
}

sortCheckBox.addEventListener("change", function(){ 
    if(this.checked){
        sortParams = sortOption + sortOrder
    }else{
        sortParams = "";
    }
    console.log(sortParams,sortOption, sortOrder);
});


pagina.forEach(p => {
    p.addEventListener("click", function(event){
        event.preventDefault();
        paginaUsuarios(p.textContent,searchTypeParam,filtros)
        
    });
});

var searchBar = document.querySelector("#main-search");
var searchBtn = document.querySelector(".search-btn");

/*searchBar.addEventListener("input",function(event){
    event.preventDefault();
    paginaUsuarios("1",searchTypeParam,filtros);
})*/

searchBtn.addEventListener("click", function(event){
    event.preventDefault();
    paginaUsuarios("1",searchTypeParam,filtros);
});

var submitBtn = document.querySelector("#filter-submit");

function getFormData(){
    var filtroDataCheck = document.getElementById("filtro-data");
    var filtroSegCheck = document.getElementById("filtro-seg");
    var filtroReposCheck = document.getElementById("filtro-repos");
    var maxDataCad = document.getElementById("max-data-cad").value;
    var minDataCad = document.getElementById("min-data-cad").value;
    console.log(filtroDataCheck.checked,minDataCad, maxDataCad.value);

    if(maxDataCad == "undefined" || maxDataCad == ""){
        var today = new Date();

        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

        maxDataCad = date;
    }



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

    var filters ={filtroDataCheck,filtroSegCheck,filtroReposCheck,minDataCad,maxDataCad,minSeguidores,maxSeguidores,minRepos,maxRepos};
    return filters
    
}

function buildQueryString(filters){
    var queryString = ""; 
    console.log(filters.maxRepos);
    if(filters.filtroDataCheck.checked){
        var dataCad = `+created:${filters.minDataCad}..${filters.maxDataCad}`;
        queryString += dataCad;
    }
    if(filters.filtroSegCheck.checked){
        var seguidores = `+followers:${filters.minSeguidores}..${filters.maxSeguidores}`;
        queryString += seguidores;
    }
    if(filters.filtroReposCheck.checked){
        var repos = `+repos:${filters.minRepos}..${filters.maxRepos}`;
        queryString += repos;
    }
    console.log(queryString)
    return queryString;
}

submitBtn.addEventListener("click",function(event){
    event.preventDefault();
    console.log(event.target);
    filtros = buildQueryString(getFormData());
    paginaUsuarios("1",searchTypeParam,filtros);
    console.log(filtros)
})


