// Variable to store application state
var state = {

	/* items is an array of objects. The objects are comprised of the shopping item name and a boolean to represent their checked status, 
	which is false by default */
	items: []
}

// function to add list-item objects to items array
function addItem (state, name) {
	var item = {
		itemName: name,
		checked: false
	}
	state.items.push(item);
}


// function to remove list-item objects from the items array
function deleteItem (state, index) {
	state.items.slice(index, 1);
}

// function to find index of object in items array
function getObjectIndex (state, button) {
	var spanVal = $(button).parents('li').find('.js-shopping-item').html();
	var itemIndex = state.items.findIndex(function(object) { return object.itemName === spanVal});
	return itemIndex;
}

// function to update objects within items array
function toggleChecked (state, item, button) {
	var index = getObjectIndex(state, button);
	if (state.items[index].checked === true) {
		state.items[index].checked = false;
	} else {
		state.items[index].checked = true;
	}
}


// function to render state

	// function to build HTML list items
	function buildListItem (itemName, checked) {
		var item = $(
			'<li>' +
		    '<span class="shopping-item js-shopping-item">' + itemName + '</span>' +
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
	 	if (checked) {
	 		item.find('.js-shopping-item').addClass('shopping-item__checked');
	 	}
 		return item;
	}

	function renderList (state, element) {
		var items = [];
		for (i=0;i < state.items.length; i++){
			item = buildListItem(state.items[i].itemName, state.items[i].checked);
			items.push(item);
		}
		console.log(items);
		element.html(items);
	};

// event listeners to fire functions


	// event listener to fire deleteItem function

	// event listener to fire toggleCheckedClass function

// function handlers attached to event listeners within document.ready
$(document).ready(function() {
	$('#js-shopping-list-form').submit(function (event) {
		event.preventDefault();
		addItem(state, $('#shopping-list-entry').val());
		renderList(state, $('ul.shopping-list'));
		$('#shopping-list-entry').val('');
    $('#shopping-list-entry').focus();
	});

	$(document).on('click', '.js-shopping-item-toggle', function (event) {
		toggleChecked(state, $(event.target).parents('li').find('.js-shopping-item').html(), $(event.target));
		renderList(state, $('ul.shopping-list'));
	}); 
})