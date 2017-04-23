
ludumDare.LevelComplete = function (game) {
	ludumDare.phaser = game;
	this.debugFps = true;
};

ludumDare.LevelComplete.prototype = {

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

		this.levelComplete = ludumDare.phaser.add.text(0, 70, "Level Complete!", textStyle);
		this.levelComplete.x = (this.camera.width * 0.5 - (this.levelComplete.width * 0.5));

		this.continueMsg = ludumDare.phaser.add.text(0, 200, "Space to continue", textStyle);
		this.continueMsg.x = (this.camera.width * 0.5 - (this.continueMsg.width * 0.5));

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