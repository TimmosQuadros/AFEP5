/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var app = angular.module('UserApp', ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider
            .when("/details", {
                templateUrl: "views/details.html",
                controller: "UserController"
            })
            .otherwise({
                redirectTo: "/"
            });
});

var users = [];
var user;
app.controller("UserController", function ($http, $routeParams) {
    var self = this;
    
    
    self.setSelectedUserForDetails = function(user){
        self.user = user;
    };
    
    if (users.length === 0) {
        $http.get("data/data.json").success(function (data) {
            users = data.users;
            self.users = users;
        });
    } else { //We used the cache property on the http request instead
        self.users = users;
    }
    if (users !== null) {
        console.log("Adding user: " + $routeParams.id);
        self.user = users[$routeParams.id];
    }
});

