var app = angular.module('tinhthue', []);

app.controller('survey',function($scope,$http){
	$scope.question_list = [];
	$scope.current_pos = 0;
	$scope.max_pos = 0;
	$http.get('assets/data/question_list.json')
		.success(function(data){
			$scope.question_list = data;
			$scope.max_pos = Object.keys($scope.question_list).length;
		})
		.error(function(data){
			swal('Can not get data');
		});
	$scope.next_question = function(){
		if($scope.current_pos+1==Object.keys($scope.question_list)){
			$scope.submit();
		}
		$scope.current_pos = $scope.current_pos+1<Object.keys($scope.question_list).length?$scope.current_pos+1:Object.keys($scope.question_list).length;
	};
	$scope.back_question = function(){
		$scope.current_pos = $scope.current_pos-1>=0?$scope.current_pos-1:0;
		console.log($scope.current_pos);
	};
	$scope.submit = function(){

	}
});