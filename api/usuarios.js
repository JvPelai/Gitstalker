

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
    errorMsg.classList.remove("no-results");
    telaCarregamento.classList.add("hidden-order");
}


async function paginaUsuarios(page,type="User",filtros=""){
    lista.innerHTML = "";
    currentPage = page;
    telaCarregamento.classList.remove("hidden-order");
    if(!sortCheckBox.checked){
        await createUserArray().then(array => {
            for(let i = 0; i < 20; i++){
                if(lista.childElementCount == array.length){
                    return
                };
                if(array.length == 1){
                    var userCard = createUserCard(array[0]);
                    lista.appendChild(userCard);
                    return
                };
                var index = i + ((parseInt(page) -1) * 20);
                var userCard = createUserCard(array[index]);
                lista.appendChild(userCard); 
            };
            
        }); 
    }else{
        await listaUsuarios(page,type,filtros).then( list => {
            list.forEach(user => {
                var userCard = createUserCard(user);
                lista.appendChild(userCard);      
            });
        });
    }
    telaCarregamento.classList.add("hidden-order");
};       





lista.addEventListener("scroll",async function(){
    if(parseInt(currentPage) > pageList.childElementCount){
        return
    };
    if(lista.scrollHeight == (lista.offsetHeight + lista.scrollTop)){
        if(!sortCheckBox.checked){
            await createUserArray().then(array => {
                currentPage = String(parseInt(currentPage) + 1);
                for(let i = 0; i < 20; i++){
                    if(lista.childElementCount == array.length){
                        return
                    }
                    var userCard = createUserCard(array[lista.childElementCount]);
                    lista.appendChild(userCard); 
                };
            }) 
        }else{
            listaUsuarios(parseInt(currentPage)+1,searchTypeParam,filtros).then( list => {
                list.forEach(user => {
                    var userCard = createUserCard(user);
                    lista.appendChild(userCard);
                });
            });
        }
    };

});


function createUserCard(user){
    var card = document.createElement("div");
    card.classList.add('user-card')
    var avatar = document.createElement("div");
    var name = document.createElement("div");
    avatar.innerHTML = `<img src="${user.avatar_url}">`
    name.innerHTML = `<a href="Gitstalker/user.html?username=${user.login}">${user.login}</a>`;
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
        return json
    })
};



async function createUserArray(){
    var arr = [];
    if(!localStorage.getItem("userObjectArray")){
        for(let i = 1; i <= pageList.children.length + 1 ; i++){
            await listaUsuarios(String(i),searchTypeParam,filtros).then(list => {
                if(list.length == 1){
                    arr.push(list[0]);
                    return
                };
                list.forEach( user => {
                    userData(user.login).then( userProf => {
                        arr.push(userProf);
                    });
                });
            });
        };
        localStorage.setItem("userObjectArray",JSON.stringify(arr));
        currentPage = "1";
        if(arr.length <= 1){
            return arr
        }else{
            return arr.sort(ordenaData)
        };
    }else{
        return JSON.parse(localStorage.getItem("userObjectArray")).sort(ordenaData)
    }; 
    
};


paginaUsuarios(currentPage);

//JSON.parse(localStorage.getItem("userObjectArray")).sort(ordenaData).find(user => user.login == "JvPelai")
