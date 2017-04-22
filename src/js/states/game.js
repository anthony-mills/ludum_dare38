
zTeam.Game = function (game) {
    zTeam.phaser = game;
};

zTeam.Game.prototype = {

    create: function () {
        var gameProgress = new zTeam.Progress();
        zTeam.gameData = gameProgress.loadGame.call();

        this.wipeStats();

        var levelHelper = new zTeam.LevelHelper();
        levelHelper.setup( zTeam.gameData.current_level );

        // Load in the required plugins
        zTeam.activePlugins.particleStorm = zTeam.phaser.plugins.add(Phaser.ParticleStorm);
        zTeam.activePlugins.HealthMeter = zTeam.phaser.plugins.add(Phaser.Plugin.HealthMeter);

        zTeam.activeClasses.playerLib = new zTeam.Player();
        zTeam.activeClasses.weaponsLib = new zTeam.Weapons();
        zTeam.activeClasses.enemyLib = new zTeam.Enemies();
        zTeam.activeClasses.objectsLib = new zTeam.Objects();
        zTeam.activeClasses.gameOverLib = new zTeam.GameOver();
        zTeam.activeClasses.terminalsLib = new zTeam.Terminals(); 
        zTeam.activeClasses.generalLib = new zTeam.General();

        var playerLib = new zTeam.Player();
        playerLib.characterSetup();

        zTeam.playerControls.cursors = zTeam.phaser.input.keyboard.createCursorKeys();
        zTeam.playerControls.shoot = zTeam.phaser.input.keyboard.addKey(Phaser.Keyboard.Z);
        zTeam.playerControls.throw = zTeam.phaser.input.keyboard.addKey(Phaser.Keyboard.X);
        zTeam.playerControls.interact = zTeam.phaser.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);  
        zTeam.playerControls.numberKeys = {
            'one' : zTeam.phaser.input.keyboard.addKey(Phaser.Keyboard.ONE),
            'two' : zTeam.phaser.input.keyboard.addKey(Phaser.Keyboard.TWO), 
            'three' : zTeam.phaser.input.keyboard.addKey(Phaser.Keyboard.THREE),
            'four' : zTeam.phaser.input.keyboard.addKey(Phaser.Keyboard.FOUR), 
            'five' : zTeam.phaser.input.keyboard.addKey(Phaser.Keyboard.FIVE),
            'six' : zTeam.phaser.input.keyboard.addKey(Phaser.Keyboard.SIX), 
            'seven' : zTeam.phaser.input.keyboard.addKey(Phaser.Keyboard.SEVEN),
            'eight' : zTeam.phaser.input.keyboard.addKey(Phaser.Keyboard.EIGHT),   
            'nine' : zTeam.phaser.input.keyboard.addKey(Phaser.Keyboard.NINE),                       
        };
        
        zTeam.activePlugins.particleStorm = zTeam.phaser.plugins.add(Phaser.ParticleStorm);
        zTeam.activePlugins.HealthMeter = zTeam.phaser.plugins.add(Phaser.Plugin.HealthMeter);

        // Setup up the sounds
        zTeam.activeClasses.soundLib = new zTeam.Sounds();
        zTeam.activeClasses.soundLib.setupSounds();

        // Setup the level opponents
        zTeam.activeClasses.enemyLib.loadOpponents(zTeam.enemyObj.levelData);   

        zTeam.activeBullets = zTeam.phaser.add.group();
    },

    update: function () {
        var _self = this; 

        // Check for a collision with the level end marker
        zTeam.phaser.physics.arcade.collide(zTeam.playerObj, zTeam.levelLayers.levelEnd, function() { 

            // Fade the player out
            zTeam.phaser.add.tween(zTeam.playerObj).to( { alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false).onComplete.add(
              function() {
                zTeam.playerObj.kill();     
              }, this
            );

            //Set the level completion time 
            zTeam.gameData.last_level_time = zTeam.phaser.time.totalElapsedSeconds();

            zTeam.phaser.camera.fade('#000000', 1000);
            zTeam.activeClasses.soundLib.miscEffects("level-end-transition");

            zTeam.phaser.camera.onFadeComplete.add(function() {

                _self.state.start('LevelComplete'); 
            },this);
        }); 

        zTeam.phaser.physics.arcade.collide(zTeam.playerObj, zTeam.levelLayers.solid, this.solidCollision);        

        if (zTeam.playerObj.inTerminal === 1) {
            zTeam.activeClasses.objectsLib.updateObjects(); 

            zTeam.phaser.physics.arcade.collide(zTeam.enemyObj.activeEnemies, zTeam.levelLayers.solid);

            zTeam.activeClasses.terminalsLib.updateTerminals();           
        } else {

            // Needs to go above the player update
            zTeam.activeClasses.objectsLib.updateObjects();  

            if (zTeam.playerObj.isHurt === 0 && zTeam.playerObj.isDead === 0) {
                zTeam.activeClasses.playerLib.playerUpdate();            
            }

            // The game is over return to the main menu
            if (zTeam.playerObj.isDead === 1 && zTeam.playerControls.interact.isDown) {
                this.state.start('MainMenu');
            } else {
                zTeam.activeClasses.terminalsLib.updateTerminals(); 
            }

            zTeam.activeClasses.weaponsLib.updateProjectiles();

            zTeam.activeClasses.enemyLib.updateOpponents();                
        }
      
    },

    quitGame: function (pointer) {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        this.state.start('MainMenu');
    },

    render: function()
    {
      //game.debug.text(game.time.physicsElapsed, 32, 32);
      //game.debug.cameraInfo(game.camera, 32, 32);
      //zTeam.phaser.debug.body(zTeam.playerObj);
      //zTeam.phaser.debug.bodyInfo(zTeam.playerObj, 16, 24);

      /*
      zTeam.enemyObj.activeEnemies.forEachAlive(function(activeEnemy) {
        zTeam.phaser.debug.body(activeEnemy);
      }, this);
      */

      this.game.debug.text('render FPS: ' + (this.game.time.fps || '--') , 2, 14, "#00ff00");
    },

    /**
    * Wipe any level related stats
    *
    */
    wipeStats: function() {
        zTeam.gameData.level_kill_count = 0;
        zTeam.gameData.last_level_time = 0;
        zTeam.gameData.last_level_credits = 0 ;
    },

    /**
    * Handle collisions between the player and solid objects
    *
    */
    solidCollision: function () {

    }

};
