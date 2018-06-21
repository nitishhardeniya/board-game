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
		let levelValue = $scope.levels.filter(function(item){
			return item.name == $scope.selectedLevel;
		})[0].value;
		
		let matrix =  $scope.createMatrix(levelValue);
		
		for (var i = 0; i < levelValue; i++) {
			$scope.cells.push(matrix);
		}
		console.log($scope.cells);
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
		(function(){
			setInterval(function(){
				$scope.focusCell = $scope.getRandomInt(3);
				console.log($scope.focusCell);
				$scope.$apply();
			},1000);
		})();
	}

	$scope.stopGame = function(){
		clearInterval()
	}


}]);