// Create single-state object
var state = {
	items: [],
	itemClass: []
}

// Create state-changing functions
var addItem = function(state, itemName) {
	state.items.push(itemName);
}

// Create state-rendering functions
var renderList = function(state, element) {
	var itemsHTML = state.items.map(function(item) {
		return '\
		<li>\
            <span class="shopping-item">' + item + '</span>\
            <div class="shopping-item-controls">\
            <button class="shopping-item-toggle">\
                <span class="button-label">check</span>\
            </button>\
            <button class="shopping-item-delete">\
                <span class="button-label">delete</span>\
            </button>\
            </div>\
        </li>';
	});
	console.log(itemsHTML)
	element.append(itemsHTML);
};

// Create Event-listeners to fire functions
$("#js-shopping-list-form").submit(function (event) {
	event.preventDefault();
	addItem(state, $("#shopping-list-entry").val());
	renderList(state, $(".shopping-list"));
	$("#shopping-list-entry").val("");
	$("#shopping-list-entry").focus();
});