
var lista = document.querySelector(".lista-usuarios");
var pagina = document.querySelectorAll('.pagina');

pagina.forEach(p => {
    p.addEventListener("click", function(event){
        event.preventDefault();
        paginaUsuarios(p.textContent)
        
    });
});

var searchBar = document.querySelector("#main-search");
var searchBtn = document.querySelector(".search-btn");

searchBtn.addEventListener("click", function(event){
    event.preventDefault();
    paginaUsuarios("1")
})
