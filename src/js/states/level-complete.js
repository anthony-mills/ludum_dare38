
ludumDare.LevelComplete = function (game) {
	ludumDare.phaser = game;
	this.debugFps = false;
};

ludumDare.LevelComplete.prototype = {

	create: function () {
		this.playerControls = {};

		if (this.debugFps) {
			this.game.time.advancedTiming = true;	
		}

		this.menuBg = ludumDare.phaser.add.sprite( 0, 0, 'menuBg');

	    this.levelComplete = ludumDare.phaser.add.bitmapText(5, 30, 'chewyFont','Level Complete!', 112);
	    this.levelComplete.x = (this.camera.width * 0.5 - (this.levelComplete.width * 0.5));
	    this.levelComplete.fixedToCamera = true;
	    this.levelComplete.tint = 0xe12b0d;

	    this.continueMsg = ludumDare.phaser.add.bitmapText(5, 370, 'chewyFont','Space to continue', 32);
	    this.continueMsg.x = (this.camera.width * 0.5 - (this.continueMsg.width * 0.5));
	   	this.continueMsg.fixedToCamera = true;
	    this.continueMsg.tint = 0x000000;
	    ludumDare.phaser.add.tween(this.continueMsg).to( { alpha: 0 }, 2500, Phaser.Easing.Linear.None, true, 0, -1, true);	    

		// Setup the spacebar 
		this.playerControls.space = ludumDare.phaser.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR); 
	},

	update: function () {
		if (this.playerControls.space.isDown) {
			this.startGame();
		}
	},

	render: function()
	{
		if (this.debugFps) {
			this.game.debug.text('render FPS: ' + (this.game.time.fps || '--') , 2, 14, "#00ff00");			
		}

	},

	startGame: function () { 

		this.camera.fade('#000000', 1000);

		this.camera.onFadeComplete.add(function() {
		  this.state.start('Game'); 
		},this);		

	}
};
