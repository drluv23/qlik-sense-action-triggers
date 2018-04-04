export const definition = {
	type : 'items',
	component : 'accordion',
	items: {
		settings: {
			uses: 'settings',
			items: {
				MyList: {
					type: 'array',
					ref: 'listItemArr',
					label: 'Action Triggers',
					itemTitleRef: 'label',
					allowAdd: true,
					allowRemove: true,
					addTranslation: 'Add Trigger',
					items: {
						sourceField: {
							type: 'string',
							ref: 'fieldTrigger.sourceField',
							label: 'Target Field',
							expression: 'optional',
						},
						typeDropdown: {
							type: 'string',
							component: 'dropdown',
							label: 'Type',
							ref: 'fieldTrigger.eventType',
							options: [{
								value: 'select',
								label: 'OnSelect',
							}, {
								value: 'change',
								label: 'OnChange',
							}],
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
							}],
							defaultValue: 'selectField',
						},
						targetField: {
							type: 'string',
							ref: 'fieldTrigger.targetField',
							label: 'Target Field',
							expression: 'optional',
						},
						targetFieldSearchString: {
							type: 'string',
							ref: 'fieldTrigger.targetFieldSearchString',
							label: 'Search String',
							expression: 'optional',
						},
					},
				},
			},
		},
	},
};

