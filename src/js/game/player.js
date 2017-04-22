/**
* Class to manage the tutorial and levels
*/
ludumDare.Player = function () {
  this.playerSpeed = 200;
  this.playerDrag = 200;
};

ludumDare.Player.prototype = {

    /**
    * Setup the player character
    *
    */
    characterSetup: function( startX, startY )
    {

      ludumDare.playerObj = ludumDare.phaser.add.sprite( startX, startY, 'cockroachSprite', "idle_1.png");
      ludumDare.phaser.physics.enable(ludumDare.playerObj, Phaser.Physics.ARCADE);
      ludumDare.playerObj.body.collideWorldBounds = true;

      ludumDare.playerObj.isDead = 0;

      ludumDare.phaser.camera.follow(ludumDare.playerObj);

      ludumDare.playerObj.animations.add('idle', [
                                          "idle_1.png",
                                          "idle_2.png",
                                          "idle_3.png",
                                          "idle_4.png",
                                          "idle_5.png",
                                          "idle_6.png",
                                          "idle_7.png",
                                          "idle_8.png",
                                          "idle_9.png",
                                          "idle_10.png"
                                        ], 5, true);

      ludumDare.playerObj.animations.add('walk', [
                                          "walk_1.png",
                                          "walk_2.png",
                                          "walk_3.png",
                                          "walk_4.png",
                                          "walk_5.png",
                                          "walk_6.png",
                                          "walk_7.png",
                                          "walk_8.png",
                                          "walk_9.png",
                                          "walk_10.png"
                                        ], 17, true);
      ludumDare.playerObj.body.maxVelocity.setTo(this.playerSpeed, this.playerSpeed);

      ludumDare.playerObj.anchor.setTo(0.5, 0.6);
      ludumDare.playerObj.body.drag.setTo( this.playerDrag );
      ludumDare.playerObj.play('idle');

    },

    playerYBounds: function( yOffset = 30) 
    {
        ludumDare.playerObj.body.setSize(
                                            25,
                                            53,
                                            20,
                                            yOffset
                                    );
    },

    playerXBounds: function() 
    {
        ludumDare.playerObj.body.setSize(
                                            53,
                                            22,
                                            5,
                                            48
                                    );
    },

    /**
    * Player update function
    */
    playerUpdate: function()
    {
        ludumDare.phaser.physics.arcade.collide(ludumDare.playerObj, ludumDare.levelMap.walls);

        if (ludumDare.playerControls.cursors.left.isDown) {
          ludumDare.playerObj.angle = -90;
          ludumDare.playerObj.body.velocity.y = 0;          
          ludumDare.playerObj.body.velocity.x = this.playerSpeed * -1;
          this.playerXBounds();
        } else if (ludumDare.playerControls.cursors.right.isDown) {
          ludumDare.playerObj.angle = 90;
          ludumDare.playerObj.body.velocity.y = 0;          
          ludumDare.playerObj.body.velocity.x = this.playerSpeed; 
          this.playerXBounds();         
        } 
        
        if (ludumDare.playerControls.cursors.up.isDown) {
          ludumDare.playerObj.angle = 0;
          ludumDare.playerObj.body.velocity.x = 0;          
          ludumDare.playerObj.body.velocity.y = this.playerSpeed * -1;            
          this.playerYBounds(30);
        } else if (ludumDare.playerControls.cursors.down.isDown) {
          ludumDare.playerObj.angle = 180;
          ludumDare.playerObj.body.velocity.x = 0;          
          ludumDare.playerObj.body.velocity.y = this.playerSpeed;             
          this.playerYBounds();
        } 

        if ( ludumDare.playerObj.body.velocity.x < 0 || ludumDare.playerObj.body.velocity.x > 0 || 
          ludumDare.playerObj.body.velocity.y < 0 || ludumDare.playerObj.body.velocity.y > 0 ) {
          ludumDare.playerObj.play('walk');
        } else {
          ludumDare.playerObj.play('idle');          
        }

    }
};
