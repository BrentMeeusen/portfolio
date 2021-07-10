const menu = {
	open: () => {
		document.getElementById("nav").style.left = "0";
	},
	close: () => {
		document.getElementById("nav").style.left = "-80vw";
	}
}





window.addEventListener("load", () => {

	// Set click event for opening the menu
	document.getElementById("open-menu").addEventListener("click", () => {
		menu.open();
	});

});