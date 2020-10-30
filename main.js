var errorMsg = document.querySelector(".no-results");
var currentPage = "1";
var telaCarregamento = document.querySelector(".tela-carregamento")

var accessToken = {token: "50aca22dda5474d5a46ca31ab0831ad883488aab"};
var auth = accessToken.token;

var fetchParams = {
    method: 'GET',
    headers: {
        Authorization: 'Basic ' + btoa(auth),
        
    },
  };



fetch("https://api.github.com/rate_limit",fetchParams).then( response => {return response.json()}).then(json => {console.log(json)});

var lista = document.querySelector(".lista-usuarios");
var pageList = document.querySelector(".paginas");



function paginate(totalCount){
    var pags = Math.round(totalCount / 20);
    pageList.innerHTML = "";
    for(let i = 1; i <= pags; i++){
        let pag = document.createElement("li");
        pag.innerHTML = `<a class="pagina">${i}</a>`;
        pageList.appendChild(pag);
    }
    var pagina = document.querySelectorAll('.pagina');
    pagina.forEach(p => {
        p.addEventListener("click", function(event){
            event.preventDefault();
            paginaUsuarios(p.textContent,searchTypeParam,filtros)
            
        });
    });
}
var filtros = "";

var tiposDeBusca = document.getElementsByName("tipo-busca");
var searchTypeParam;


for(tipo of tiposDeBusca){
    if(tipo.checked){
        searchTypeParam = tipo.value
    }
    tipo.addEventListener('change', function(){
        searchTypeParam = this.value;
    })
};

var orderCadBox = document.querySelector(".ordem-cadastro");
var sortBox = document.querySelector("#sort-box")
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
        sortBox.classList.remove("hidden-order");
        orderCadBox.classList.add("hidden-order");
    }else{
        sortParams = "";
        sortBox.classList.add("hidden-order");
        orderCadBox.classList.remove("hidden-order");
    }
});



//Ordem de cadastro
var ordemCadastro = document.querySelector("#ordem-cadastro");


var searchBar = document.querySelector("#main-search");
var searchBtn = document.querySelector(".search-btn");

let timeout = null;

searchBar.addEventListener("input", function(event){
    event.preventDefault();
    clearTimeout(timeout);
    timeout = setTimeout(function(){
        localStorage.clear();
        paginaUsuarios("1",searchTypeParam,filtros);
    },1000);    
});

searchBtn.addEventListener("click", function(event){
    event.preventDefault();
    localStorage.clear();
    paginaUsuarios("1",searchTypeParam,filtros);
});

var submitBtn = document.querySelector("#filter-submit");

function getFormData(){
    var filtroDataCheck = document.getElementById("filtro-data");
    var filtroSegCheck = document.getElementById("filtro-seg");
    var filtroReposCheck = document.getElementById("filtro-repos");
    var maxDataCad = document.getElementById("max-data-cad").value;
    var minDataCad = document.getElementById("min-data-cad").value;

    if(maxDataCad == "undefined" || maxDataCad == ""){
        var today = new Date();

        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

        maxDataCad = date;
    }



    if(filtroSegCheck.checked){
        var minSeguidores = document.getElementById("min-seguidores").value;
        var maxSeguidores = document.getElementById("max-seguidores").value;
    };

    if(filtroReposCheck.checked){
        var minRepos = document.getElementById("min-repos").value;
        var maxRepos = document.getElementById("max-repos").value;
        
    }

    var filters ={filtroDataCheck,filtroSegCheck,filtroReposCheck,minDataCad,maxDataCad,minSeguidores,maxSeguidores,minRepos,maxRepos};
    return filters
    
}

function buildQueryString(filters){
    var queryString = ""; 
    if(filters.filtroDataCheck.checked){
        var dataCad = `+created:${filters.minDataCad}..${filters.maxDataCad}`;
        queryString += dataCad;
    }
    if(filters.filtroSegCheck.checked){
        if(filters.minSeguidores == ""){
            filters.minSeguidores = "0"
        };
        if(filters.maxSeguidores == ""){
            filters.maxSeguidores = "999999999"
        };
        var seguidores = `+followers:${filters.minSeguidores}..${filters.maxSeguidores}`;
        queryString += seguidores;
    }
    if(filters.filtroReposCheck.checked){
        if(filters.minRepos == ""){
            filters.minRepos = "0"
        };
        if(filters.maxRepos == ""){
            filters.maxRepos = "999999999"
        };
        var repos = `+repos:${filters.minRepos}..${filters.maxRepos}`;
        queryString += repos;
    }
    return queryString;
}

submitBtn.addEventListener("click",function(event){
    event.preventDefault();
    if(!sortCheckBox.checked){
        localStorage.clear();
    }
    filtros = buildQueryString(getFormData());
    paginaUsuarios("1",searchTypeParam,filtros);  
})


