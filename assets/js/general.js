/**
 * LAZY LOADING
 */
 class LazyLoading {

	allImages = [];





	/**
	 * LazyLoading constructor
	 *  
	 * @param {string} name The class name that all images have
	 */
	constructor(name) {
		
		// Set the name and allImages
		this.name = name;
		this.allImages = this.getAllImagesByClassName();

		// Add scroll EventListener
		this.loadImages();
		window.addEventListener("scroll", () => {
			this.loadImages();
		});

	}





	/**
	 * Gets all images with the class name given in the constructor
	 */
	getAllImagesByClassName() {

		const images = document.getElementsByClassName(this.name);
		const list = [];
		
		for(const img of images) {
			list.push(new LazyImage(img));
		}
		return list;

	}





	/**
	 * Lazy loads all images found, should be triggered on scroll
	 */
	loadImages() {

		// Get the current page offset
		const d = document.documentElement;
		const top = (window.pageYOffset || d.scrollTop)  - (d.clientTop || 0);
		
		// Check for every image if it's (almost) in view
		for(let i = 0; i < this.allImages.length; i++) {

			var imgTop = this.allImages[i].image.offsetTop;
			if(imgTop < top + window.innerHeight  * 1.1) {
				this.allImages[i].load();
			}

		}

	}	// loadImages()

}	// class LazyLoading










class LazyImage {

	loadBig = !(window.innerWidth < 992);
	loaded = { small: false, medium: false, big: false };





	/**
	 * LazyImage constructor
	 * 
	 * @param {HTMLElement} image The image element
	 */
	constructor(image) {

		this.image = image;
		this.src = image.dataset.src;
		this.extension = image.dataset.extension;
		
	}





	/**
	 * Lazy load image
	 */
	load() {

		// If medium is loaded, load big
		if(this.loaded.medium) {

			this.image.src = this.src + "." + this.extension;
			this.image.addEventListener("load", () => {
				this.loaded.medium = true;
			});

		}

		// If small is loaded, load medium
		else if(this.loaded.small) {

			this.image.src = this.src + "-medium." + this.extension;
			this.image.addEventListener("load", () => {
				if(this.loaded.medium) { return false; }
				this.image.classList.remove("small");
				this.loaded.medium = true;
				if(this.loadBig) { this.load(); }
			});

		}

		// If small is not loaded, load small
		else if(!this.loaded.small) {

			this.image.src = this.src + "-small." + this.extension;
			this.image.addEventListener("load", () => {
				if(this.loaded.small) { return false; }
				this.image.classList.add("small");
				this.loaded.small = true;
				this.load();
			});

		}

	}	// load()

}	// LazyImage










const menu = {
	open: () => {
		document.getElementById("nav").style.left = "0";
	},
	close: () => {
		document.getElementById("nav").style.left = -document.getElementById("nav").clientWidth - 5 + "px";
	}
}
const lazy = new LazyLoading("lazy");





window.addEventListener("load", () => {

	// Setup lazy loading
	lazy.getAllImagesByClassName();
	lazy.loadImages();

	// Set age
	const birthday = new Date(2002, 0, 23);
	const diff = new Date(Date.now() - birthday.getTime());
	document.getElementById("age").innerHTML = diff.getFullYear() - 1970;

	// Set click event for opening the menu
	document.getElementById("open-menu").addEventListener("click", () => {
		menu.open();
	});

	// Set click event for closing the menu
	document.getElementById("close-menu").addEventListener("click", () => {
		menu.close();
	});

});

window.addEventListener("scroll", () => {
	lazy.loadImages();
});