var app = angular.module('myApp', []);

app.controller('boardCtrl',['$scope',function($scope) {

	$scope.levels = [{name:"Easy",value:3},{name:"Medium",value:4},{name:"Hard",value:6}]
	if(localStorage.getItem('highScore')){
		$scope.highScore = localStorage.getItem('highScore');
	}else{
		$scope.highScore = 0;
	}
		
	//console.log(localStorage.getItem('highScore'));
	
	$scope.createMatrix = function(size){
		let matrix = [];
		for (var i = 0; i < size; i++) {
			matrix.push(0);
		}
		return matrix;

	};

	$scope.levelChanged = function(){
		$scope.score = 0;
		$scope.cells = [];
		$scope.levelValue = $scope.levels.filter(function(item){
			return item.name == $scope.selectedLevel;
		})[0].value;
		
		let matrix =  $scope.createMatrix($scope.levelValue);
		
		for (var i = 0; i < $scope.levelValue; i++) {
			$scope.cells.push(matrix);
		}
	};

	$scope.cellClicked = function(cellFocused){
		console.log("Success:",cellFocused);
		if(cellFocused){
			$scope.score++;
			if($scope.score > $scope.highScore){
				$scope.highScore = $scope.score;
				localStorage.setItem('highScore', $scope.highScore);
				$scope.congratsMessage = "Congratulations, New High score"
			}
		}
	};

	$scope.getRandomInt = function(max) {
	  return Math.floor(Math.random() * Math.floor(max));
	}

	$scope.startGame = function(){
		$scope.score = 0;
		$scope.intervalEvent = setInterval(function(){
			$scope.focusCell = $scope.getRandomInt($scope.levelValue);
			$scope.$apply();
		},1000);
	}

	$scope.stopGame = function(){
		console.log('stop')
		clearInterval($scope.intervalEvent);
	}


}]);