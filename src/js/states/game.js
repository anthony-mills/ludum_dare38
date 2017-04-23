
ludumDare.Game = function (game) {
    ludumDare.phaser = game;
    this.debugFps = true;
};

ludumDare.Game.prototype = {

    create: function () {
        // Setup the background
        this.menuBg = ludumDare.phaser.add.sprite( 0, 0, 'menuBg');
        this.menuBg.fixedToCamera = true;

        ludumDare.playerControls = {};
        ludumDare.playerControls.cursors = ludumDare.phaser.input.keyboard.createCursorKeys();

        if (this.debugFps) {
            this.game.time.advancedTiming = true;   
        }       

        this.activeClasses = {};   

        // Set up the player
        this.activeClasses.playerLib = new ludumDare.Player();
        this.activeClasses.mapLib = new ludumDare.Map();

        this.mapLocations = this.activeClasses.mapLib.createMap();

        console.log( this.mapLocations );

        this.activeClasses.playerLib.characterSetup( this.mapLocations.player.x, this.mapLocations.player.y );
        this.activeClasses.playerLib.playerYBounds();

        // Set up the enemies
        this.activeClasses.enemyLib = new ludumDare.Enemies();
        this.activeClasses.enemyLib.createEnemies(); 

        this.mapLocations.enemies.forEach(function ( enemyObj ) {
            this.activeClasses.enemyLib.spawnSpider( enemyObj.x, enemyObj.y );
        }, this);

        ludumDare.phaser.camera.follow( ludumDare.playerObj );

        ludumDare.phaser.physics.startSystem( Phaser.Physics.ARCADE );
    },

    finishLevel: function() {
        this.camera.fade('#000000', 1000);

        this.camera.onFadeComplete.add(function() {
          this.state.start('LevelComplete'); 
        },this);        

    },

    update: function () {
        this.activeClasses.playerLib.playerUpdate();
        this.activeClasses.enemyLib.updateSpiders();

        var _self = this;
        ludumDare.phaser.physics.arcade.overlap( ludumDare.playerObj, ludumDare.levelExit, function( playerObj, levelExit ) {
            playerObj.body.velocity.x = 0;
            playerObj.body.velocity.y = 0;

            _self.finishLevel();
        });

        ludumDare.levelExit 
    },

    render: function()
    {
        if (this.debugFps) {
            this.game.debug.text('render FPS: ' + (this.game.time.fps || '--') , 2, 14, "#00ff00");         
        }

        ludumDare.enemies.forEachAlive(function(activeEnemy) {
            ludumDare.phaser.debug.body(activeEnemy);
        }, this);
        // ludumDare.phaser.debug.body(ludumDare.playerObj);
    }
};
