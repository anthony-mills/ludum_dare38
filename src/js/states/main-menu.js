
ludumDare.MainMenu = function (game) {
	ludumDare.phaser = game;
	this.debugFps = false;
};

ludumDare.MainMenu.prototype = {

	create: function () {
		this.playerControls = {};
		this.audioSprite = ludumDare.phaser.add.audioSprite('gameSounds');
		this.audioSprite.allowMultiple = false;

		if (this.debugFps) {
			this.game.time.advancedTiming = true;	
		}

		var textStyle = { 
						font: "32px Arial", 
						fill: "#000000", 
					};

		this.menuBg = ludumDare.phaser.add.sprite( 0, 0, 'menuBg');

	    this.gameTitle = ludumDare.phaser.add.bitmapText(5, 30, 'chewyFont','Kenny Cockroach', 112);
	    this.gameTitle.x = (this.camera.width * 0.5 - (this.gameTitle.width * 0.5));
	    this.gameTitle.fixedToCamera = true;
	    this.gameTitle.tint = 0xe12b0d;

	    this.gameMsg = ludumDare.phaser.add.bitmapText(5, 250, 'chewyFont','Press i for instructions', 32);
	    this.gameMsg.x = (this.camera.width * 0.5 - (this.gameMsg.width * 0.5));
	   	this.gameMsg.fixedToCamera = true;
	    this.gameMsg.tint = 0x000000;

	    this.gameMsg = ludumDare.phaser.add.bitmapText(5, 370, 'chewyFont','Space to start', 32);
	    this.gameMsg.x = (this.camera.width * 0.5 - (this.gameMsg.width * 0.5));
	   	this.gameMsg.fixedToCamera = true;
	    this.gameMsg.tint = 0x000000;

		this.notePad = ludumDare.phaser.add.sprite( 20, 120, 'menuNotepad');    

		// Setup the spacebar 
		this.playerControls.space = ludumDare.phaser.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR); 

		// Setup the i key for instructions
		this.playerControls.i = ludumDare.phaser.input.keyboard.addKey(Phaser.Keyboard.I);

		// Show the player sprite
        this.playerLib = new ludumDare.Player();
        this.playerLib.characterSetup(195, 190);
		ludumDare.playerObj.anchor.set(0.5);	        

		ludumDare.playerObj.angle = 90;			
        ludumDare.playerObj.play("idle");
	},

	update: function () {
		if (this.playerControls.space.isDown) {
			this.startGame();
		}

		if (this.playerControls.i.isDown) {
			this.openInstructions();
		}		
	},

	render: function()
	{
		if (this.debugFps) {
			this.game.debug.text('render FPS: ' + (this.game.time.fps || '--') , 2, 14, "#00ff00");			
		}

	},

	openInstructions: function () { 
		this.audioSprite.play('select');

		this.camera.fade('#000000', 1000);

		this.camera.onFadeComplete.add(function() {
		  this.state.start('GameInstructions'); 
		},this);		

	},

	startGame: function () { 
		this.audioSprite.play('select');		

		this.camera.fade('#000000', 1000);

		this.camera.onFadeComplete.add(function() {
		  this.state.start('Game'); 
		},this);		

	}
};
