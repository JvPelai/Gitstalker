var lista = document.querySelector(".lista-usuarios");
var pagina = document.querySelectorAll('a');


function listaUsuarios(page){
    return fetch(`https://api.github.com/search/users?q=location:Piracicaba&page=${page}`)
    .then( response => {
        console.log(response)
        return response.json();
    }).then( json => {
        console.log(json)
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
            var userCard = createUserCard(user);
            lista.appendChild(userCard);
        });
    });
}

function createUserCard(user){
    var card = document.createElement("div");
    card.classList.add('user-card')
    var avatar = document.createElement("div");
    var name = document.createElement("div");
    avatar.innerHTML = `<img src="${user.avatar_url}">`
    name.innerHTML = `[<a href="/user.html?username=${user.login}">${user.login}</a>]`;
    card.appendChild(avatar);
    card.appendChild(name);
    return card
}

