var dropdown = document.querySelector(".dropdown")
var dropArrow = document.querySelector(".drop-arrow");
var menu = document.querySelector(".dropdown-content");

var sortOptionsToggle = document.querySelector("#sort-option");
var sortMenu = document.querySelector(".drop-sort-options");

var filtroDataToggle = document.querySelector("#filtro-data");
var dataMenu = document.querySelector(".drop-data-cad")

var filtroSegToggle = document.querySelector("#filtro-seg");
var segMenu = document.querySelector(".drop-seg");

var filtroReposToggle = document.querySelector("#filtro-repos");
var reposMenu = document.querySelector(".drop-repos");


dropdown.addEventListener('click', function(){
    menu.classList.toggle("transition");
    menu.classList.toggle("margin-menu");
    dropArrow.classList.toggle("clicked-arrow"); 
});

sortOptionsToggle.addEventListener('click', function(){
    sortMenu.classList.toggle("transition");
    
});

filtroDataToggle.addEventListener('click', function(){
    dataMenu.classList.toggle("transition");
    
});

filtroSegToggle.addEventListener('click', function(){
    segMenu.classList.toggle("transition");
    
});

filtroReposToggle.addEventListener('click', function(){
    reposMenu.classList.toggle("transition");
    
});

