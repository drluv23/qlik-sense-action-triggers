export default () => {
	return `<div qv-extension>
		<p ng-click="stepPosition(-1)">Previous</p>
		<p ng-click="pageRunner()">{{timerVars.running}}</p>
		<p ng-click="stepPosition(1)">Next</p>
		<p ng-repeat="(key, value) in dataArr">{{value[0].qText}} - {{value[0].qState}}</p>
	</div>`;
};