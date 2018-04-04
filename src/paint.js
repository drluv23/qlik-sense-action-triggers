import Component from './components/component';

export const paint = ($element, layout) => {
	console.log('painted', $element, this);
	Component($element, layout, this);

	// console.log('module', module);
	if(module.hot) {
		module.hot.accept('./components/component', () => {
			console.log('hot update', this);
			const NextComponent = require('./components/component').default;
			NextComponent($element, layout, this);
		});
	}
};