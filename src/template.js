// import ngTemplate from './components/ngTemplate';

// export const template = () => {
// 	// console.log('templater', ngTemplate());
// 	let text = ngTemplate();

// 	// console.log('module', module);
// 	if(module.hot) {
// 		module.hot.accept('./components/ngTemplate', () => {
// 			console.log('hot update');
// 			const NextNgTemplate = require('./components/ngTemplate').default;
// 			text = NextNgTemplate();
// 			console.log('templater text', text);
// 			return text;
// 		});
// 	}
// 	return text;
// };

//{{dataArr[1][0].qText}} - {{dataArr[1][0].qState}}

export const template = `<div qv-extension>
<p>Blank text</p>
</div>`;