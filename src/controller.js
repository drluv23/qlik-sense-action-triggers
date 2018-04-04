import Scope from './components/scope';
// import template from './components/template.html';

export const controller = ($scope) => {
	console.log('scoped');
	Scope($scope);

	// console.log('module', module);
	if(module.hot) {
		module.hot.accept('./components/scope', () => {
			console.log('hot update scope');
			const NextScope = require('./components/scope').default;
			NextScope($scope);
		});
	}
};