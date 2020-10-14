var lista = document.querySelector(".lista-usuarios");
function listaUsuarios(){
    return fetch('https://api.github.com/users')
    .then( response => {
        return response.json()
    }).then( json => {
        console.log(json)
        return json
    })
}

listaUsuarios().then( list => {
    list.forEach(user => {
        var userNameItem = document.createElement('li');
        userNameItem.textContent = user.login;
        lista.appendChild(userNameItem);
    });
});