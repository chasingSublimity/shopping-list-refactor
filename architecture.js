// Variable to store application state
	var state = {

		/* items is an array of objects. The objects are comprised of the shopping item name and a boolean to represent their checked status, 
		which is false by default */
		items: []
	};

// functions to modify state

	// function to add list-item objects to items array
	var addItem = function(state, name) {
		var item = {
			itemName: name,
			checked: false
		};
		state.items.push(item);
	};

	// function to remove list-item objects from the items array
	var deleteItem = function(state, index) {
		state.items.slice(index, 1);
	};

	// function to update objects within items array
	var updateItem = function(state, index, newData) {
		state.items[index] = newData;
	};

// function to render state

	// function to build HTML list items
	var renderList = function(state, element) {
		var liTemplate = $(
			'<li>' +
		    '<span class="shopping-item js-shopping-item"></span>' +
		    '<div class="shopping-item-controls">' +
		      '<button class="js-shopping-item-toggle">' +
		        '<span class="button-label">check</span>' +
		      '</button>' +
		      '<button class="js-shopping-item-delete">' +
		        '<span class="button-label">delete</span>' +
		      '</button>' +
		    '</div>' +
		  '</li>'
		);
		var itemNames = [];
		for (i=0; i < (state.items).length; i++) {
			itemNames.push(state.items[i]['itemName']);
		};
		var liItems = itemNames.map(function(itemName) {
			liTemplate.find('.js-shopping-item').text(itemName);
			return liTemplate;
		});
		console.log(liItems);
		element.html(liItems);
	};

	// function to toggle shopping-item__checked class
	var toggleCheckedClass = function() {

	};

// event listeners to fire functions


	// event listener to fire deleteItem function

	// event listener to fire toggleCheckedClass function

// function handlers attached to event listeners within document.ready
$(document).ready(function() {
	$("#js-shopping-list-form").submit(function (event) {
		event.preventDefault();
		addItem(state, $('#shopping-list-entry').val());
		renderList(state, $('ul.shopping-list'));
		$("#shopping-list-entry").val("");
    $("#shopping-list-entry").focus();
	});

})