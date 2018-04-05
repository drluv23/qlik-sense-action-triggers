webpackHotUpdate(0,{

/***/ "./components/scope.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _qlik = __webpack_require__("qlik");

var _qlik2 = _interopRequireDefault(_qlik);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function ($scope) {
	// Initialization code
	$scope.state = {
		triggers: []
	};

	console.log('selection state check', $scope.state.selectionState);

	// Functions

	$scope.createSelectionObj = function (selections) {
		return selections.map(function (selection) {
			return {
				field: selection.fieldName,
				selected: selection.qSelected
			};
		});
	};

	//////////////////////////////////////////////
	// Create helper function for array equality /
	//////////////////////////////////////////////
	$scope.arraysEqual = function (x, y) {
		// if (a === b) return true;
		// if (a == null || b == null) return false;
		// if (a.length != b.length) return false;

		// for (var i = 0; i < a.length; ++i) {
		// 	//if nested array - recurse the value
		// 	if (a[i] instanceof Array && b[i] instanceof Array) {
		// 		$scope.arraysEqual(a[i], b[i]);
		// 	}
		// 	else if (a[i] !== b[i]) {
		// 		return false;
		// 	}
		// }
		// return true;

		'use strict';

		if (x === null || x === undefined || y === null || y === undefined) {
			return x === y;
		}
		// after this just checking type of one would be enough
		if (x.constructor !== y.constructor) {
			return false;
		}
		// if they are functions, they should exactly refer to same one (because of closures)
		if (x instanceof Function) {
			return x === y;
		}
		// if they are regexps, they should exactly refer to same one (it is hard to better equality check on current ES)
		if (x instanceof RegExp) {
			return x === y;
		}
		if (x === y || x.valueOf() === y.valueOf()) {
			return true;
		}
		if (Array.isArray(x) && x.length !== y.length) {
			return false;
		}

		// if they are dates, they must had equal valueOf
		if (x instanceof Date) {
			return false;
		}

		// if they are strictly equal, they both need to be object at least
		if (!(x instanceof Object)) {
			return false;
		}
		if (!(y instanceof Object)) {
			return false;
		}

		// recursive object equality check
		var p = Object.keys(x);
		return Object.keys(y).every(function (i) {
			return p.indexOf(i) !== -1;
		}) && p.every(function (i) {
			return $scope.arraysEqual(x[i], y[i]);
		});
	};

	$scope.hashCode = function (val) {
		var hash = 0;
		if (val.length == 0) {
			return hash;
		}
		for (var i = 0; i < val.length; i++) {
			var char = val.charCodeAt(i);
			hash = (hash << 5) - hash + char;
			hash = hash & hash; // Convert to 32bit integer
		}
		return hash;
	};
	// $scope.component.model.Invalidated.bind( function () {
	// 	console.info( 'Invalidated' );
	// 	$scope.state.prevSelectionState = $scope.state.selectionState;
	// } );
	$scope.selectionListener = function () {
		var newSelections = $scope.createSelectionObj($scope.state.selectionState.selections);
		console.log('Back count:', $scope.state.selectionState.backCount, 'event', $scope.state.selectionState, 'newObj', newSelections, 'prevObj', $scope.state.selectionObj);

		// check if new selections and old selections are the same
		var selectionChangeFlag = $scope.arraysEqual($scope.state.selectionState, newSelections);
		console.log('status', selectionChangeFlag);

		// check if selections have changed since last time process was checked
		if (!selectionChangeFlag) {
			var fieldTriggers = $scope.$parent.layout.fieldTrigger;
			console.log($scope.state.triggers);

			// clear trigger array in case triggers were removed
			$scope.state.triggers = [];

			// loop through each field trigger
			fieldTriggers.map(function (trigger) {
				console.log('trigger', trigger);

				$scope.state.triggers.push({
					field: trigger.qListObject.qDimensionInfo.qGroupFieldDefs[0],
					actionType: trigger.fieldTrigger.actionType,
					eventType: trigger.fieldTrigger.eventType,
					targetField: trigger.fieldTrigger.targetField,
					targetFieldSearchString: trigger.fieldTrigger.targetFieldSearchString,
					triggerFired: false
				});
			});
			console.log('final hashes', $scope.state.triggers);
		}

		// diff selections to catch newest selection/clear

		// check counts, if new > old then new selection, if old < new then cleared
		// if counts equal, loop through new and inner loop through old checking values

		// run below for new selection

		// check if selection in triggers

		// if in triggers and unfired, fire and flip flag

		// if in triggers and fired, do nothing

		// if not in triggers - do nothing

		//unregister the listener when no longer notification is needed.
		// $scope.state.selectionState.OnData.unbind( $scope.selectionListener );
	};

	// set initial scope state for selections
	if (!$scope.state.selectionState) {

		$scope.state.selectionState = _qlik2.default.currApp().selectionState();
		$scope.state.selectionState.OnData.bind($scope.selectionListener);

		$scope.state.selectionObj = $scope.createSelectionObj($scope.state.selectionState.selections);

		console.log('inital selection state', $scope.state.selectionState);
	}

	$scope.component.model.Validated.bind(function () {
		// var newSelectionState = qlik.currApp().selectionState( ).selections;

		// console.log('selection states', $scope.state.selectionState, newSelectionState, qlik.currApp().selectionState( ).selections);

		// var selectionChangeFlag = $scope.arraysEqual($scope.state.selectionState, newSelectionState);

		// console.log('status', selectionChangeFlag);


		// // check if selections have changed since last time process was checked
		// if (!selectionChangeFlag) {
		// 	// loop through each selection
		// 	newSelectionState.map((selection) => {
		// 		console.log('selection', selection);
		// 		// store hash value
		// 		var hashed = $scope.hashCode(selection.field);
		// 		// check if hash already exists in table
		// 		if (!$scope.state.hashes[hashed]) {
		// 			console.log('doesnt exist');
		// 			$scope.state.hashes[hashed] = selection;
		// 		} else {
		// 			console.log('exists');
		// 		}
		// 		console.log('final hashes', $scope.state.hashes);

		// 	});

		// var fieldTriggers = $scope.$parent.layout.fieldTrigger;
		// 	// loop through the triggers
		// 	fieldTriggers.map((field) => {
		// 		// hash the field name for a trigger
		// 		var hashed = $scope.hashCode(field.qListObject.qDimensionInfo.qGroupFieldDefs[0]);

		// 		// check to see if a trigger has a matching value in selections
		// 		if (!$scope.state.hashes[hashed]) {
		// 			console.log('found a match');
		// 		} else {
		// 			// if not - do nothing
		// 			console.log('no match');
		// 		}
		// 		// if so - see if the trigger has already been fired

		// 		// if trigger has not yet been fired - fire it

		// 		// if trigger has been fired, move to next trigger

		// 		// need something to flip flag back when selections are unselected
		// 		console.log('field', field.qListObject.qDimensionInfo.qGroupFieldDefs[0], hashed);


		// 	});
		// 	// console.log('new selection state', newSelectionState);
		// }

		// reset selection state to current
		// $scope.state.selectionState = newSelectionState;
		// console.info( 'Validated', fieldTriggers);

	});

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

/***/ })

})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL3Njb3BlLmpzIl0sIm5hbWVzIjpbIiRzY29wZSIsInN0YXRlIiwidHJpZ2dlcnMiLCJjb25zb2xlIiwibG9nIiwic2VsZWN0aW9uU3RhdGUiLCJjcmVhdGVTZWxlY3Rpb25PYmoiLCJzZWxlY3Rpb25zIiwibWFwIiwic2VsZWN0aW9uIiwiZmllbGQiLCJmaWVsZE5hbWUiLCJzZWxlY3RlZCIsInFTZWxlY3RlZCIsImFycmF5c0VxdWFsIiwieCIsInkiLCJ1bmRlZmluZWQiLCJjb25zdHJ1Y3RvciIsIkZ1bmN0aW9uIiwiUmVnRXhwIiwidmFsdWVPZiIsIkFycmF5IiwiaXNBcnJheSIsImxlbmd0aCIsIkRhdGUiLCJPYmplY3QiLCJwIiwia2V5cyIsImV2ZXJ5IiwiaSIsImluZGV4T2YiLCJoYXNoQ29kZSIsInZhbCIsImhhc2giLCJjaGFyIiwiY2hhckNvZGVBdCIsInNlbGVjdGlvbkxpc3RlbmVyIiwibmV3U2VsZWN0aW9ucyIsImJhY2tDb3VudCIsInNlbGVjdGlvbk9iaiIsInNlbGVjdGlvbkNoYW5nZUZsYWciLCJmaWVsZFRyaWdnZXJzIiwiJHBhcmVudCIsImxheW91dCIsImZpZWxkVHJpZ2dlciIsInRyaWdnZXIiLCJwdXNoIiwicUxpc3RPYmplY3QiLCJxRGltZW5zaW9uSW5mbyIsInFHcm91cEZpZWxkRGVmcyIsImFjdGlvblR5cGUiLCJldmVudFR5cGUiLCJ0YXJnZXRGaWVsZCIsInRhcmdldEZpZWxkU2VhcmNoU3RyaW5nIiwidHJpZ2dlckZpcmVkIiwiY3VyckFwcCIsIk9uRGF0YSIsImJpbmQiLCJjb21wb25lbnQiLCJtb2RlbCIsIlZhbGlkYXRlZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7OztrQkFFZSxVQUFDQSxNQUFELEVBQVk7QUFDMUI7QUFDQUEsUUFBT0MsS0FBUCxHQUFlO0FBQ2RDLFlBQVU7QUFESSxFQUFmOztBQUlBQyxTQUFRQyxHQUFSLENBQVksdUJBQVosRUFB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O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDIiwiZmlsZSI6IjAuZmVhZmZmMjgwMjc4ZmU4YTMxYzEuaG90LXVwZGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBxbGlrIGZyb20gJ3FsaWsnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgKCRzY29wZSkgPT4ge1xyXG5cdC8vIEluaXRpYWxpemF0aW9uIGNvZGVcclxuXHQkc2NvcGUuc3RhdGUgPSB7XHJcblx0XHR0cmlnZ2VyczogW10sXHJcblx0fTtcclxuXHJcblx0Y29uc29sZS5sb2coJ3NlbGVjdGlvbiBzdGF0ZSBjaGVjaycsICRzY29wZS5zdGF0ZS5zZWxlY3Rpb25TdGF0ZSk7XHJcblxyXG5cdC8vIEZ1bmN0aW9uc1xyXG5cclxuXHQkc2NvcGUuY3JlYXRlU2VsZWN0aW9uT2JqID0gZnVuY3Rpb24gKCBzZWxlY3Rpb25zICkge1xyXG5cdFx0cmV0dXJuIHNlbGVjdGlvbnMubWFwKChzZWxlY3Rpb24pID0+IHtcclxuXHRcdFx0cmV0dXJuIHtcclxuXHRcdFx0XHRmaWVsZDogc2VsZWN0aW9uLmZpZWxkTmFtZSxcclxuXHRcdFx0XHRzZWxlY3RlZDogc2VsZWN0aW9uLnFTZWxlY3RlZCxcclxuXHRcdFx0fTtcclxuXHRcdH0pO1xyXG5cdH07XHJcblxyXG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHQvLyBDcmVhdGUgaGVscGVyIGZ1bmN0aW9uIGZvciBhcnJheSBlcXVhbGl0eSAvXHJcblx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cdCRzY29wZS5hcnJheXNFcXVhbCA9IGZ1bmN0aW9uICh4LCB5KSB7XHJcblx0XHQvLyBpZiAoYSA9PT0gYikgcmV0dXJuIHRydWU7XHJcblx0XHQvLyBpZiAoYSA9PSBudWxsIHx8IGIgPT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xyXG5cdFx0Ly8gaWYgKGEubGVuZ3RoICE9IGIubGVuZ3RoKSByZXR1cm4gZmFsc2U7XHJcbiAgXHJcblx0XHQvLyBmb3IgKHZhciBpID0gMDsgaSA8IGEubGVuZ3RoOyArK2kpIHtcclxuXHRcdC8vIFx0Ly9pZiBuZXN0ZWQgYXJyYXkgLSByZWN1cnNlIHRoZSB2YWx1ZVxyXG5cdFx0Ly8gXHRpZiAoYVtpXSBpbnN0YW5jZW9mIEFycmF5ICYmIGJbaV0gaW5zdGFuY2VvZiBBcnJheSkge1xyXG5cdFx0Ly8gXHRcdCRzY29wZS5hcnJheXNFcXVhbChhW2ldLCBiW2ldKTtcclxuXHRcdC8vIFx0fVxyXG5cdFx0Ly8gXHRlbHNlIGlmIChhW2ldICE9PSBiW2ldKSB7XHJcblx0XHQvLyBcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0Ly8gXHR9XHJcblx0XHQvLyB9XHJcblx0XHQvLyByZXR1cm4gdHJ1ZTtcclxuXHRcdFxyXG5cdFx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRcdGlmICh4ID09PSBudWxsIHx8IHggPT09IHVuZGVmaW5lZCB8fCB5ID09PSBudWxsIHx8IHkgPT09IHVuZGVmaW5lZCkgeyByZXR1cm4geCA9PT0geTsgfVxyXG5cdFx0Ly8gYWZ0ZXIgdGhpcyBqdXN0IGNoZWNraW5nIHR5cGUgb2Ygb25lIHdvdWxkIGJlIGVub3VnaFxyXG5cdFx0aWYgKHguY29uc3RydWN0b3IgIT09IHkuY29uc3RydWN0b3IpIHsgcmV0dXJuIGZhbHNlOyB9XHJcblx0XHQvLyBpZiB0aGV5IGFyZSBmdW5jdGlvbnMsIHRoZXkgc2hvdWxkIGV4YWN0bHkgcmVmZXIgdG8gc2FtZSBvbmUgKGJlY2F1c2Ugb2YgY2xvc3VyZXMpXHJcblx0XHRpZiAoeCBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7IHJldHVybiB4ID09PSB5OyB9XHJcblx0XHQvLyBpZiB0aGV5IGFyZSByZWdleHBzLCB0aGV5IHNob3VsZCBleGFjdGx5IHJlZmVyIHRvIHNhbWUgb25lIChpdCBpcyBoYXJkIHRvIGJldHRlciBlcXVhbGl0eSBjaGVjayBvbiBjdXJyZW50IEVTKVxyXG5cdFx0aWYgKHggaW5zdGFuY2VvZiBSZWdFeHApIHsgcmV0dXJuIHggPT09IHk7IH1cclxuXHRcdGlmICh4ID09PSB5IHx8IHgudmFsdWVPZigpID09PSB5LnZhbHVlT2YoKSkgeyByZXR1cm4gdHJ1ZTsgfVxyXG5cdFx0aWYgKEFycmF5LmlzQXJyYXkoeCkgJiYgeC5sZW5ndGggIT09IHkubGVuZ3RoKSB7IHJldHVybiBmYWxzZTsgfVxyXG5cdFxyXG5cdFx0Ly8gaWYgdGhleSBhcmUgZGF0ZXMsIHRoZXkgbXVzdCBoYWQgZXF1YWwgdmFsdWVPZlxyXG5cdFx0aWYgKHggaW5zdGFuY2VvZiBEYXRlKSB7IHJldHVybiBmYWxzZTsgfVxyXG5cdFxyXG5cdFx0Ly8gaWYgdGhleSBhcmUgc3RyaWN0bHkgZXF1YWwsIHRoZXkgYm90aCBuZWVkIHRvIGJlIG9iamVjdCBhdCBsZWFzdFxyXG5cdFx0aWYgKCEoeCBpbnN0YW5jZW9mIE9iamVjdCkpIHsgcmV0dXJuIGZhbHNlOyB9XHJcblx0XHRpZiAoISh5IGluc3RhbmNlb2YgT2JqZWN0KSkgeyByZXR1cm4gZmFsc2U7IH1cclxuXHRcclxuXHRcdC8vIHJlY3Vyc2l2ZSBvYmplY3QgZXF1YWxpdHkgY2hlY2tcclxuXHRcdHZhciBwID0gT2JqZWN0LmtleXMoeCk7XHJcblx0XHRyZXR1cm4gT2JqZWN0LmtleXMoeSkuZXZlcnkoZnVuY3Rpb24gKGkpIHsgcmV0dXJuIHAuaW5kZXhPZihpKSAhPT0gLTE7IH0pICYmXHJcblx0XHRcdHAuZXZlcnkoZnVuY3Rpb24gKGkpIHsgcmV0dXJuICRzY29wZS5hcnJheXNFcXVhbCh4W2ldLCB5W2ldKTsgfSk7XHJcblx0fTtcclxuXHJcblx0JHNjb3BlLmhhc2hDb2RlID0gZnVuY3Rpb24oIHZhbCApIHtcclxuXHRcdHZhciBoYXNoID0gMDtcclxuXHRcdGlmICh2YWwubGVuZ3RoID09IDApIHtcclxuXHRcdFx0cmV0dXJuIGhhc2g7XHJcblx0XHR9XHJcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHZhbC5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgY2hhciA9IHZhbC5jaGFyQ29kZUF0KGkpO1xyXG5cdFx0XHRoYXNoID0gKChoYXNoPDw1KS1oYXNoKStjaGFyO1xyXG5cdFx0XHRoYXNoID0gaGFzaCAmIGhhc2g7IC8vIENvbnZlcnQgdG8gMzJiaXQgaW50ZWdlclxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIGhhc2g7XHJcblx0fTtcclxuXHQvLyAkc2NvcGUuY29tcG9uZW50Lm1vZGVsLkludmFsaWRhdGVkLmJpbmQoIGZ1bmN0aW9uICgpIHtcclxuXHQvLyBcdGNvbnNvbGUuaW5mbyggJ0ludmFsaWRhdGVkJyApO1xyXG5cdC8vIFx0JHNjb3BlLnN0YXRlLnByZXZTZWxlY3Rpb25TdGF0ZSA9ICRzY29wZS5zdGF0ZS5zZWxlY3Rpb25TdGF0ZTtcclxuXHQvLyB9ICk7XHJcblx0JHNjb3BlLnNlbGVjdGlvbkxpc3RlbmVyID0gZnVuY3Rpb24oKSB7XHJcblx0XHR2YXIgbmV3U2VsZWN0aW9ucyA9ICRzY29wZS5jcmVhdGVTZWxlY3Rpb25PYmooJHNjb3BlLnN0YXRlLnNlbGVjdGlvblN0YXRlLnNlbGVjdGlvbnMpO1xyXG5cdFx0Y29uc29sZS5sb2coJ0JhY2sgY291bnQ6JywgJHNjb3BlLnN0YXRlLnNlbGVjdGlvblN0YXRlLmJhY2tDb3VudCwgJ2V2ZW50JywgJHNjb3BlLnN0YXRlLnNlbGVjdGlvblN0YXRlLCAnbmV3T2JqJywgbmV3U2VsZWN0aW9ucywgJ3ByZXZPYmonLCAkc2NvcGUuc3RhdGUuc2VsZWN0aW9uT2JqKTtcclxuXHJcblx0XHQvLyBjaGVjayBpZiBuZXcgc2VsZWN0aW9ucyBhbmQgb2xkIHNlbGVjdGlvbnMgYXJlIHRoZSBzYW1lXHJcblx0XHR2YXIgc2VsZWN0aW9uQ2hhbmdlRmxhZyA9ICRzY29wZS5hcnJheXNFcXVhbCgkc2NvcGUuc3RhdGUuc2VsZWN0aW9uU3RhdGUsIG5ld1NlbGVjdGlvbnMpO1xyXG5cdFx0Y29uc29sZS5sb2coJ3N0YXR1cycsIHNlbGVjdGlvbkNoYW5nZUZsYWcpO1xyXG5cclxuXHRcdFxyXG5cdFx0Ly8gY2hlY2sgaWYgc2VsZWN0aW9ucyBoYXZlIGNoYW5nZWQgc2luY2UgbGFzdCB0aW1lIHByb2Nlc3Mgd2FzIGNoZWNrZWRcclxuXHRcdGlmICghc2VsZWN0aW9uQ2hhbmdlRmxhZykge1xyXG5cdFx0XHR2YXIgZmllbGRUcmlnZ2VycyA9ICRzY29wZS4kcGFyZW50LmxheW91dC5maWVsZFRyaWdnZXI7XHJcblx0XHRcdGNvbnNvbGUubG9nKCRzY29wZS5zdGF0ZS50cmlnZ2Vycyk7XHJcblxyXG5cdFx0XHQvLyBjbGVhciB0cmlnZ2VyIGFycmF5IGluIGNhc2UgdHJpZ2dlcnMgd2VyZSByZW1vdmVkXHJcblx0XHRcdCRzY29wZS5zdGF0ZS50cmlnZ2VycyA9IFtdO1xyXG5cclxuXHRcdFx0Ly8gbG9vcCB0aHJvdWdoIGVhY2ggZmllbGQgdHJpZ2dlclxyXG5cdFx0XHRmaWVsZFRyaWdnZXJzLm1hcCgodHJpZ2dlcikgPT4ge1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKCd0cmlnZ2VyJywgdHJpZ2dlcik7XHJcblxyXG5cdFx0XHRcdCRzY29wZS5zdGF0ZS50cmlnZ2Vycy5wdXNoKHtcclxuXHRcdFx0XHRcdGZpZWxkOiB0cmlnZ2VyLnFMaXN0T2JqZWN0LnFEaW1lbnNpb25JbmZvLnFHcm91cEZpZWxkRGVmc1swXSxcclxuXHRcdFx0XHRcdGFjdGlvblR5cGU6IHRyaWdnZXIuZmllbGRUcmlnZ2VyLmFjdGlvblR5cGUsXHJcblx0XHRcdFx0XHRldmVudFR5cGU6IHRyaWdnZXIuZmllbGRUcmlnZ2VyLmV2ZW50VHlwZSxcclxuXHRcdFx0XHRcdHRhcmdldEZpZWxkOiB0cmlnZ2VyLmZpZWxkVHJpZ2dlci50YXJnZXRGaWVsZCxcclxuXHRcdFx0XHRcdHRhcmdldEZpZWxkU2VhcmNoU3RyaW5nOiB0cmlnZ2VyLmZpZWxkVHJpZ2dlci50YXJnZXRGaWVsZFNlYXJjaFN0cmluZyxcclxuXHRcdFx0XHRcdHRyaWdnZXJGaXJlZDogZmFsc2UsXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcclxuXHRcdFx0fSk7XHJcblx0XHRcdGNvbnNvbGUubG9nKCdmaW5hbCBoYXNoZXMnLCAkc2NvcGUuc3RhdGUudHJpZ2dlcnMpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIGRpZmYgc2VsZWN0aW9ucyB0byBjYXRjaCBuZXdlc3Qgc2VsZWN0aW9uL2NsZWFyXHJcblxyXG5cdFx0Ly8gY2hlY2sgY291bnRzLCBpZiBuZXcgPiBvbGQgdGhlbiBuZXcgc2VsZWN0aW9uLCBpZiBvbGQgPCBuZXcgdGhlbiBjbGVhcmVkXHJcblx0XHQvLyBpZiBjb3VudHMgZXF1YWwsIGxvb3AgdGhyb3VnaCBuZXcgYW5kIGlubmVyIGxvb3AgdGhyb3VnaCBvbGQgY2hlY2tpbmcgdmFsdWVzXHJcblxyXG5cdFx0Ly8gcnVuIGJlbG93IGZvciBuZXcgc2VsZWN0aW9uXHJcblxyXG5cdFx0Ly8gY2hlY2sgaWYgc2VsZWN0aW9uIGluIHRyaWdnZXJzXHJcblxyXG5cdFx0Ly8gaWYgaW4gdHJpZ2dlcnMgYW5kIHVuZmlyZWQsIGZpcmUgYW5kIGZsaXAgZmxhZ1xyXG5cclxuXHRcdC8vIGlmIGluIHRyaWdnZXJzIGFuZCBmaXJlZCwgZG8gbm90aGluZ1xyXG5cclxuXHRcdC8vIGlmIG5vdCBpbiB0cmlnZ2VycyAtIGRvIG5vdGhpbmdcclxuXHJcblx0XHQvL3VucmVnaXN0ZXIgdGhlIGxpc3RlbmVyIHdoZW4gbm8gbG9uZ2VyIG5vdGlmaWNhdGlvbiBpcyBuZWVkZWQuXHJcblx0XHQvLyAkc2NvcGUuc3RhdGUuc2VsZWN0aW9uU3RhdGUuT25EYXRhLnVuYmluZCggJHNjb3BlLnNlbGVjdGlvbkxpc3RlbmVyICk7XHJcblx0fTtcclxuXHJcblx0Ly8gc2V0IGluaXRpYWwgc2NvcGUgc3RhdGUgZm9yIHNlbGVjdGlvbnNcclxuXHRpZiAoISRzY29wZS5zdGF0ZS5zZWxlY3Rpb25TdGF0ZSkge1xyXG5cclxuXHRcdCRzY29wZS5zdGF0ZS5zZWxlY3Rpb25TdGF0ZSA9IHFsaWsuY3VyckFwcCgpLnNlbGVjdGlvblN0YXRlKCApO1xyXG5cdFx0JHNjb3BlLnN0YXRlLnNlbGVjdGlvblN0YXRlLk9uRGF0YS5iaW5kKCAkc2NvcGUuc2VsZWN0aW9uTGlzdGVuZXIgKTtcclxuXHJcblx0XHQkc2NvcGUuc3RhdGUuc2VsZWN0aW9uT2JqID0gJHNjb3BlLmNyZWF0ZVNlbGVjdGlvbk9iaigkc2NvcGUuc3RhdGUuc2VsZWN0aW9uU3RhdGUuc2VsZWN0aW9ucyk7XHJcblxyXG5cclxuXHRcdGNvbnNvbGUubG9nKCdpbml0YWwgc2VsZWN0aW9uIHN0YXRlJywgJHNjb3BlLnN0YXRlLnNlbGVjdGlvblN0YXRlKTtcclxuXHJcblx0fVxyXG5cclxuXHQkc2NvcGUuY29tcG9uZW50Lm1vZGVsLlZhbGlkYXRlZC5iaW5kKCBmdW5jdGlvbiAoKSB7XHJcblx0XHQvLyB2YXIgbmV3U2VsZWN0aW9uU3RhdGUgPSBxbGlrLmN1cnJBcHAoKS5zZWxlY3Rpb25TdGF0ZSggKS5zZWxlY3Rpb25zO1xyXG5cclxuXHRcdC8vIGNvbnNvbGUubG9nKCdzZWxlY3Rpb24gc3RhdGVzJywgJHNjb3BlLnN0YXRlLnNlbGVjdGlvblN0YXRlLCBuZXdTZWxlY3Rpb25TdGF0ZSwgcWxpay5jdXJyQXBwKCkuc2VsZWN0aW9uU3RhdGUoICkuc2VsZWN0aW9ucyk7XHJcblx0XHRcclxuXHRcdC8vIHZhciBzZWxlY3Rpb25DaGFuZ2VGbGFnID0gJHNjb3BlLmFycmF5c0VxdWFsKCRzY29wZS5zdGF0ZS5zZWxlY3Rpb25TdGF0ZSwgbmV3U2VsZWN0aW9uU3RhdGUpO1xyXG5cclxuXHRcdC8vIGNvbnNvbGUubG9nKCdzdGF0dXMnLCBzZWxlY3Rpb25DaGFuZ2VGbGFnKTtcclxuXHJcblxyXG5cdFx0Ly8gLy8gY2hlY2sgaWYgc2VsZWN0aW9ucyBoYXZlIGNoYW5nZWQgc2luY2UgbGFzdCB0aW1lIHByb2Nlc3Mgd2FzIGNoZWNrZWRcclxuXHRcdC8vIGlmICghc2VsZWN0aW9uQ2hhbmdlRmxhZykge1xyXG5cdFx0Ly8gXHQvLyBsb29wIHRocm91Z2ggZWFjaCBzZWxlY3Rpb25cclxuXHRcdC8vIFx0bmV3U2VsZWN0aW9uU3RhdGUubWFwKChzZWxlY3Rpb24pID0+IHtcclxuXHRcdC8vIFx0XHRjb25zb2xlLmxvZygnc2VsZWN0aW9uJywgc2VsZWN0aW9uKTtcclxuXHRcdC8vIFx0XHQvLyBzdG9yZSBoYXNoIHZhbHVlXHJcblx0XHQvLyBcdFx0dmFyIGhhc2hlZCA9ICRzY29wZS5oYXNoQ29kZShzZWxlY3Rpb24uZmllbGQpO1xyXG5cdFx0Ly8gXHRcdC8vIGNoZWNrIGlmIGhhc2ggYWxyZWFkeSBleGlzdHMgaW4gdGFibGVcclxuXHRcdC8vIFx0XHRpZiAoISRzY29wZS5zdGF0ZS5oYXNoZXNbaGFzaGVkXSkge1xyXG5cdFx0Ly8gXHRcdFx0Y29uc29sZS5sb2coJ2RvZXNudCBleGlzdCcpO1xyXG5cdFx0Ly8gXHRcdFx0JHNjb3BlLnN0YXRlLmhhc2hlc1toYXNoZWRdID0gc2VsZWN0aW9uO1xyXG5cdFx0Ly8gXHRcdH0gZWxzZSB7XHJcblx0XHQvLyBcdFx0XHRjb25zb2xlLmxvZygnZXhpc3RzJyk7XHJcblx0XHQvLyBcdFx0fVxyXG5cdFx0Ly8gXHRcdGNvbnNvbGUubG9nKCdmaW5hbCBoYXNoZXMnLCAkc2NvcGUuc3RhdGUuaGFzaGVzKTtcclxuXHRcdFx0XHRcclxuXHRcdC8vIFx0fSk7XHJcblx0XHRcclxuXHRcdC8vIHZhciBmaWVsZFRyaWdnZXJzID0gJHNjb3BlLiRwYXJlbnQubGF5b3V0LmZpZWxkVHJpZ2dlcjtcclxuXHRcdC8vIFx0Ly8gbG9vcCB0aHJvdWdoIHRoZSB0cmlnZ2Vyc1xyXG5cdFx0Ly8gXHRmaWVsZFRyaWdnZXJzLm1hcCgoZmllbGQpID0+IHtcclxuXHRcdC8vIFx0XHQvLyBoYXNoIHRoZSBmaWVsZCBuYW1lIGZvciBhIHRyaWdnZXJcclxuXHRcdC8vIFx0XHR2YXIgaGFzaGVkID0gJHNjb3BlLmhhc2hDb2RlKGZpZWxkLnFMaXN0T2JqZWN0LnFEaW1lbnNpb25JbmZvLnFHcm91cEZpZWxkRGVmc1swXSk7XHJcblxyXG5cdFx0Ly8gXHRcdC8vIGNoZWNrIHRvIHNlZSBpZiBhIHRyaWdnZXIgaGFzIGEgbWF0Y2hpbmcgdmFsdWUgaW4gc2VsZWN0aW9uc1xyXG5cdFx0Ly8gXHRcdGlmICghJHNjb3BlLnN0YXRlLmhhc2hlc1toYXNoZWRdKSB7XHJcblx0XHQvLyBcdFx0XHRjb25zb2xlLmxvZygnZm91bmQgYSBtYXRjaCcpO1xyXG5cdFx0Ly8gXHRcdH0gZWxzZSB7XHJcblx0XHQvLyBcdFx0XHQvLyBpZiBub3QgLSBkbyBub3RoaW5nXHJcblx0XHQvLyBcdFx0XHRjb25zb2xlLmxvZygnbm8gbWF0Y2gnKTtcclxuXHRcdC8vIFx0XHR9XHJcblx0XHQvLyBcdFx0Ly8gaWYgc28gLSBzZWUgaWYgdGhlIHRyaWdnZXIgaGFzIGFscmVhZHkgYmVlbiBmaXJlZFxyXG5cclxuXHRcdC8vIFx0XHQvLyBpZiB0cmlnZ2VyIGhhcyBub3QgeWV0IGJlZW4gZmlyZWQgLSBmaXJlIGl0XHJcblxyXG5cdFx0Ly8gXHRcdC8vIGlmIHRyaWdnZXIgaGFzIGJlZW4gZmlyZWQsIG1vdmUgdG8gbmV4dCB0cmlnZ2VyXHJcblxyXG5cdFx0Ly8gXHRcdC8vIG5lZWQgc29tZXRoaW5nIHRvIGZsaXAgZmxhZyBiYWNrIHdoZW4gc2VsZWN0aW9ucyBhcmUgdW5zZWxlY3RlZFxyXG5cdFx0Ly8gXHRcdGNvbnNvbGUubG9nKCdmaWVsZCcsIGZpZWxkLnFMaXN0T2JqZWN0LnFEaW1lbnNpb25JbmZvLnFHcm91cEZpZWxkRGVmc1swXSwgaGFzaGVkKTtcclxuXHJcblxyXG5cclxuXHRcdC8vIFx0fSk7XHJcblx0XHQvLyBcdC8vIGNvbnNvbGUubG9nKCduZXcgc2VsZWN0aW9uIHN0YXRlJywgbmV3U2VsZWN0aW9uU3RhdGUpO1xyXG5cdFx0Ly8gfVxyXG5cclxuXHRcdC8vIHJlc2V0IHNlbGVjdGlvbiBzdGF0ZSB0byBjdXJyZW50XHJcblx0XHQvLyAkc2NvcGUuc3RhdGUuc2VsZWN0aW9uU3RhdGUgPSBuZXdTZWxlY3Rpb25TdGF0ZTtcclxuXHRcdC8vIGNvbnNvbGUuaW5mbyggJ1ZhbGlkYXRlZCcsIGZpZWxkVHJpZ2dlcnMpO1xyXG5cdFx0XHJcblx0fSApO1xyXG5cclxuXHQvLyBnZXQgc2VsZWN0aW9uIHN0YXRlXHJcblxyXG5cdC8vIHN0b3JlIHNlbGVjdGlvbiBzdGF0ZSB0byBzY29wZVxyXG5cclxuXHQvLyBtZWFzdXJlIGN1cnJlbnQgc2VsZWN0aW9uIHN0YXRlIGFnYWluc3Qgc3RvcmVkIHNlbGVjdGlvbiBzdGF0ZVxyXG5cclxuXHQvLyBJRiAtIHVzZXIgY2hhbmdlZCBmaWVsZCBBTkQgZmllbGQgd2FzIHRhZ2dlZCBmb3IgY2hhbmdlc1xyXG5cdC8vIERPIHdoYXRldmVyIHVzZXIgYXNrZWRcclxuXHJcblx0Ly8gc3RvcmUgdXBkYXRlZCBzdGF0ZSB0byBzY29wZVxyXG5cclxuXHJcblxyXG5cdC8vJHNjb3BlLmJhY2tlbmRBcGkuc2VsZWN0VmFsdWVzKCk7XHJcblxyXG5cdC8vICRzY29wZS5kYXRhQXJyID0gJHNjb3BlLmxheW91dC5xTGlzdE9iamVjdC5xRGF0YVBhZ2VzWzBdLnFNYXRyaXg7XHJcblx0Ly8gY29uc29sZS5sb2coJ2RhdGEgY2FsbCcsICRzY29wZS5kYXRhQXJyKTtcclxuXHJcblx0Ly8gJHNjb3BlLiR3YXRjaCgnbGF5b3V0LnFMaXN0T2JqZWN0LnFEYXRhUGFnZXNbMF0ucU1hdHJpeCcsIGZ1bmN0aW9uIChuZXdWYWwsIG9sZFZhbCkge1xyXG5cdC8vIFx0Ly8gaWYgKCFhcnJheXNFcXVhbChvbGRWYWwsbmV3VmFsKSAmJiBuZXdWYWwhPT11bmRlZmluZWQpe1xyXG5cdC8vIFx0bGV0IGN1cnJlbnRUaW1lID0gbmV3IERhdGU7XHJcblxyXG5cdC8vIFx0aWYgKCRzY29wZS50aW1lclZhcnMucnVubmluZyE9PXRydWUpIHtcclxuXHQvLyBcdFx0Y29uc29sZS5sb2coJ3RoZSBkYXRhIGlzIGEgY2hhbmdpbicsIG5ld1ZhbCwgb2xkVmFsLCBjdXJyZW50VGltZSk7XHJcblx0Ly8gXHRcdCRzY29wZS5kYXRhQXJyID0gbmV3VmFsO1xyXG5cdC8vIFx0fSBlbHNlIHtcclxuXHQvLyBcdFx0Y29uc29sZS5sb2coJ2dvIGF3YXksIGlcIm0gcnVubmluZycsIGN1cnJlbnRUaW1lKTtcclxuXHQvLyBcdH1cclxuXHQvLyAvLyBsZXQgZGF0YSA9IGRhdGFPYmooJHNjb3BlLiRwYXJlbnQubGF5b3V0KTtcclxuXHQvLyAvLyBjb25zb2xlLmxvZygnZGF0YSBjaGFuZ2UgZmlyZWQnLCAkc2NvcGUuJHBhcmVudC5sYXlvdXQpO1xyXG5cdC8vIC8vIGRhdGFDaGFuZ2VzKGRhdGEsICRzY29wZS5pZCk7XHJcblx0Ly8gLy8gLy9mdW5jdGlvbiB0byBjbGVhbiB1cCBzZWxlY3Rpb24gY2xhc3NlcyBhZnRlciBkYXRhIGNoYW5nZXNcclxuXHQvLyAvLyBiYXJTZWxlY3Rpb25DbGFzc2VzKCRzY29wZS4kcGFyZW50LmxheW91dC5xSHlwZXJDdWJlLnFEYXRhUGFnZXNbMF0ucU1hdHJpeCk7XHJcblx0Ly8gLy8gfVxyXG5cdC8vIH0pO1xyXG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvbXBvbmVudHMvc2NvcGUuanMiXSwic291cmNlUm9vdCI6IiJ9