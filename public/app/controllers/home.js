var homeCtr = angular.module('HomeModule', []);

homeCtr.controller('HomeController', ['$scope', '$http', function($scope, $http){
	
	$scope.profile = {firstName:'', lastName: '', email:'', password:''};

	$scope.returningUser = null;

	$scope.currentUser = null;

	$scope.init = function(){
		console.log('Home Controller INIT');
		$http({
			method:'GET',
			url: '/account/currentuser'
		}).then(function success(response){
			console.log(JSON.stringify(response.data));
		}, function error(response){
			console.log(JSON.stringify(response.data));
		});
	}

	$scope.register = function(){
		$http({
			method:'POST',
			url: '/account/register',
			data: $scope.profile
		}).then(function success(response){
			console.log(JSON.stringify(response.data));
			$scope.currentUser = response.data.results;
		}, function error(response){
			console.log(JSON.stringify(response.data));
		});
	}

	$scope.login = function(){
		$http({
			method: 'POST',
			url: '/account/login',
			data: $scope.returningUser
		}).then(function success(response){
			console.log(JSON.stringify(response.data));
			$scope.currentUser = response.data.results;
		}, function error(response){
			console.log(JSON.stringify(response.data));
		});
	}





}]);