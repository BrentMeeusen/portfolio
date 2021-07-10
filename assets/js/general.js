const menu = {
	init: () => {
		console.log(this, "joemama");
	},
	open: () => {

	}
}





window.addEventListener("load", () => {

	// Initialise menu
	menu.init();

	// Set click event for opening the menu
	document.getElementById("open-menu").addEventListener("click", () => {
		menu.open();
	});

});