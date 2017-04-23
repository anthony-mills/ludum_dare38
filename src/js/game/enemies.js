/**
* Class to manage the tutorial and levels
*/
ludumDare.Enemies = function () {
  this.spiderSpeed = 100;
  this.spiderChargeSpeed = 300;
  this.chargeDistance = 400;
  this.fireRate = 1500;
  this.projectileSpeed = 500;
};

ludumDare.Enemies.prototype = {

   createEnemies: function() {
      ludumDare.enemies = ludumDare.phaser.add.group();
      ludumDare.enemyFire = ludumDare.phaser.add.group();          
   }, 

   spawnSpider: function( xLoc, yLoc ) {
      var enemyObj = ludumDare.phaser.add.sprite( xLoc, yLoc, 'spiderSprite', "idle_1.png");
      ludumDare.phaser.physics.enable( enemyObj, Phaser.Physics.ARCADE);
      
      enemyObj.body.collideWorldBounds = true;

      enemyObj.animations.add('walk', [
                        "walk_1.png",
                        "walk_2.png",
                        "walk_3.png",
                        "walk_5.png",
                        "walk_6.png"
                      ], 12, true);

      enemyObj.curFacing = 'north';
      enemyObj.body.velocity.y = this.spiderSpeed * -1;
      enemyObj.anchor.setTo(0.5, 0.6);
      enemyObj.lastFire = 0;

      this.spiderYBounds( enemyObj, 30, 50 );      

      enemyObj.play("walk");

      ludumDare.enemies.add( enemyObj );
   },

   updateSpiders: function() {
      ludumDare.enemies.forEachAlive(function( activeEnemy ) {
        var _self = this;

        ludumDare.phaser.physics.arcade.collide( activeEnemy, ludumDare.levelMap.walls, function( enemyObj ) {

          // Randomise the turn direction a little bit
          var turnDir = Math.round(Math.random());

          switch( enemyObj.curFacing ) {
            case 'north':
              if (turnDir === 1) {
                _self.turnEast( enemyObj );
              } else {
                _self.turnWest( enemyObj );
              }
            break;

            case 'east': 
              if (turnDir === 1) {
                _self.turnSouth( enemyObj );
              } else {
                _self.turnNorth( enemyObj );
              }            
            break; 

            case 'south':
              if (turnDir === 1) {
                _self.turnEast( enemyObj );
              } else {
                _self.turnWest( enemyObj );
              }
            break;

            case 'west':
              if (turnDir === 1) {
                _self.turnSouth( enemyObj );
              } else {
                _self.turnNorth( enemyObj );
              } 
            break;                       
          }
        });

        // Adjust the enemy spped if the play is near by     
        var playerDistance = ludumDare.phaser.physics.arcade.distanceBetween( activeEnemy, ludumDare.playerObj );

        if ( playerDistance < this.chargeDistance ) {   
          // this.enemySpeed( activeEnemy );      

          var radianBetween = ludumDare.phaser.math.angleBetween( activeEnemy.x, activeEnemy.y, ludumDare.playerObj.x, ludumDare.playerObj.y );
          var angleBetween = ludumDare.phaser.math.radToDeg( radianBetween );

          switch ( activeEnemy.curFacing ) {
            case 'north':
              if ( angleBetween > -120 && angleBetween < -70 ) {
                var fireLoc = { 'x' : activeEnemy.x, 'y' : (activeEnemy.y - 50) }
                this.enemyFire( activeEnemy, radianBetween, fireLoc );
              }
            break;

            case 'east':
              if ( angleBetween > -30 && angleBetween < 30 ) {
                var fireLoc = { 'x' : (activeEnemy.x + 50), 'y' : activeEnemy.y }                
                this.enemyFire( activeEnemy, radianBetween, fireLoc );
              }
            break;

            case 'west':
              if ( angleBetween < -160 && angleBetween < -100 ) {
                var fireLoc = { 'x' : (activeEnemy.x - 50), 'y' : activeEnemy.y }                
                this.enemyFire( activeEnemy, radianBetween, fireLoc );
              }
            break;

            case 'south':
              if ( angleBetween < 120 && angleBetween > 70 ) {
                var fireLoc = { 'x' : activeEnemy.x, 'y' : (activeEnemy.y + 50) }
                this.enemyFire( activeEnemy, radianBetween, fireLoc );
              }
            break;
          }
        }

      }, this)
    },

    /**
    * Shoot some venom at the player
    *
    * @param object enemyObj
    * @param integer targetAngle
    * @param object fireLoc
    */
    enemyFire: function( enemyObj, targetRadian, fireLoc ) {
      var attackDiff = ( ludumDare.phaser.time.totalElapsedSeconds() - enemyObj.lastFire ) * 1000;

      if ( attackDiff > this.fireRate ) {
        enemyObj.lastFire = ludumDare.phaser.time.totalElapsedSeconds();

        var enemyProjectile = ludumDare.phaser.add.sprite( fireLoc.x, fireLoc.y, 'spiderSprite', "venom.png");

        ludumDare.phaser.physics.enable( enemyProjectile, Phaser.Physics.ARCADE);
        enemyProjectile.anchor.setTo(0.5, 0.5);

        enemyProjectile.outOfBoundsKill = true;

        ludumDare.enemyFire.add( enemyProjectile );     

        enemyProjectile.body.acceleration.x = Math.cos( targetRadian ) * this.projectileSpeed;
        enemyProjectile.body.acceleration.y = Math.sin( targetRadian ) * this.projectileSpeed;         
      }
    }, 

    turnNorth: function( enemyObj ) {
      enemyObj.curFacing = 'north';
      this.spiderYBounds( enemyObj, 30, 50 );         

      if (!enemyObj.body.blocked.up) {   
        enemyObj.body.velocity.y = this.spiderSpeed * -1;
        enemyObj.angle = 0;              
        enemyObj.body.velocity.x = 0;
      }            
    },

    turnEast: function( enemyObj ) {
      enemyObj.curFacing = 'east';
      this.spiderXBounds( enemyObj, 40, 70 );

      if (!enemyObj.body.blocked.right) {
        enemyObj.body.velocity.y = 0;
        enemyObj.angle = 90;
        enemyObj.body.velocity.x = this.spiderSpeed;
      }            
    },

    turnSouth: function( enemyObj ) {
      enemyObj.curFacing = 'south';      
      this.spiderYBounds( enemyObj, 30, 80 ); 

      if (!enemyObj.body.blocked.down) {              
        enemyObj.body.velocity.y = this.spiderSpeed;
        enemyObj.body.velocity.x = 0;
        enemyObj.angle = 180;
      }
    },

    turnWest: function( enemyObj ) {
      this.spiderXBounds( enemyObj, 10, 70 );
      enemyObj.curFacing = 'west';

      if (!enemyObj.body.blocked.left) {       
        enemyObj.body.velocity.y = 0;
        enemyObj.angle = -90;              
        enemyObj.body.velocity.x = this.spiderSpeed * -1;
      }
    },

    /**
    * Set the speed of the enemy / charge if near the player
    *
    * @param object enemyObj
    **/
    enemySpeed: function( enemyObj ) {

      switch ( enemyObj.curFacing ) {
        case "north":
          enemyObj.body.velocity.y = this.spiderChargeSpeed * -1;
        break;

        case "east":
          enemyObj.body.velocity.x = this.spiderChargeSpeed;
        break;

        case "west":
          enemyObj.body.velocity.x = this.spiderChargeSpeed * -1;
        break;

        case "south":
          enemyObj.body.velocity.y = this.spiderChargeSpeed;
        break;
      }
    },

    spiderYBounds: function( enemyObj, xOffset=20, yOffset=30 ) 
    {
        enemyObj.body.setSize(
                                            50,
                                            60,
                                            xOffset,
                                            yOffset
                                    );
    },

    spiderXBounds: function( enemyObj, xOffset=5, yOffset=48 ) 
    {
        enemyObj.body.setSize(
                                            60,
                                            50,
                                            xOffset,
                                            yOffset
                                    );
    }
};
