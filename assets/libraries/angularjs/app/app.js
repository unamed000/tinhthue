var app = angular.module('tinhthue', []);

app.controller('survey',function($scope,$http){
	/* ----- config ----- */
	$scope.insurance_config = {
		'health' 		: 1.5,
		'unemployment'  : 1,
		'social'		: 8
	};
	$scope.income_tax_config = {
		'5000000' 	: 5,
		'10000000' 	: 10,
		'18000000'	: 15,
		'32000000'	: 20,
		'52000000'	: 25,
		'80000000'	: 30,
		'9999999999999': 35 
	};
	$scope.dependence_config 	= 3600000;
	$scope.self_dependenec 		= 9000000;
	/* ---- end of config ----*/
	$scope.init = function(){
		$scope.question_list = [];
		$scope.current_pos = 0;
		$scope.max_pos = 0;
		$scope.show_result = false;
		$scope.resullt = {};
		$http.get('assets/data/question_list.json')
			.success(function(data){
				data['salary_type'].result = 'gross';
				data['salary_amount'].result = 0;
				data['salary_dependence'].result = 0;
				data['salary_insurance'].result = {
					'social' : true,
					'health' : true,
					'unemployment' : true,
				};
				$scope.question_list = data;
				$scope.max_pos = Object.keys($scope.question_list).length;
			})
			.error(function(data){
				swal('Can not get data');
			});
	};

	$scope.next_question = function(){
		if($scope.current_pos+1==Object.keys($scope.question_list).length){
			console.log('zo');
			$scope.submit();
			return;
		}
		$scope.current_pos = $scope.current_pos+1<Object.keys($scope.question_list).length?$scope.current_pos+1:Object.keys($scope.question_list).length;
	};
	$scope.back_question = function(){
		$scope.current_pos = $scope.current_pos-1>=0?$scope.current_pos-1:0;
	};
	$scope.submit = function(){
		$scope.show_result = true;
		var question_list = $scope.question_list;
		var salary_amount 		= question_list['salary_amount']['result'],
			salary_type			= question_list['salary_type']['result'],
			salary_insurance	= question_list['salary_insurance']['result'],
			salary_dependence	= question_list['salary_dependence']['result'];
		var salary_gross, salary_net, income_tax = 0, dependence = 0, unemployment_insurance = 0, social_insurance = 0, health_insurance = 0, total_insurance;
		if(salary_type=='gross'){
			salary_gross = salary_amount;
			if(salary_insurance['social']){
				social_insurance = $scope.calculate_insurance(salary_gross,'social');
			}
			if(salary_insurance['health']){
				health_insurance = $scope.calculate_insurance(salary_gross,'health');
			}
			if(salary_insurance['unemployment']){
				unemployment_insurance = $scope.calculate_insurance(salary_gross,'unemployment');
			}
			total_insurance = social_insurance + health_insurance + unemployment_insurance;
			dependence = $scope.calculate_dependence(salary_dependence);
			income_tax = salary_gross - total_insurance - dependence;
			income_tax = $scope.calculate_income_tax(income_tax);
			salary_net = salary_gross - total_insurance - income_tax;
			$scope.result = {
				'title'			: 'Lương bạn nhận được (Net) tổng cộng là',
				'dependence'	: dependence,
				'income_tax' 	: income_tax,
				'salary_net'  	: salary_net,
				'insurance'		: total_insurance,
				'health_insurance' : {
					title : 'Bảo hiểm y tế ' + $scope.insurance_config['health'] + '%',
					value : health_insurance,
				},
				'social_insurance' : {
					title : 'Bảo hiểm xã hội ' + $scope.insurance_config['social'] + '%',
					value : social_insurance,
				},
				'unemployment_insurance' : {
					title : 'Bảo hiểm thất nghiệp ' + $scope.insurance_config['unemployment'] + '%',
					value : unemployment_insurance,
				},
			}
		}else{
			salary_net = salary_amount;
			var social_insurance_percent = 0, health_insurance_percent = 0, unemployment_insurance_percent = 0;
			if(salary_insurance['social']){
				social_insurance_percent = $scope.insurance_config['social'];
			}
			if(salary_insurance['health']){
				health_insurance_percent = $scope.insurance_config['health'];
			}
			if(salary_insurance['unemployment']){
				unemployment_insurance_percent = $scope.insurance_config['unemployment'];
			}
			total_insurance_percent = social_insurance_percent + health_insurance_percent + unemployment_insurance_percent;
			dependence = $scope.calculate_dependence(salary_dependence);
			salary_gross = $scope.calculate_gross(salary_net,dependence,total_insurance_percent);
			total_insurance = total_insurance_percent/100 * salary_gross;
			health_insurance = salary_gross * health_insurance_percent/100;
			social_insurance = salary_gross * social_insurance_percent/100;
			unemployment_insurance = salary_gross * unemployment_insurance_percent/100;
			income_tax = $scope.calculate_income_tax(salary_gross - total_insurance - dependence);
			$scope.result = {
				'title'			: 'Tổng lương của bạn (Gross) là',
				'dependence'	: dependence,
				'income_tax' 	: income_tax,
				'salary_gross'  : salary_gross,
				'insurance'		: total_insurance,
				'health_insurance' : {
					title : 'Bảo hiểm y tế ' + $scope.insurance_config['health'] + '%',
					value : health_insurance,
				},
				'social_insurance' : {
					title : 'Bảo hiểm xã hội ' + $scope.insurance_config['social'] + '%',
					value : social_insurance,
				},
				'unemployment_insurance' : {
					title : 'Bảo hiểm thất nghiệp ' + $scope.insurance_config['unemployment'] + '%',
					value : unemployment_insurance,
				},
			}
		}
	}


	/* helper */
	$scope.calculate_insurance = function(amount,type,gross_to_net){
		if(_.isUndefined(gross_to_net)){
			gross_to_net = true;
		}
		if(gross_to_net){
			return amount * ($scope.insurance_config[type]/100);
		}else{
			return amount / (100+$scope.insurance_config[type]) * $scope.insurance_config[type];
		}
	};
	$scope.calculate_dependence = function(amount){
		return amount * $scope.dependence_config + $scope.self_dependenec;
	};
	$scope.calculate_income_tax = function(amount_left){
		if(amount_left < 0){
				return 0;
		}
		var highest = 0;
		for(var k in $scope.income_tax_config){
			if(amount_left <= k){
				return amount_left * $scope.income_tax_config[k]/100;
				break;
			}
			higest = $scope.income_tax_config[k];
		}
		return amount_left * highest / 100;
	
	};
	$scope.calculate_gross = function(sub_net,dependence,total_insurance_percent){
		if(sub_net < 0){
			return 0;
		}
		var highest = 0;
		for(var k in $scope.income_tax_config){
			var x = $scope.income_tax_config[k]/100;
			var sub_depedence = x * dependence;
			var a = (1-x) * dependence;
			if(sub_net - a <= k){
				var salary_gross = (sub_net - sub_depedence) / ((1-x)*(1-total_insurance_percent/100));
				return salary_gross;
			}
		}
	};

	$scope.retry = function(){
		$scope.init();
	}

	$scope.init();
});