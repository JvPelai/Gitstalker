var queryString = window.location.search;

var paramsSearch = new URLSearchParams(queryString);

var username = paramsSearch.get("username");

var profileSection = document.querySelector("#user-profile");

function userData(name){
    return fetch(`https://api.github.com/users/${name}`)
    .then( response => {
        return response.json();
    }).then( json => {
        return json
    })
};

function createUserPage(user){
    var avatar = document.createElement("div");
    avatar.innerHTML = `<img id="profile-pic" src="${user.avatar}">`;
    profileSection.appendChild(avatar);

    var name = document.createElement('h2');
    name.textContent = user.name;
    profileSection.appendChild(name);

    var bio = document.createElement('p');
    bio.textContent = user.bio;
    profileSection.appendChild(bio);

    var company = document.createElement("h3");
    company.textContent = user.company;
    profileSection.appendChild(company);

    var email = document.createElement('p');
    email.textContent = user.email;
    profileSection.appendChild(email);

    var followers = document.createElement('p');
    followers.textContent = user.followers;
    profileSection.appendChild(followers)

    var following = document.createElement('p');
    following.textContent = user.following;
    profileSection.appendChild(following);

    var repos = document.createElement('p');
    repos.textContent = user.public_repos;
    profileSection.appendChild(repos);

    var location = document.createElement('p');
    location.textContent = user.location;
    profileSection.appendChild(location);

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


