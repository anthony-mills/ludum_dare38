
ludumDare.MainMenu = function (game) {

};

ludumDare.MainMenu.prototype = {

	create: function () {
	
	},

	update: function () {
	},

	render: function()
	{
	  this.game.debug.text('render FPS: ' + (this.game.time.fps || '--') , 2, 14, "#00ff00");
	},

	startGame: function (pointer) { 

	    this.camera.fade('#000000');

	    this.camera.onFadeComplete.add(function() {
	      // Add the next game state in here
	    },this);		

	}
};
