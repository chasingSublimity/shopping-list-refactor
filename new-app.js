// Create single-state object
var state = {
	items: []
};

// List item HTML template
var liTemplate = (
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
)

// State-changing functions
var addItem = function(state, itemName) {
	state.items.push({
		name: itemName,
		checked: false
	});
};

var getItem = function(state, index) {
	return state.items[index];
}

var deleteItem = function(state, index) {
	state.items.slice(index, 1)
}

var updateItem = function(state, index, newState) {
	state.items[index] = newState;
}


// Create state-rendering functions
var buildItem = function (item, id, template, attr) {
	var listItem = $(template);
	listItem.find('.js-shopping-item').text(item.name);
	if (item.checked) {
		listItem.find('.js-shopping-item').addClass('.js-shopping-item__checked')
	}
	
}

var renderList = function(state, list, attr) {
	var itemList = state.items.map(
		function(item, index) {
			return buildItem(item, index, listItemTemplate, attr);
		})
	list.html(itemsHTML);
};

// Create Event-listeners to fire functions
$('#js-shopping-list-form').submit(function (event) {
	event.preventDefault();
	addItem(state, $('#shopping-list-entry').val());
	renderList(state, $('.shopping-list'));
	$('#shopping-list-entry').val('');
	$('#shopping-list-entry').focus();
});