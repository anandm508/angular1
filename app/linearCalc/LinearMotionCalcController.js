'use strict';

/**
* Controller for Linear Motion Calculator
* Html page is linearMotionCalc.html
*
*/
angular.module('calculator').controller('LinearMotionCalcController', ['$scope', '$timeout', function($scope, $timeout) {	
	
	$scope.inputVariables = {}
	$scope.outputVariables = {};
    
	$scope.variables = [
        {value:'u', label:'u - Initial Velocity'},
        {value:'v', label:'v - Final Velocity'},
        {value:'a', label:'a - Acceleration'},
        {value:'t', label:'t - Time'},
        {value:'s', label:'s - Distance'}
	];
    
	var eq1 = algebra.parse("v=u+a*t");
	var eq2 = algebra.parse("s=u*t+1/2*a*t*t");
	var eq3 = algebra.parse("v*v=u*u+2*a*s");
	
    //Displays the input when user selects the add button
	$scope.displayInput = function(){		
		if($scope.outputVariables[$scope.inputOption]){
			$scope.calcError = true;
			$scope.calcErrorMsg= 'Output already contains the selected variable.';
			$timeout(function() {
				$scope.resetError();
			}, 3000);
		}else{
			if(!$scope.inputVariables[$scope.inputOption]){
				$scope.inputVariables[$scope.inputOption] = {};
			}
			$scope.inputVariables[$scope.inputOption].visible = true;
		}
		
	}
	
    //Displays the out when the user clicks the add button
	$scope.displayOutput = function(){
		if($scope.inputVariables[$scope.outputOption]){
			$scope.calcError = true;
			$scope.calcErrorMsg= 'Input already contains the selected variable.';
			$timeout(function() {
				$scope.resetError();
			}, 3000);
		}else{
			if(!$scope.outputVariables[$scope.outputOption]){
				$scope.outputVariables[$scope.outputOption] = {};
			}
			$scope.outputVariables[$scope.outputOption].visible = true;
			if($scope.inputVariables[$scope.outputOption]){
				$scope.outputVariables[$scope.outputOption].val = $scope.inputVariables[$scope.outputOption].val;
			}
		}
	}
	
    //Resets the input
	$scope.resetInput = function(){
		$scope.inputVariables = {};
		$scope.inputOption = '';
	}
	
    //Resets the output
	$scope.resetOutput = function(){
		$scope.outputVariables = {};
		$scope.outputOption = '';
	}
	
    //Resets the error
	$scope.resetError = function(){
		$scope.calcError = false;
		$scope.calcErrorMsg= '';
	}
	
    //Performs the calculation
	$scope.calculate = function(){
		if(_.isEmpty($scope.inputVariables)){
			$scope.calcError = true;
			$scope.calcErrorMsg= 'Please select input variables';
			$timeout(function() {
				$scope.resetError();
			}, 3000);
		}else if($scope.calcForm.$invalid){
			$scope.calcError = true;
			$scope.calcErrorMsg= 'Please provide the valid values for the input variables.';
			$timeout(function() {
				$scope.resetError();
			}, 3000);
		}else if(_.isEmpty($scope.outputVariables)){
			$scope.calcError = true;
			$scope.calcErrorMsg= 'Please select output variables';
			$timeout(function() {
				$scope.resetError();
			}, 3000);
		}else{
			var evalData = {};
			for(var input in $scope.inputVariables){
				evalData[input] = $scope.inputVariables[input].val;
			}
			var temp1 = eq1.eval(evalData);
			var temp2 = eq2.eval(evalData);
			var temp3 = eq3.eval(evalData);
			
			console.log(temp1.toString());
			console.log(temp2.toString());
			console.log(temp3.toString());
			
			for(var output in $scope.outputVariables){
			if(temp1.toString().indexOf(output) != -1
			&& isEquationSatisfied(temp1, output)){
				$scope.outputVariables[output].val = temp1.solveFor(output).toString();
				continue;
			}else if(temp2.toString().indexOf(output) != -1
			&& isEquationSatisfied(temp2, output)){
				$scope.outputVariables[output].val = temp2.solveFor(output).toString();
				continue;
			}else if(temp3.toString().indexOf(output) != -1
			&& isEquationSatisfied(temp3, output)){
				$scope.outputVariables[output].val = temp3.solveFor(output).toString();
				continue;
			}else{
				$scope.calcError = true;
				$scope.calcErrorMsg= 'Input variables insufficient.';
				$timeout(function() {
					$scope.resetError();
				}, 3000);
				}
			}
		}
	}
	
    //Checks if the equation is satisfied
	function isEquationSatisfied(eq, variable){
		var arr = ['u', 'v', 'a', 's', 't'];
		var index = arr.indexOf(variable);
		arr.splice(index, 1);
		var isSatisfied = true;
		for(var i=0; i<arr.length; i++){
			if(eq.toString().indexOf(arr[i]) != -1){
			isSatisfied = false;
			break;
			}
		}
		return isSatisfied;
	}
}]);