/**
* Class to manage the tutorial and levels
*/
ludumDare.Enemies = function () {
  this.spiderSpeed = 50;
};

ludumDare.Enemies.prototype = {

   createEnemies: function() {
      ludumDare.enemies = ludumDare.phaser.add.group();    
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
                      ], 6, true);

      enemyObj.curFacing = 'north';
      enemyObj.body.velocity.y = this.spiderSpeed * -1;
      enemyObj.anchor.setTo(0.5, 0.6);
      this.spiderYBounds( enemyObj, 30, 50 );      

      enemyObj.play("walk");

      ludumDare.enemies.add( enemyObj );
   },

   updateSpiders: function() {
      ludumDare.enemies.forEachAlive(function( activeEnemy ) {
        var _self = this;

        ludumDare.phaser.physics.arcade.collide( activeEnemy, ludumDare.levelMap.walls, function( enemyObj ) {

          console.log(enemyObj.body.velocity);

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

          console.log( enemyObj.curFacing );
        });

      }, this)
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
