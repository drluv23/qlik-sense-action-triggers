webpackHotUpdate(0,{

/***/ "./paint.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.paint = undefined;

var _component = __webpack_require__("./components/component.js");

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var paint = exports.paint = function paint($element, layout) {
	console.log('painted', $element, undefined);
	(0, _component2.default)($element, layout, undefined);

	// console.log('module', module);
	if (true) {
		module.hot.accept("./components/component.js", function () {
			console.log('hot update', undefined);
			var NextComponent = __webpack_require__("./components/component.js").default;
			NextComponent($element, layout, undefined);
		});
	}
};

/***/ })

})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wYWludC5qcyJdLCJuYW1lcyI6WyJwYWludCIsIiRlbGVtZW50IiwibGF5b3V0IiwiY29uc29sZSIsImxvZyIsIm1vZHVsZSIsImhvdCIsImFjY2VwdCIsIk5leHRDb21wb25lbnQiLCJyZXF1aXJlIiwiZGVmYXVsdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7QUFFTyxJQUFNQSx3QkFBUSxTQUFSQSxLQUFRLENBQUNDLFFBQUQsRUFBV0MsTUFBWCxFQUFzQjtBQUMxQ0MsU0FBUUMsR0FBUixDQUFZLFNBQVosRUFBdUJILFFBQXZCO0FBQ0EsMEJBQVVBLFFBQVYsRUFBb0JDLE1BQXBCOztBQUVBO0FBQ0EsS0FBRyxJQUFILEVBQWU7QUFDZEcsU0FBT0MsR0FBUCxDQUFXQyxNQUFYLENBQWtCLDJCQUFsQixFQUE0QyxZQUFNO0FBQ2pESixXQUFRQyxHQUFSLENBQVksWUFBWjtBQUNBLE9BQU1JLGdCQUFnQixtQkFBQUMsQ0FBUSwyQkFBUixFQUFrQ0MsT0FBeEQ7QUFDQUYsaUJBQWNQLFFBQWQsRUFBd0JDLE1BQXhCO0FBQ0EsR0FKRDtBQUtBO0FBQ0QsQ0FaTSxDIiwiZmlsZSI6IjAuY2E0ZmRmMzg1YzAxNDYzM2E3OGMuaG90LXVwZGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb21wb25lbnQgZnJvbSAnLi9jb21wb25lbnRzL2NvbXBvbmVudCc7XHJcblxyXG5leHBvcnQgY29uc3QgcGFpbnQgPSAoJGVsZW1lbnQsIGxheW91dCkgPT4ge1xyXG5cdGNvbnNvbGUubG9nKCdwYWludGVkJywgJGVsZW1lbnQsIHRoaXMpO1xyXG5cdENvbXBvbmVudCgkZWxlbWVudCwgbGF5b3V0LCB0aGlzKTtcclxuXHJcblx0Ly8gY29uc29sZS5sb2coJ21vZHVsZScsIG1vZHVsZSk7XHJcblx0aWYobW9kdWxlLmhvdCkge1xyXG5cdFx0bW9kdWxlLmhvdC5hY2NlcHQoJy4vY29tcG9uZW50cy9jb21wb25lbnQnLCAoKSA9PiB7XHJcblx0XHRcdGNvbnNvbGUubG9nKCdob3QgdXBkYXRlJywgdGhpcyk7XHJcblx0XHRcdGNvbnN0IE5leHRDb21wb25lbnQgPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvY29tcG9uZW50JykuZGVmYXVsdDtcclxuXHRcdFx0TmV4dENvbXBvbmVudCgkZWxlbWVudCwgbGF5b3V0LCB0aGlzKTtcclxuXHRcdH0pO1xyXG5cdH1cclxufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9wYWludC5qcyJdLCJzb3VyY2VSb290IjoiIn0=