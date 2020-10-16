
var lista = document.querySelector(".lista-usuarios");
var pagina = document.querySelectorAll('.pagina');

pagina.forEach(p => {
    p.addEventListener("click", function(event){
        event.preventDefault();
        paginaUsuarios(p.textContent)
    });
});

