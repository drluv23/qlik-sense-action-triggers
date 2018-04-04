import qlik from 'qlik';
import '../styles/styles.css';


export default ($element, layout, app_this) => {
	console.log('qlik', qlik, 'layout', layout, 'this', app_this);

	console.log('currapp', qlik.currApp().selectionState( ).selections);



	// const name = layout.qListObject.qDataPages[0].qMatrix[3][0].qText;

	// /*start of old code*/
	// let app_this = this,
	// 	chartID = layout.qInfo.qId;

	// // set layout variable to create id used to set the div id
	// app_this.$scope.id= chartID;
	// /*end of old code*/

	// let app_this = this;
	// console.log('app_this', app_this);

	// const node = `
	// 	<div>
	// 		<p>This Node here` + name + `</p>
	// 	</div>`;
	// const node = '<div ng-bind-template="'+ ngTemplate() +'"></div>';

	// const node = document.createElement('h1');
	// node.className='qv-object-sense-paginate-data';
	// node.innerHTML = '<h1>Hi there qlk!' + name + '</h1>';
	// $element.html(node);
};