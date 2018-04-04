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
	//detect data changes
	// console.log('scope call test', $scope, qlik.currApp().selectionState( ).selections);
	$scope.state = {};

	if (!$scope.state.selectionState) {
		$scope.state.selectionState = _qlik2.default.currApp().selectionState().selections;
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
			} else if (a[i] !== b[i]) {
				return false;
			}
		}
		return true;
	};

	$scope.component.model.Validated.bind(function () {
		var newSelectionState = _qlik2.default.currApp().selectionState().selections;

		var selectionChangeFlag = $scope.arraysEqual($scope.state.selectionState, newSelectionState);

		if (selectionChangeFlag) {
			console.log('new selection state', newSelectionState);
		}

		console.info('Validated', $scope.$parent.layout.fieldTrigger);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL3Njb3BlLmpzIl0sIm5hbWVzIjpbIiRzY29wZSIsInN0YXRlIiwic2VsZWN0aW9uU3RhdGUiLCJjdXJyQXBwIiwic2VsZWN0aW9ucyIsImFycmF5c0VxdWFsIiwiYSIsImIiLCJsZW5ndGgiLCJpIiwiaXNBcnJheSIsImNvbXBvbmVudCIsIm1vZGVsIiwiVmFsaWRhdGVkIiwiYmluZCIsIm5ld1NlbGVjdGlvblN0YXRlIiwic2VsZWN0aW9uQ2hhbmdlRmxhZyIsImNvbnNvbGUiLCJsb2ciLCJpbmZvIiwiJHBhcmVudCIsImxheW91dCIsImZpZWxkVHJpZ2dlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7OztrQkFFZSxVQUFDQSxNQUFELEVBQVk7QUFDMUI7QUFDQTtBQUNBQSxRQUFPQyxLQUFQLEdBQWUsRUFBZjs7QUFJQSxLQUFJLENBQUNELE9BQU9DLEtBQVAsQ0FBYUMsY0FBbEIsRUFBa0M7QUFDakNGLFNBQU9DLEtBQVAsQ0FBYUMsY0FBYixHQUE4QixlQUFLQyxPQUFMLEdBQWVELGNBQWYsR0FBaUNFLFVBQS9EO0FBQ0E7O0FBRUQ7QUFDQTtBQUNBO0FBQ0FKLFFBQU9LLFdBQVAsR0FBcUIsVUFBVUMsQ0FBVixFQUFhQyxDQUFiLEVBQWdCO0FBQ3BDLE1BQUlELE1BQU1DLENBQVYsRUFBYSxPQUFPLElBQVA7QUFDYixNQUFJRCxLQUFLLElBQUwsSUFBYUMsS0FBSyxJQUF0QixFQUE0QixPQUFPLEtBQVA7QUFDNUIsTUFBSUQsRUFBRUUsTUFBRixJQUFZRCxFQUFFQyxNQUFsQixFQUEwQixPQUFPLEtBQVA7O0FBRTFCLE9BQUssSUFBSUMsSUFBSSxDQUFiLEVBQWdCQSxJQUFJSCxFQUFFRSxNQUF0QixFQUE4QixFQUFFQyxDQUFoQyxFQUFtQztBQUNsQztBQUNBLE9BQUlILEVBQUVHLENBQUYsRUFBS0MsT0FBTCxNQUFrQkgsRUFBRUUsQ0FBRixFQUFLQyxPQUFMLEVBQXRCLEVBQXNDO0FBQ3JDVixXQUFPSyxXQUFQLENBQW1CQyxFQUFFRyxDQUFGLENBQW5CLEVBQXlCRixFQUFFRSxDQUFGLENBQXpCO0FBQ0EsSUFGRCxNQUdLLElBQUlILEVBQUVHLENBQUYsTUFBU0YsRUFBRUUsQ0FBRixDQUFiLEVBQW1CO0FBQ3ZCLFdBQU8sS0FBUDtBQUNBO0FBQ0Q7QUFDRCxTQUFPLElBQVA7QUFDQSxFQWZEOztBQWlCQVQsUUFBT1csU0FBUCxDQUFpQkMsS0FBakIsQ0FBdUJDLFNBQXZCLENBQWlDQyxJQUFqQyxDQUF1QyxZQUFZO0FBQ2xELE1BQUlDLG9CQUFvQixlQUFLWixPQUFMLEdBQWVELGNBQWYsR0FBaUNFLFVBQXpEOztBQUVBLE1BQUlZLHNCQUFzQmhCLE9BQU9LLFdBQVAsQ0FBbUJMLE9BQU9DLEtBQVAsQ0FBYUMsY0FBaEMsRUFBZ0RhLGlCQUFoRCxDQUExQjs7QUFFQSxNQUFJQyxtQkFBSixFQUF5QjtBQUN4QkMsV0FBUUMsR0FBUixDQUFZLHFCQUFaLEVBQW1DSCxpQkFBbkM7QUFDQTs7QUFFREUsVUFBUUUsSUFBUixDQUFjLFdBQWQsRUFBMkJuQixPQUFPb0IsT0FBUCxDQUFlQyxNQUFmLENBQXNCQyxZQUFqRDtBQUVBLEVBWEQ7O0FBYUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7O0FBSUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDIiwiZmlsZSI6IjAuOWI1YmE2NzM0MDM5NGRmMmJlNGQuaG90LXVwZGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBxbGlrIGZyb20gJ3FsaWsnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgKCRzY29wZSkgPT4ge1xyXG5cdC8vZGV0ZWN0IGRhdGEgY2hhbmdlc1xyXG5cdC8vIGNvbnNvbGUubG9nKCdzY29wZSBjYWxsIHRlc3QnLCAkc2NvcGUsIHFsaWsuY3VyckFwcCgpLnNlbGVjdGlvblN0YXRlKCApLnNlbGVjdGlvbnMpO1xyXG5cdCRzY29wZS5zdGF0ZSA9IHtcclxuXHJcblx0fTtcclxuXHJcblx0aWYgKCEkc2NvcGUuc3RhdGUuc2VsZWN0aW9uU3RhdGUpIHtcclxuXHRcdCRzY29wZS5zdGF0ZS5zZWxlY3Rpb25TdGF0ZSA9IHFsaWsuY3VyckFwcCgpLnNlbGVjdGlvblN0YXRlKCApLnNlbGVjdGlvbnM7XHJcblx0fVxyXG5cclxuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblx0Ly8gQ3JlYXRlIGhlbHBlciBmdW5jdGlvbiBmb3IgYXJyYXkgZXF1YWxpdHkgL1xyXG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHQkc2NvcGUuYXJyYXlzRXF1YWwgPSBmdW5jdGlvbiAoYSwgYikge1xyXG5cdFx0aWYgKGEgPT09IGIpIHJldHVybiB0cnVlO1xyXG5cdFx0aWYgKGEgPT0gbnVsbCB8fCBiID09IG51bGwpIHJldHVybiBmYWxzZTtcclxuXHRcdGlmIChhLmxlbmd0aCAhPSBiLmxlbmd0aCkgcmV0dXJuIGZhbHNlO1xyXG4gIFxyXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBhLmxlbmd0aDsgKytpKSB7XHJcblx0XHRcdC8vaWYgbmVzdGVkIGFycmF5IC0gcmVjdXJzZSB0aGUgdmFsdWVcclxuXHRcdFx0aWYgKGFbaV0uaXNBcnJheSgpICYmIGJbaV0uaXNBcnJheSgpKSB7XHJcblx0XHRcdFx0JHNjb3BlLmFycmF5c0VxdWFsKGFbaV0sIGJbaV0pO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2UgaWYgKGFbaV0gIT09IGJbaV0pIHtcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHJldHVybiB0cnVlO1xyXG5cdH07XHJcblxyXG5cdCRzY29wZS5jb21wb25lbnQubW9kZWwuVmFsaWRhdGVkLmJpbmQoIGZ1bmN0aW9uICgpIHtcclxuXHRcdHZhciBuZXdTZWxlY3Rpb25TdGF0ZSA9IHFsaWsuY3VyckFwcCgpLnNlbGVjdGlvblN0YXRlKCApLnNlbGVjdGlvbnM7XHJcblx0XHRcclxuXHRcdHZhciBzZWxlY3Rpb25DaGFuZ2VGbGFnID0gJHNjb3BlLmFycmF5c0VxdWFsKCRzY29wZS5zdGF0ZS5zZWxlY3Rpb25TdGF0ZSwgbmV3U2VsZWN0aW9uU3RhdGUpO1xyXG5cclxuXHRcdGlmIChzZWxlY3Rpb25DaGFuZ2VGbGFnKSB7XHJcblx0XHRcdGNvbnNvbGUubG9nKCduZXcgc2VsZWN0aW9uIHN0YXRlJywgbmV3U2VsZWN0aW9uU3RhdGUpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGNvbnNvbGUuaW5mbyggJ1ZhbGlkYXRlZCcsICRzY29wZS4kcGFyZW50LmxheW91dC5maWVsZFRyaWdnZXIpO1xyXG5cdFx0XHJcblx0fSApO1xyXG5cclxuXHQvLyBnZXQgc2VsZWN0aW9uIHN0YXRlXHJcblxyXG5cdC8vIHN0b3JlIHNlbGVjdGlvbiBzdGF0ZSB0byBzY29wZVxyXG5cclxuXHQvLyBtZWFzdXJlIGN1cnJlbnQgc2VsZWN0aW9uIHN0YXRlIGFnYWluc3Qgc3RvcmVkIHNlbGVjdGlvbiBzdGF0ZVxyXG5cclxuXHQvLyBJRiAtIHVzZXIgY2hhbmdlZCBmaWVsZCBBTkQgZmllbGQgd2FzIHRhZ2dlZCBmb3IgY2hhbmdlc1xyXG5cdC8vIERPIHdoYXRldmVyIHVzZXIgYXNrZWRcclxuXHJcblx0Ly8gc3RvcmUgdXBkYXRlZCBzdGF0ZSB0byBzY29wZVxyXG5cclxuXHRcclxuXHJcblx0Ly8kc2NvcGUuYmFja2VuZEFwaS5zZWxlY3RWYWx1ZXMoKTtcclxuXHJcblx0Ly8gJHNjb3BlLmRhdGFBcnIgPSAkc2NvcGUubGF5b3V0LnFMaXN0T2JqZWN0LnFEYXRhUGFnZXNbMF0ucU1hdHJpeDtcclxuXHQvLyBjb25zb2xlLmxvZygnZGF0YSBjYWxsJywgJHNjb3BlLmRhdGFBcnIpO1xyXG5cclxuXHQvLyAkc2NvcGUuJHdhdGNoKCdsYXlvdXQucUxpc3RPYmplY3QucURhdGFQYWdlc1swXS5xTWF0cml4JywgZnVuY3Rpb24gKG5ld1ZhbCwgb2xkVmFsKSB7XHJcblx0Ly8gXHQvLyBpZiAoIWFycmF5c0VxdWFsKG9sZFZhbCxuZXdWYWwpICYmIG5ld1ZhbCE9PXVuZGVmaW5lZCl7XHJcblx0Ly8gXHRsZXQgY3VycmVudFRpbWUgPSBuZXcgRGF0ZTtcclxuXHJcblx0Ly8gXHRpZiAoJHNjb3BlLnRpbWVyVmFycy5ydW5uaW5nIT09dHJ1ZSkge1xyXG5cdC8vIFx0XHRjb25zb2xlLmxvZygndGhlIGRhdGEgaXMgYSBjaGFuZ2luJywgbmV3VmFsLCBvbGRWYWwsIGN1cnJlbnRUaW1lKTtcclxuXHQvLyBcdFx0JHNjb3BlLmRhdGFBcnIgPSBuZXdWYWw7XHJcblx0Ly8gXHR9IGVsc2Uge1xyXG5cdC8vIFx0XHRjb25zb2xlLmxvZygnZ28gYXdheSwgaVwibSBydW5uaW5nJywgY3VycmVudFRpbWUpO1xyXG5cdC8vIFx0fVxyXG5cdC8vIC8vIGxldCBkYXRhID0gZGF0YU9iaigkc2NvcGUuJHBhcmVudC5sYXlvdXQpO1xyXG5cdC8vIC8vIGNvbnNvbGUubG9nKCdkYXRhIGNoYW5nZSBmaXJlZCcsICRzY29wZS4kcGFyZW50LmxheW91dCk7XHJcblx0Ly8gLy8gZGF0YUNoYW5nZXMoZGF0YSwgJHNjb3BlLmlkKTtcclxuXHQvLyAvLyAvL2Z1bmN0aW9uIHRvIGNsZWFuIHVwIHNlbGVjdGlvbiBjbGFzc2VzIGFmdGVyIGRhdGEgY2hhbmdlc1xyXG5cdC8vIC8vIGJhclNlbGVjdGlvbkNsYXNzZXMoJHNjb3BlLiRwYXJlbnQubGF5b3V0LnFIeXBlckN1YmUucURhdGFQYWdlc1swXS5xTWF0cml4KTtcclxuXHQvLyAvLyB9XHJcblx0Ly8gfSk7XHJcbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29tcG9uZW50cy9zY29wZS5qcyJdLCJzb3VyY2VSb290IjoiIn0=