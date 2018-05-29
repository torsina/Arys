// create the module and name it scotchApp
var app = angular.module('app', ['ngRoute']);

// configure our routes
app.config(function($routeProvider) {
    $routeProvider

    // route for the home page
        .when('/', {
            templateUrl : 'pages/home.html',
            controller  : 'mainController'
        })

        // route for the about page
        .when('/about', {
            templateUrl : 'pages/home.html',
            controller  : 'aboutController'
        })

        // route for the contact page
        .when('/contact', {
            templateUrl : 'pages/home.html',
            controller  : 'contactController'
        })
        .when('/servers',{
            templateUrl : 'pages/servers.html' ,
            controller : 'serversController'
        })

        .when('/server',{
            templateUrl : 'pages/server.html' ,
            controller : 'serverController'
        });
});

// create the controller and inject Angular's $scope
app.controller('mainController', function($scope) {
    // create a message to display in our view
    $scope.message = 'Everyone come and see how good I look!';
});

app.controller('aboutController', function($scope) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://lovalhosy:5000/API/", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    var response = JSON.parse(xhttp.responseText);
    $scope.message = 'Look! I am an about page.';
});

app.controller('contactController', function($scope) {
    $scope.message = 'Contact us! JK. This is just a demo.';
});

app.controller('serverController', function($scope) {
    $scope.money = '200';
    var data = {
        guildID: "307230041748668426",
        guildName: "Arys home",
        iconURL: "https://cdn.discordapp.com/icons/81384788765712384/a8eccf1628b1e739d535a813f279e905.jpg",
        currencyName: "credits",
        edits: {
            perm: false,
            currency: true,
            shop: false
        }
    };
    document.getElementById('nom_serveur').innerHTML= guildName;
})


app.controller('serversController', function($scope) {
    $scope.money = '200';
})

