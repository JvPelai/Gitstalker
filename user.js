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
    });
}
userProfile(username);


