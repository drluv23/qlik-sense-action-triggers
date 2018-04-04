import qlik from 'qlik';

export default ($scope) => {
	//detect data changes
	// console.log('scope call test', $scope, qlik.currApp().selectionState( ).selections);
	$scope.state = {

	};

	if (!$scope.state.selectionState) {
		$scope.state.selectionState = qlik.currApp().selectionState( ).selections;
	}

	//////////////////////////////////////////////
	// Create helper function for array equality /
	//////////////////////////////////////////////
	$scope.arraysEqual = function (a, b) {
		if (a === b) return true;
		if (a == null || b == null) return false;
		if (a.length != b.length) return false;
  
		for (var i = 0; i < a.length; ++i) {
			//if nested array - recurse the value
			if (a[i].isArray() && b[i].isArray()) {
				$scope.arraysEqual(a[i], b[i]);
			}
			else if (a[i] !== b[i]) {
				return false;
			}
		}
		return true;
	};

	$scope.component.model.Validated.bind( function () {
		var newSelectionState = qlik.currApp().selectionState( ).selections;
		
		var selectionChangeFlag = $scope.arraysEqual($scope.state.selectionState, newSelectionState);

		if (selectionChangeFlag) {
			console.log('new selection state', newSelectionState);
		}

		console.info( 'Validated', $scope.$parent.layout.fieldTrigger);
		
	} );

	// get selection state

	// store selection state to scope

	// measure current selection state against stored selection state

	// IF - user changed field AND field was tagged for changes
	// DO whatever user asked

	// store updated state to scope

	

	//$scope.backendApi.selectValues();

	// $scope.dataArr = $scope.layout.qListObject.qDataPages[0].qMatrix;
	// console.log('data call', $scope.dataArr);

	// $scope.$watch('layout.qListObject.qDataPages[0].qMatrix', function (newVal, oldVal) {
	// 	// if (!arraysEqual(oldVal,newVal) && newVal!==undefined){
	// 	let currentTime = new Date;

	// 	if ($scope.timerVars.running!==true) {
	// 		console.log('the data is a changin', newVal, oldVal, currentTime);
	// 		$scope.dataArr = newVal;
	// 	} else {
	// 		console.log('go away, i"m running', currentTime);
	// 	}
	// // let data = dataObj($scope.$parent.layout);
	// // console.log('data change fired', $scope.$parent.layout);
	// // dataChanges(data, $scope.id);
	// // //function to clean up selection classes after data changes
	// // barSelectionClasses($scope.$parent.layout.qHyperCube.qDataPages[0].qMatrix);
	// // }
	// });
};