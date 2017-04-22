
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

		// Load in the player character
		this.load.atlas('cockroachSprite', 'img/cockroach/cockroach.png', 'img/cockroach/cockroach.json');	

		this.load.image('menuBg', 'img/tiles.jpg');	

		this.load.image('wall', 'img/map/wall.png');
		this.load.image('floor', 'img/map/floor.png');						
	},

	create: function () {
		this.preloadBar.cropEnabled = false;
	},

	update: function () {

	    this.camera.fade('#000000', 1000);

	    this.camera.onFadeComplete.add(function() {
	      this.state.start('MainMenu'); 
	    },this);

	}

};
