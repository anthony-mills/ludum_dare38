
ludumDare.Preloader = function (game) {

	this.background = null;
	this.preloadBar = null;

	this.ready = false;

};

ludumDare.Preloader.prototype = {

	preload: function () {

		this.background = this.add.sprite(0, 0, 'preloaderBackground');
		this.preloadBar = this.add.sprite(300, 400, 'preloaderBar');

		this.load.setPreloadSprite(this.preloadBar);

		// Assets to load down here
	},

	create: function () {
		this.preloadBar.cropEnabled = false;
	},

	update: function () {

	    this.camera.fade('#000000');

	    this.camera.onFadeComplete.add(function() {
	      this.state.start('MainMenu'); 
	    },this);

	}

};
