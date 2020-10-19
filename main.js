

var lista = document.querySelector(".lista-usuarios");
var pagina = document.querySelectorAll('.pagina');

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
}

pagina.forEach(p => {
    p.addEventListener("click", function(event){
        event.preventDefault();
        paginaUsuarios(p.textContent,searchTypeParam)
        
    });
});

var searchBar = document.querySelector("#main-search");
var searchBtn = document.querySelector(".search-btn");

searchBtn.addEventListener("click", function(event){
    event.preventDefault();
    paginaUsuarios("1",searchTypeParam);
})