// export const definition = {
// 	type: 'items',
// 	component: 'accordion',
// 	items: {
// 		// dimensions: {
// 		// 	uses: 'dimensions',
// 		// 	min: 0,
// 		// },
// 		// dimension: {
// 		// 	type: 'items',
// 		// 	label: 'Dimensions',
// 		// 	ref: 'qListObjectDef',
// 		// 	min: 1,
// 		// 	max: 1,
// 		// 	items: {
// 		// 		label: {
// 		// 			type: 'string',
// 		// 			ref: 'qListObjectDef.qDef.qFieldLabels.0',
// 		// 			label: 'Label',
// 		// 			show: true,
// 		// 		},
// 		// 		libraryId: {
// 		// 			type: 'string',
// 		// 			component: 'library-item',
// 		// 			libraryItemType: 'dimension',
// 		// 			ref: 'qListObjectDef.qLibraryId',
// 		// 			label: 'Dimension',
// 		// 			show: function ( data ) {
// 		// 				return data.qListObjectDef && data.qListObjectDef.qLibraryId;
// 		// 			},
// 		// 		},
// 		// 		field: {
// 		// 			type: 'string',
// 		// 			expression: 'always',
// 		// 			expressionType: 'dimension',
// 		// 			ref: 'qListObjectDef.qDef.qFieldDefs.0',
// 		// 			defaultValue: '=ValueList("A","B","C")',
// 		// 			label: 'Field',
// 		// 			show: function ( data ) {
// 		// 				return data.qListObjectDef && !data.qListObjectDef.qLibraryId;
// 		// 			},
// 		// 		},
// 		// 		frequency: {
// 		// 			type: 'string',
// 		// 			component: 'dropdown',
// 		// 			label: 'Frequency mode',
// 		// 			ref: 'qListObjectDef.qFrequencyMode',
// 		// 			options: [{
// 		// 				value: 'N',
// 		// 				label: 'No frequency',
// 		// 			}, {
// 		// 				value: 'V',
// 		// 				label: 'Absolute value',
// 		// 			}, {
// 		// 				value: 'P',
// 		// 				label: 'Percent',
// 		// 			}, {
// 		// 				value: 'R',
// 		// 				label: 'Relative',
// 		// 			}],
// 		// 			defaultValue: 'V',
// 		// 		},
// 		// 		qSortByLoadOrder: {
// 		// 			type: 'numeric',
// 		// 			component: 'dropdown',
// 		// 			label: 'Sort by Load Order',
// 		// 			ref: 'qListObjectDef.qDef.qSortCriterias.0.qSortByLoadOrder',
// 		// 			options: [{
// 		// 				value: 1,
// 		// 				label: 'Ascending',
// 		// 			}, {
// 		// 				value: 0,
// 		// 				label: 'No',
// 		// 			}, {
// 		// 				value: -1,
// 		// 				label: 'Descending',
// 		// 			}],
// 		// 			defaultValue: 0,
// 		// 		},
// 		// 		qSortByState: {
// 		// 			type: 'numeric',
// 		// 			component: 'dropdown',
// 		// 			label: 'Sort by State',
// 		// 			ref: 'qListObjectDef.qDef.qSortCriterias.0.qSortByState',
// 		// 			options: [{
// 		// 				value: 1,
// 		// 				label: 'Ascending',
// 		// 			}, {
// 		// 				value: 0,
// 		// 				label: 'No',
// 		// 			}, {
// 		// 				value: -1,
// 		// 				label: 'Descending',
// 		// 			}],
// 		// 			defaultValue: 0,
// 		// 		},
// 		// 		qSortByFrequency: {
// 		// 			type: 'numeric',
// 		// 			component: 'dropdown',
// 		// 			label: 'Sort by Frequence',
// 		// 			ref: 'qListObjectDef.qDef.qSortCriterias.0.qSortByFrequency',
// 		// 			options: [{
// 		// 				value: -1,
// 		// 				label: 'Ascending',
// 		// 			}, {
// 		// 				value: 0,
// 		// 				label: 'No',
// 		// 			}, {
// 		// 				value: 1,
// 		// 				label: 'Descending',
// 		// 			}],
// 		// 			defaultValue: 0,
// 		// 		},
// 		// 		qSortByNumeric: {
// 		// 			type: 'numeric',
// 		// 			component: 'dropdown',
// 		// 			label: 'Sort by Numeric',
// 		// 			ref: 'qListObjectDef.qDef.qSortCriterias.0.qSortByNumeric',
// 		// 			options: [{
// 		// 				value: 1,
// 		// 				label: 'Ascending',
// 		// 			}, {
// 		// 				value: 0,
// 		// 				label: 'No',
// 		// 			}, {
// 		// 				value: -1,
// 		// 				label: 'Descending',
// 		// 			}],
// 		// 			defaultValue: 0,
// 		// 		},
// 		// 		qSortByAscii: {
// 		// 			type: 'numeric',
// 		// 			component: 'dropdown',
// 		// 			label: 'Sort by Alphabetical',
// 		// 			ref: 'qListObjectDef.qDef.qSortCriterias.0.qSortByAscii',
// 		// 			options: [{
// 		// 				value: 1,
// 		// 				label: 'Ascending',
// 		// 			}, {
// 		// 				value: 0,
// 		// 				label: 'No',
// 		// 			}, {
// 		// 				value: -1,
// 		// 				label: 'Descending',
// 		// 			}],
// 		// 			defaultValue: 0,
// 		// 		},
// 		// 	},
// 		// },
// 		// data: {
// 		// 	uses: 'data',
// 		// },
// 		// measures: {
// 		// 	uses: 'measures',
// 		// },
// 		// sorting: {
// 		// 	uses: 'sorting',
// 		// },

// 		// button: {
// 		// 	label:'Click me',
// 		// 	component: 'button',
// 		// 	action: function(data){
// 		// 		alert('click!', data);
// 		// 	},
// 		// },
// 		appearance: {
// 			uses: 'settings',
// 			items: {
// 				MyList: {
// 					type: 'array',
// 					ref: 'listItems',
// 					label: 'List Items',
// 					itemTitleRef: 'label',
// 					allowAdd: true,
// 					allowRemove: true,
// 					addTranslation: 'Add Item',
// 					items: {
// 						label: {
// 							type: 'string',
// 							ref: 'label',
// 							label: 'Label',
// 							expression: 'optional',
// 						},
// 						textarea: {
// 							label:'My textarea',
// 							component: 'textarea',
// 							maxlength: 100,
// 							ref: 'myTextarea',
// 						},
// 					},
// 				},
// 			},
// 		},
// 	},
// };