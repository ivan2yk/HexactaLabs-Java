booksApp.controller('viewController', function($scope, $http, $rootScope, $sessionStorage ){

	$rootScope.loggedIn = false;
	$rootScope.loggedIn = $sessionStorage.user !== undefined;
	if( $sessionStorage.user !== undefined){
		$rootScope.usuario = "Bienvenido: " + JSON.parse($sessionStorage.user).username + "!"; 
	}
/*	$scope.mostrarLogin = function(){
		return !sessionStorage.loggedIn;
	};

	$scope.mostrarUser = function(){
		return sessionStorage.loggedIn;
	};

	$scope.getNombreUsuario = function(){
		if(sessionStorage.loggedIn){
			return $scope.user = JSON.parse(sessionStorage.user).username; 
		}	
	};*/

	$scope.desloguearse = function(){
		$rootScope.loggedIn = false;
		$rootScope.usuario = undefined; 
		delete $sessionStorage.user;
	};

	$scope.validateUser = function(user){
		var toEncode = user.username + ":" + user.password;
		var encoded = btoa(toEncode);
		$http({
			method : 'GET',
			url: '/Tpl/rest/login',
			headers : {'Authorization' : 'Basic ' + encoded, 'Accept' : 'application/json'}
		}).success(function(data, status, headers, config){
			if(status == 200){
				//TODO:
				$sessionStorage.user = JSON.stringify(data);
				//$sessionStorage.loggedIn = true;
				$scope.usuario = "Bienvenido: " + JSON.parse($sessionStorage.user).username + "!"; 
				$rootScope.loggedIn = true;
				
			}
		}).error(function(data, status, headers, config){
			alert("El usuario " + user.username + " no esta registrado o escribio mal la password.");
			$scope.user.password="";
		});
	};

});

