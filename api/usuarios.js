
function listaUsuarios(page="1",type="User",filtros=""){
    return fetch(`https://api.github.com/search/users?q=${searchBar.value}+type:${type}+location:Piracicaba${filtros}&page=${page}`)
    .then( response => {
        return response.json();
    }).then( json => {
        return json.items
    })
}

function paginaUsuarios(page,type="User",filtros=""){
    lista.innerHTML = ""
    listaUsuarios(page,type,filtros).then( list => {
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
    name.innerHTML = `<a href="/user.html?username=${user.login}">${user.login}</a>`;
    card.appendChild(avatar);
    card.appendChild(name);
    return card
}

paginaUsuarios("1");