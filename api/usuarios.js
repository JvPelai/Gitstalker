var lista = document.querySelector(".lista-usuarios");
var pagina = document.querySelectorAll('a');


function listaUsuarios(page){
    return fetch(`https://api.github.com/search/users?q=location:Piracicaba&page=${page}`)
    .then( response => {
        return response.json();
    }).then( json => {
        return json.items
    })
}
pagina.forEach(p => {
    p.addEventListener("click", function(event){
        event.preventDefault();
        paginaUsuarios(p.textContent)
    });
});

function paginaUsuarios(page){
    lista.innerHTML = ""
    listaUsuarios(page).then( list => {
        list.forEach(user => {
            var userNameItem = document.createElement('li');
            userNameItem.textContent = user.login;
            lista.appendChild(userNameItem);
        });
    });
}

function userData(name){
    return fetch(`https://api.github.com/users/${name}`)
    .then( response => {
        console.log(response)
        return response.json;
    }).then( json => {
        return json
    })
}