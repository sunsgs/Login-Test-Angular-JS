'use strict';
 
angular.module('myApp.home', ['ngRoute','firebase']) 
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'home/home.html',
        controller: 'LoginCtrl'
    });
}])
 
.controller('LoginCtrl', ['$scope','$firebaseSimpleLogin',function($scope,$firebaseSimpleLogin) {
	var firebaseObj = new Firebase("https://lenio-test.firebaseio.com");

	var loginObj = $firebaseSimpleLogin(firebaseObj);

	$scope.LogIn = function(event) {

	    event.preventDefault();
	    
    	var username = $scope.user.email;
    	var password = $scope.user.password;

    	
    	loginObj.$login('password', {
            email: username,
            password: password
        })
        .then(function(user) {
            // Success callback
            var element = document.getElementById("response");
    		var angElement = angular.element(element);
            angElement.html('LOGIN OK<br><pre>'+JSON.stringify(user, null, 4) +'</pre>');
        }, function(error) {
            // Failure callback
            var element = document.getElementById("response");
            var angElement = angular.element(element);
            angElement.text('Authentication failure');
        });
    }

}]);