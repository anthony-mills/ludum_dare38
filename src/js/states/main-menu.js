
ludumDare.MainMenu = function (game) {
	this.debugFps = true;
};

ludumDare.MainMenu.prototype = {

	create: function () {
		if (this.debugFps) {
			this.game.time.advancedTiming = true;	
		}

		var textStyle = { 
						font: "32px Arial", 
						fill: "#ff0044", 
						align: "center", 
						backgroundColor: "#ffff00" 
					};

		this.gameTitle = ludumDare.phaser.add.text(0, 50, "Ludum Dare #38", textStyle);
		this.gameTitle.anchor.set(0.5);	
		this.gameTitle.x = (this.camera.width * 0.5 - (this.gameTitle.width * 0.5));	
	},

	update: function () {
	},

	render: function()
	{
		if (this.debugFps) {
			this.game.debug.text('render FPS: ' + (this.game.time.fps || '--') , 2, 14, "#00ff00");			
		}

	},

	startGame: function (pointer) { 

		this.camera.fade('#000000');

		this.camera.onFadeComplete.add(function() {
		  // Add the next game state in here
		},this);		

	}
};
