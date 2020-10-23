var userObjectArray =[];

function listaUsuarios(page="1",type="User",filtros=""){
    currentPage = page;
    return fetch(`https://api.github.com/search/users?q=${searchBar.value}+type:${type}+location:Piracicaba${filtros}${sortParams}&per_page=20&page=${page}`,fetchParams)
    .then( response => {
        return response.json();
    }).then( json => {
        if(json.total_count == 0){
            noResults();
            return
        }else{
            errorMsg.classList.add("no-results");
            paginate(json.total_count);
        }
        return json.items;
    })
}

function noResults(){
    errorMsg.classList.remove("no-results")
}


function paginaUsuarios(page,type="User",filtros=""){
    lista.innerHTML = "";
        listaUsuarios(page,type,filtros).then( list => {
            list.forEach(user => {
                userData(user.login).then( userProf => {
                    console.log(userProf.created_at);
                    var userCard = createUserCard(userProf);
                    lista.appendChild(userCard);
                });
                
            });
        });
    };       





lista.addEventListener("scroll",function(){
    if(lista.scrollHeight == (lista.offsetHeight + lista.scrollTop)){
        console.log("Hora de carregar mais usuarios!");
    
            listaUsuarios(parseInt(currentPage)+1,searchTypeParam,filtros).then( list => {
                list.forEach(user => {
                    userData(user.login).then( userProf => {
                        console.log(userProf.created_at);
                        var userCard = createUserCard(userProf);
                        lista.appendChild(userCard);
                    });
                });
            });
        };

    });


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



function orderByCreation(){
   
}

function ordenaData(a,b){
    if(ordemCadastro.value == "mais-antigos"){
        return a.created_at < b.created_at ? -1 : a.created_at > b.created_at ? 1 : 0;
    }else{
        return b.created_at < a.created_at ? -1 : b.created_at > a.created_at ? 1 : 0;
    }    
};

function userData(name){
    return fetch(`https://api.github.com/users/${name}`,fetchParams)
    .then( response => {
        return response.json();
    }).then( json => {
        //console.log(json)
        return json
    })
};



function createUserArray(){
    userObjectArray = [];
    for(let i = 1; i <= pageList.children.length; i++){
        listaUsuarios(String(i),searchTypeParam,filtros).then( list => {
            list.forEach(user => {
                userData(user.login).then( userProf => {
                    userObjectArray.push(userProf);
                    userObjectArray.sort(ordenaData);
                });
            })
        });
    }
}



paginaUsuarios(currentPage);

/*
var xhr = new XMLHttpRequest();
                xhr.open("GET",user.url);
                
                xhr.addEventListener("load", function(){
                    var resposta = xhr.responseText;
                    
                    var userObject = JSON.parse(resposta);
                    
                    userObjectArray.push(userObject);
                    userObjectArray.sort(ordenaData)
                    
                });
                
                xhr.send();
*/ 