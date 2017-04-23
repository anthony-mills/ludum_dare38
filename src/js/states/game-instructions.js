
ludumDare.GameInstructions = function (game) {
	ludumDare.phaser = game;
	this.debugFps = true;
};

ludumDare.GameInstructions.prototype = {

	create: function () {
		this.playerControls = {};

		if (this.debugFps) {
			this.game.time.advancedTiming = true;	
		}

		this.menuBg = ludumDare.phaser.add.sprite( 0, 0, 'menuBg');

	    this.levelComplete = ludumDare.phaser.add.bitmapText(5, 0, 'chewyFont','How to play', 112);
	    this.levelComplete.x = (this.camera.width * 0.5 - (this.levelComplete.width * 0.5));
	    this.levelComplete.fixedToCamera = true;
	    this.levelComplete.tint = 0xe12b0d;

	    this.continueMsg = ludumDare.phaser.add.bitmapText(5, 410, 'chewyFont','Space to exit instructions', 36);
	    this.continueMsg.x = (this.camera.width * 0.5 - (this.continueMsg.width * 0.5));
	   	this.continueMsg.fixedToCamera = true;
	    this.continueMsg.tint = 0x000000;

	    this.showText( { 'x': 5, 'y' : 125 }, 'Hi my name is Kenny! I try not to be a bad bloke,');
	    this.showText( { 'x': 5, 'y' : 155 }, 'just trying to get back to my roach hotel for a bit of shut eye.');

	    this.showText( { 'x': 5, 'y' : 198 }, '->', 95, 0xe12b0d);	    

	    this.showText( { 'x': 5, 'y' : 325 }, 'Use the cursor keys to move me around. While keeping');
	    this.showText( { 'x': 5, 'y' : 350 }, 'me as far away as possible from the spiders!');	    

        this.playerLib = new ludumDare.Player();
        this.playerLib.characterSetup(300, 250);
		ludumDare.playerObj.anchor.set(0.5);	        

		ludumDare.playerObj.angle = 90;			
        ludumDare.playerObj.play("idle");

        var roachHotel = ludumDare.phaser.add.sprite( 500, 180, 'levelExit');


	    // Setup the spacebar 
		this.playerControls.space = ludumDare.phaser.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

	},

	update: function () {
		if (this.playerControls.space.isDown) {
			this.mainMenu();
		}
	},

	render: function()
	{
		if (this.debugFps) {
			this.game.debug.text('render FPS: ' + (this.game.time.fps || '--') , 2, 14, "#00ff00");			
		}

	},

	showText: function ( placeText, addText, textSize = 25, textColour = 0x000000 ) {
	    this.gameMsg = ludumDare.phaser.add.bitmapText(placeText.x, placeText.y, 'chewyFont', addText, textSize);
	    this.gameMsg.x = (this.camera.width * 0.5 - (this.gameMsg.width * 0.5));
	    this.gameMsg.align = 'center';
	   	this.gameMsg.fixedToCamera = true;
	    this.gameMsg.tint = textColour;
	},

	mainMenu: function () { 

		this.camera.fade('#000000', 1000);

		this.camera.onFadeComplete.add(function() {
		  this.state.start('MainMenu'); 
		},this);		

	}
};
