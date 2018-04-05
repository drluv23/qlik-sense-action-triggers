// requirejs.config({
//     paths: {
//       d3: "../extensions/sense-d3-gantt/assets/js/d3.min",
//       lasso: "../extensions/sense-d3-gantt/assets/js/d3-lasso"
//     },
// 	shim : {
// 		"lasso" : {
//           "exports" : "lasso",
// 			"deps" : ["d3"]
// 		}
// 	}
// });
define( ["qlik"], 
	function (qlik) {//, lasso
	'use strict';


	return {
		template: '<div qv-extension></div>',
		initialProperties : {
			qListObjectDef : {
				qShowAlternatives : true,
				qFrequencyMode : 'V',
				qInitialDataFetch : [{
					qWidth : 2,
					qHeight : 50,
				}],
			},
		},
		definition : {
			type : 'items',
			component : 'accordion',
			items: {
				MyList: {
					type: 'array',
					ref: 'fieldTrigger',
					label: 'Action Triggers',
					itemTitleRef: 'label',
					allowAdd: true,
					allowRemove: true,
					addTranslation: 'Add Trigger',
					items: {
						dimension: {
							type: 'items',
							label: 'Dimensions',
							ref: 'qListObjectDef',
							min: 1,
							items: {
								label: {
									type: 'string',
									ref: 'qListObjectDef.qDef.qFieldLabels.0',
									label: 'Label',
									show: true,
								},
								sourceField: {
									type: 'string',
									ref: 'qListObjectDef.qDef.qFieldDefs.0',
									label: 'Target Field',
									expressionType: 'dimension',
									expression: 'always',
								},
								typeDropdown: {
									type: 'string',
									component: 'dropdown',
									label: 'Type',
									ref: 'fieldTrigger.eventType',
									options: [{
										value: 'select',
										label: 'OnSelect',
									},
									// {
									// 	value: 'change',
									// 	label: 'OnChange',
									// }
									],
									defaultValue: 'select',
								},
								actionDropdown: {
									type: 'string',
									component: 'dropdown',
									label: 'Type',
									ref: 'fieldTrigger.actionType',
									options: [{
										value: 'selectField',
										label: 'Select in Field',
									}, {
										value: 'selectExcluded',
										label: 'Select Excluded',
									}, {
										value: 'selectPossible',
										label: 'Select Possible',
									},{
										value: 'clearField',
										label: 'Clear Field',
									}, {
										value: 'lockField',
										label: 'Lock Field',
									}, {
										value: 'unlockField',
										label: 'Unlock Field',
									}],
									defaultValue: 'selectField',
								},
								targetField: {
									type: 'string',
									ref: 'fieldTrigger.targetField',
									expressionType: 'dimension',
									label: 'Target Field',
									expression: 'optional',
								},
								targetFieldSearchString: {
									type: 'string',
									ref: 'fieldTrigger.targetFieldSearchString',
									label: 'Search String',
									expression: 'optional',
									show: function (x) {
										return x.fieldTrigger.actionType === 'selectField';
									},
								},
								// field: {
								// 	type: 'string',
								// 	expression: 'always',
								// 	expressionType: 'dimension',
								// 	ref: 'qListObjectDef.qDef.qFieldDefs.0',
								// 	label: 'Field',
								// },
							},
						},
					},
				},
			},
		},
		paint: function ( $element, layout ) {
		},
		controller: ['$scope', function ($scope) {
	// Initialization code
	$scope.state = {
		triggers: [],
		selectionHashes: {},
		programmicChangeFlag: false,
	};

	// console.log('selection state check', $scope.state.selectionState);

	// ![Usage](https://github.com/alner/ExtensionTemplate/blob/master/doc/usage.gif?raw=true)

	// Functions

	$scope.createSelectionObj = function ( selections ) {
		return selections.map((selection) => {
			return {
				field: selection.fieldName,
				selected: selection.qSelected,
			};
		});
	};

	//////////////////////////////////////////////
	// Create helper function for array equality /
	//////////////////////////////////////////////
	$scope.arraysEqual = function (x, y) {
		'use strict';

		if (x === null || x === undefined || y === null || y === undefined) { return x === y; }
		// after this just checking type of one would be enough
		if (x.constructor !== y.constructor) { return false; }
		// if they are functions, they should exactly refer to same one (because of closures)
		if (x instanceof Function) { return x === y; }
		// if they are regexps, they should exactly refer to same one (it is hard to better equality check on current ES)
		if (x instanceof RegExp) { return x === y; }
		if (x === y || x.valueOf() === y.valueOf()) { return true; }
		if (Array.isArray(x) && x.length !== y.length) { return false; }
	
		// if they are dates, they must had equal valueOf
		if (x instanceof Date) { return false; }
	
		// if they are strictly equal, they both need to be object at least
		if (!(x instanceof Object)) { return false; }
		if (!(y instanceof Object)) { return false; }
	
		// recursive object equality check
		var p = Object.keys(x);
		return Object.keys(y).every(function (i) { return p.indexOf(i) !== -1; }) &&
			p.every(function (i) { return $scope.arraysEqual(x[i], y[i]); });
	};

	$scope.createHash = function( val ) {
		var hash = 0;
		if (val.length == 0) {
			return hash;
		}
		for (var i = 0; i < val.length; i++) {
			var char = val.charCodeAt(i);
			hash = ((hash<<5)-hash)+char;
			hash = hash & hash; // Convert to 32bit integer
		}
		return hash;
	};

	$scope.createFieldTriggerMap = function ( fieldTriggers ) {

		// clear trigger array in case triggers were removed
		$scope.state.triggers = [];

		// loop through each field trigger and create a clean record
		fieldTriggers.map((trigger) => {
			$scope.state.triggers.push({
				field: trigger.qListObject.qDimensionInfo.qGroupFieldDefs[0],
				actionType: trigger.fieldTrigger.actionType,
				eventType: trigger.fieldTrigger.eventType,
				targetField: trigger.fieldTrigger.targetField,
				targetFieldSearchString: trigger.fieldTrigger.targetFieldSearchString,
				triggerFired: false,
			});
	
		});
		// console.log('final hashes', $scope.state.triggers);
	};

	$scope.diffArrays = function (hashArray, diffArray) {
		// hash newest selections
		// console.log('hashArray', hashArray, 'diffArray', diffArray);
		$scope.state.selectionHashes = {};
		hashArray.map((currSelection) => {
			$scope.state.selectionHashes[(currSelection.field + '|' + currSelection.selected)] = currSelection;
		});

		diffArray.filter(function(prevSelection) {
			return !$scope.state.selectionHashes[(prevSelection.field + '|' + prevSelection.selected)];
		});

		// console.log('not found selections', diffArray);
		return diffArray;
		// diffArray.map((prevSelection) => {
		// 	console.log('prev sel hashes', $scope.state.selectionHashes[($scope.createHash(prevSelection.field + '|' + prevSelection.selected))], prevSelection);
		// 	if (!$scope.state.selectionHashes[($scope.createHash(prevSelection.field + '|' + prevSelection.selected))]) {
				
		// 		return prevSelection;
		// 	}
		// });

		// console.log('hash table', $scope.state.selectionHashes);
	};

	$scope.runTrigger = function ( trigger, context ) {
		console.log('trigger called', trigger, context);

		$scope.state.selectionState.selections.map((sel) => {
			console.log('selections', sel);
		});

		switch (trigger.actionType) {
		case 'selectField':
			console.log('selection');
			$scope.state.programmicChangeFlag = true;
			qlik.currApp().field(trigger.targetField).selectValues([{qText: trigger.targetFieldSearchString}], true, true);
			break;
		case 'selectExcluded':
			$scope.state.programmicChangeFlag = true;
			qlik.currApp().field(trigger.targetField).selectExcluded();
			break;
		case 'selectPossible':
			console.log('selection pos');
			$scope.state.programmicChangeFlag = true;
			qlik.currApp().field(trigger.targetField).selectExcluded();
			break;
		case 'clearField':
			$scope.state.programmicChangeFlag = true;
			qlik.currApp().field(trigger.targetField).clear();
			break;
		case 'lockField':
			$scope.state.programmicChangeFlag = true;
			qlik.currApp().field(trigger.targetField).lock();
			break;
		case 'unlockField':
			$scope.state.programmicChangeFlag = true;
			qlik.currApp().field(trigger.targetField).unlock();
			break;
		default:
			console.log('nobody home on these triggers');
			break;
		}
	};
	// $scope.component.model.Invalidated.bind( function () {
	// 	console.info( 'Invalidated' );
	// 	$scope.state.prevSelectionState = $scope.state.selectionState;
	// } );
	$scope.selectionListener = function() {
		console.log('change type', $scope.state.programmicChangeFlag);
		if ($scope.state.programmicChangeFlag) {
			$scope.state.programmicChangeFlag = false;
			return;
		}
		console.log('prog flag after field selection', $scope.state.programmicChangeFlag);

		var newSelections = $scope.createSelectionObj($scope.state.selectionState.selections);
		console.log('event', $scope.state.selectionState, 'newObj', newSelections, 'prevObj', $scope.state.selectionObj);
		console.log('scope', $scope);

		// check if new selections and old selections are the same
		var selectionChangeFlag = $scope.arraysEqual($scope.state.selectionObj, newSelections);
		// console.log('status', selectionChangeFlag);

		
		// check if selections have changed since last time process was checked
		if (selectionChangeFlag===false) {

			$scope.createFieldTriggerMap($scope.$parent.layout.fieldTrigger);
			console.log($scope.$parent.layout.fieldTrigger);

			

			// diff selections to catch newest selection/clea
			// check counts, if new > old then new selection, if old < new then cleared
			// if counts equal, loop through new and inner loop through old checking values
			if ($scope.state.selectionObj.length>newSelections.length) {
				// selection cleared
				var clearedSelection = $scope.diffArrays(newSelections, $scope.state.selectionObj);
				console.log('selection cleared', clearedSelection);

			} else if ($scope.state.selectionObj.length<newSelections.length) {
				// selection made
				var madeSelection = $scope.diffArrays($scope.state.selectionObj, newSelections);

				var targetedTrigger = $scope.state.triggers.filter((trigger) => {
					return trigger.field===madeSelection[0].field;
				});

				console.log('selection made', madeSelection, 'target', targetedTrigger);
				
				targetedTrigger.map((indivTrigger) => {
					$scope.runTrigger(indivTrigger, madeSelection[0].field);
				});
			} else if ($scope.arraysEqual($scope.state.selectionObj, newSelections)) {
				console.log('what are you doing here! these arrays are the same');
			} else {
				// check which values were cleared or made
				var fieldChange = $scope.diffArrays(newSelections, $scope.state.selectionObj);
				console.log('changes in field', fieldChange);
			}
		}

		$scope.state.selectionObj = newSelections;

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

		$scope.state.selectionState = qlik.currApp().selectionState( );
		$scope.state.selectionState.OnData.bind( $scope.selectionListener );

		$scope.state.selectionObj = $scope.createSelectionObj($scope.state.selectionState.selections);


		console.log('inital selection state', $scope.state.selectionState);

	}
		}]
	};

} );
