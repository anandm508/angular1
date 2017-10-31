'use strict';

describe('calculator', function() {
	
  beforeEach(module('calculator'));
  var scope, calcCtrl;
  
  describe('LinearMotionCalcController', function(){
	
    it('should ....', inject(function($controller, $rootScope) {
	  scope = $rootScope.$new();
      //spec body
      calcCtrl = $controller('LinearMotionCalcController',  { $scope: scope });
      expect(calcCtrl).toBeDefined();
	  expect(scope.inputVariables).toBeDefined();
    }));
	
	it('should get an output', function () {
		expect(_.isObject(scope.inputVariables)).toBeTruthy();
		
		scope.calcForm = {};
		scope.inputOption = 'u';
		scope.displayInput();
		scope.inputVariables.u.val = 5;
		
		scope.inputOption = 'a';
		scope.displayInput();
		scope.inputVariables.a.val = 2;
		
		scope.inputOption = 't';
		scope.displayInput();
		scope.inputVariables.t.val = 4;
		
		scope.outputOption = 'v';
		scope.displayOutput();
				
		scope.calculate();
		
		expect(scope.outputVariables.v.val).toEqual('13');
		
	})

  });
});

