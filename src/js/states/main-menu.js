
ludumDare.MainMenu = function (game) {
	ludumDare.phaser = game;
	this.debugFps = true;
};

ludumDare.MainMenu.prototype = {

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

		this.gameTitle = ludumDare.phaser.add.text(0, 70, "Ludum Dare #38", textStyle);
		this.gameTitle.x = (this.camera.width * 0.5 - (this.gameTitle.width * 0.5));

		this.gameMsg = ludumDare.phaser.add.text(0, 200, "Space to start", textStyle);
		this.gameMsg.x = (this.camera.width * 0.5 - (this.gameMsg.width * 0.5));

		// Setup the spacebar 
		this.playerControls.space = ludumDare.phaser.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR); 

		// Show the player sprite
        this.playerLib = new ludumDare.Player();
        this.playerLib.characterSetup(200, 200);
		ludumDare.playerObj.anchor.set(0.5);	        

		ludumDare.playerObj.angle = 90;			
        ludumDare.playerObj.play("idle");
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
