var queryString = window.location.search;

var paramsSearch = new URLSearchParams(queryString);

var username = paramsSearch.get("username");

var profileSection = document.querySelector("#user-profile");

function userData(name){
    return fetch(`https://api.github.com/users/${name}`)
    .then( response => {
        return response.json();
    }).then( json => {
        console.log(json)
        return json
    })
};

function createUserPage(user){
    var userInfo = document.createElement("div");
    userInfo.classList.add("user-info");

    var avatar = document.createElement("div");
    avatar.innerHTML = `<img id="profile-pic" src="${user.avatar}"> <h2>${user.name}</h2>`;
    profileSection.appendChild(avatar);


    var bio = document.createElement('p');
    bio.textContent = user.bio;
    userInfo.appendChild(bio);

    if(user.company != null){
        var company = document.createElement("p");
        company.innerHTML = `<img src="images/usr-company.png">  ${user.company}`;
        userInfo.appendChild(company);
    }

    if(user.email != null){
        var email = document.createElement('p');
        email.innerHTML = `<img src="images/usr-email.png">  ${user.email}`;
        userInfo.appendChild(email);
    }

    var followers = document.createElement('p');
    followers.innerHTML = `<img src="images/usr-followers.png"> Seguidores: ${user.followers} |  Seguindo: ${user.following}`;
    userInfo.appendChild(followers)

    var repos = document.createElement('p');
    repos.innerHTML = `<img src="images/usr-repos.png"> Repositórios: ${user.repos}`;
    userInfo.appendChild(repos);

    var location = document.createElement('p');
    location.innerHTML = `<img src="images/usr-location.png">  ${user.location}`;
    userInfo.appendChild(location);

    profileSection.appendChild(userInfo);

}

function userProfile(username){
    profileSection.innerHTML = "";
    userData(username).then( obj => {
        var name = obj.name;
        var avatar = obj.avatar_url;
        var bio = obj.bio;
        var company = obj.company;
        var email = obj.email;
        var followers = obj.followers;
        var following = obj.following;
        var repos = obj.public_repos;
        var location = obj.location;
        var user = {name,avatar,bio,company,email,followers,following,repos,location};
        console.log(user);
        createUserPage(user);
    });
}
userProfile(username);


