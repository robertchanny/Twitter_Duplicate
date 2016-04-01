var homeCtr = angular.module('HomeModule', []);

homeCtr.controller('HomeController', ['$scope', '$http', function($scope, $http){
	
	$scope.profile = {firstName:'', lastName: '', email:'', password:''};
	$scope.returningUser = null;
	$scope.currentUser = null;
	$scope.following = [];
	$scope.users = null;

	$scope.init = function(){
		console.log('Home Controller INIT');
		//Get the current user
		getCurrentUser();
	}

	$scope.register = function(){
		$http({
			method:'POST',
			url: '/account/register',
			data: $scope.profile
		}).then(function success(response){
			console.log(JSON.stringify(response.data));
			$scope.currentUser = response.data.results;
			getUsers();
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
			getUsers();
		}, function error(response){
			console.log(JSON.stringify(response.data));
		});
	}

	$scope.update = function(){
		console.log(JSON.stringify($scope.currentUser));
		$http({
			method: 'PUT',
			url: '/account/'+ $scope.currentUser.id,
			data: $scope.currentUser
		}).then(function success(response){
			console.log(JSON.stringify(response.data));
		}, function error(response){
			console.log(JSON.stringify(response.data));
		});
	}

	$scope.follow = function(userId){
		$scope.currentUser.following.push(userId);
		$scope.update();
		var index = 0;
		for (var i=0; i<$scope.users.length; i++){
			if ($scope.users[i].id == userId){
				index = i;
				break;
			}
		}
		$scope.following.push($scope.users[index]);
		$scope.users.splice(index, 1);
	}

	$scope.unfollow = function(user){
		$scope.users.push(user);
		$scope.following.splice($scope.following.indexOf(user),1);
		$scope.currentUser.following.splice($scope.currentUser.following.indexOf(user.id),1);
		$scope.update();
	}


	getCurrentUser = function(){
		$http({
			method:'GET',
			url: '/account/currentuser'
		}).then(function success(response){
			//If there's no current user, stop here
			if (response.data.confirmation != 'success')
				return;
			//Assign the current user
			$scope.currentUser = response.data.results;
			//Get the list of users
			getUsers();
		}, function error(response){
			console.log(JSON.stringify(response.data));
		});
	}

	getUsers = function(){
		$http({
				method: 'GET',
				url: '/api/profile'
			}).then(function success(response){
				//Assign the list of users
				$scope.users = response.data.results; 
				//Get the index of the current user in the users array
				var index = $scope.users.indexOf($scope.currentUser);
				//Splice the current user out
				$scope.users.splice(index,1);
				//Loop through the currrent user's following array
				for (var i=0; i<$scope.currentUser.following.length; i++){
					//Get each follower
					getFollower($scope.currentUser.following[i]);
				}
			}, function error(response){
				console.log(JSON.stringify(response.data));
			});
	}

	getFollower = function(userId){
		$http({
			method: 'GET',
			url: '/api/profile/'+userId
		}).then(function success(response){
			//Push the follower's profile into following
			$scope.following.push(response.data.results);
			//Find their index in the user's array
			var index = $scope.users.indexOf(response.data.results);
			//Splice them out of the users array
			$scope.users.splice(index, 1);
		}, function error(response){
			console.log(JSON.stringify(response.data));
		});
	}

}]);