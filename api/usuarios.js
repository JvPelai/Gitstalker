function listaUsuarios(page = "1", type = "User", filtros = "") {
  currentPage = page;
  return (
    fetch(
      `https://api.github.com/search/users?q=${searchBar.value}+type:${type}+location:Piracicaba${filtros}${sortParams}&per_page=27&page=${page}`,
      fetchParams
    )
      .then((response) => {
        return response.json();
      })
      // TODO: a responsabilidade dessa função é retornar a lista, quem chama ela, deve saber o que fazer caso não receba dados
      .then((json) => {
        return json.items;
      })
  );
}

function noResults() {
  errorMsg.classList.remove("hidden-order");
  telaCarregamento.classList.add("hidden-order");
}

async function paginaUsuarios(page, type = "User", filtros = "") {
  lista.innerHTML = "";
  errorMsg.classList.add("hidden-order");
  currentPage = page;
  telaCarregamento.classList.remove("hidden-order");
    // HACK: nunca usar await e then juntos isso não é uma boa pratica. Se possivel use sempre async/await.
    // Veja no exemplo abaixo, como o codigo fica até mais organizado.
  const list = await listaUsuarios(page, type, filtros);
  if(list.length == 0){
    noResults();
  };
  list.forEach((user) => {
  var userCard = createUserCard(user);
  lista.appendChild(userCard);
  });
  
  telaCarregamento.classList.add("hidden-order");
}

window.addEventListener("scroll", async function () {
  if (window.scrollY + window.innerHeight >= body.scrollHeight-1) {
      const list = await listaUsuarios(
        parseInt(currentPage) + 1,
        searchTypeParam,
        filtros
      );
      list.forEach((user) => {
        var userCard = createUserCard(user);
        lista.appendChild(userCard);
      });
    }
});

function createUserCard(user) {
  var card = document.createElement("div");
  card.classList.add("user-card");
  var avatar = document.createElement("div");
  var name = document.createElement("div");
  avatar.innerHTML = `<img src="${user.avatar_url}">`;
  name.innerHTML = `<a href="user.html?username=${user.login}">${user.login}</a>`;
  card.appendChild(avatar);
  card.appendChild(name);
  return card;
}


function ordenaData(a, b) {
  if (ordemCadastro.value == "mais-antigos") {
    return a.created_at < b.created_at
      ? -1
      : a.created_at > b.created_at
      ? 1
      : 0;
  } else {
    return b.created_at < a.created_at
      ? -1
      : b.created_at > a.created_at
      ? 1
      : 0;
  }
}

function userData(name) {
  return fetch(`https://api.github.com/users/${name}`, fetchParams)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      return json;
    });
}



paginaUsuarios(currentPage);

//JSON.parse(localStorage.getItem("userObjectArray")).sort(ordenaData).find(user => user.login == "JvPelai")
