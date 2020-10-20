
function listaUsuarios(page="1",type="User",filtros=""){
    return fetch(`https://api.github.com/search/users?q=${searchBar.value}+type:${type}+location:Piracicaba${filtros}&page=${page}`,fetchParams)
    .then( response => {
        return response.json();
    }).then( json => {
        console.log(json.total_count);
        if(json.total_count == 0){
            noResults();
            return
        }else{
            errorMsg.classList.add("no-results");
        }
        return json.items
    })
}

function noResults(){
    errorMsg.classList.remove("no-results")
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