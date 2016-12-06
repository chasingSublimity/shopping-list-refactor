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

// function to remove list-item objects from the items array
function deleteItem (state, button) {
	var index = getObjectIndex(state, button);
	state.items.splice(index, 1);
	console.log(index);
	console.log(state.items);
}

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

// function to render list items
function renderList (state, element) {
	var items = [];
	for (i=0;i < state.items.length; i++){
		item = buildListItem(state.items[i].itemName, state.items[i].checked);
		items.push(item);
	}
	element.html(items);
}


// function handlers attached to event listeners within document.ready
$(document).ready(function() {

	// add shopping item
	$('#js-shopping-list-form').submit(function (event) {
		event.preventDefault();
		addItem(state, $('#shopping-list-entry').val());
		renderList(state, $('ul.shopping-list'));
		$('#shopping-list-entry').val('');
    $('#shopping-list-entry').focus();
	})

	// check shopping item
	$(document).on('click', '.js-shopping-item-toggle', function (event) {
		toggleChecked(state, $(event.target).parent('li').find('.js-shopping-item').html(), $(event.target));
		renderList(state, $('ul.shopping-list'));
	})

	// delete shopping item
	$(document).on('click', '.js-shopping-item-delete', function (event) {
		deleteItem(state, $(event.target));
		renderList(state, $('ul.shopping-list'));
	})
})