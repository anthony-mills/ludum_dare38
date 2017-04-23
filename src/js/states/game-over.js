
ludumDare.GameOver = function (game) {
	ludumDare.phaser = game;
	this.debugFps = false;
};

ludumDare.GameOver.prototype = {

	create: function () {
		this.playerControls = {};

		if (this.debugFps) {
			this.game.time.advancedTiming = true;	
		}

		var textStyle = { 
						font: "32px Arial", 
						fill: "#000000", 
					};

		this.menuBg = ludumDare.phaser.add.sprite( 0, 0, 'menuBg');

	    this.gameOver = ludumDare.phaser.add.bitmapText(5, 30, 'chewyFont','Game Over!', 112);
	    this.gameOver.x = (this.camera.width * 0.5 - (this.gameOver.width * 0.5));
	    this.gameOver.fixedToCamera = true;
	    this.gameOver.tint = 0xe12b0d;


	    this.gameMsg = ludumDare.phaser.add.bitmapText(5, 370, 'chewyFont','Space to continue', 32);
	    this.gameMsg.x = (this.camera.width * 0.5 - (this.gameMsg.width * 0.5));
	   	this.gameMsg.fixedToCamera = true;
	    this.gameMsg.tint = 0x000000;
	    ludumDare.phaser.add.tween(this.gameMsg).to( { alpha: 0 }, 2500, Phaser.Easing.Linear.None, true, 0, -1, true);

		// Setup the spacebar 
		this.playerControls.space = ludumDare.phaser.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR); 
	},

	update: function () {
		if (this.playerControls.space.isDown) {
			this.returnToMenu();
		}
	},

	render: function()
	{
		if (this.debugFps) {
			this.game.debug.text('render FPS: ' + (this.game.time.fps || '--') , 2, 14, "#00ff00");			
		}

	},

	returnToMenu: function () { 

		this.camera.fade('#000000', 1000);

		this.camera.onFadeComplete.add(function() {
		  this.state.start('MainMenu'); 
		},this);		

	}
};
