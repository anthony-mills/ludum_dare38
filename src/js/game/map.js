/**
* Class to handle the creation of level maps
*/
ludumDare.Map = function () {
    ludumDare.levelMap = {};

    this.roomMaxSize = 5;
    this.roomMinSize = 2;
    this.maxRooms = 15;
    
    this.lastRoomCenter = {x: 0, y: 0};
    this.numRooms = 0;
    this.numTiles = 0;
    this.tileSize = 64;
    
    this.player = {};

    this.mapSize = { x: 2048, y: 2048 }
};

ludumDare.Map.prototype = {

    /**
    * Set the size of the map
    *
    * @param object mapSize
    */
    setMapSize: function ( mapSize )
    {
      this.mapSize = mapSize;
    }, 

    /**
    * Get the size of the map
    */
    getMapSize: function ()
    {
      return this.mapSize;
    },

    /**
    * Create the level map
    *
    */
    createMap: function()
    {
      ludumDare.levelMap.walls = ludumDare.phaser.add.group();
      ludumDare.levelMap.walls.enableBody = true;
            
      ludumDare.levelMap.floors = ludumDare.phaser.add.group();      

      for (var y=0; y<this.mapSize.y; y+= this.tileSize) {
          for (var x=0; x<this.mapSize.x; x+=this.tileSize) {
              var wall = ludumDare.levelMap.walls.create(x, y, "wall");
              wall.body.immovable = true;
          }
      }
      
      for (var r=0; r<this.maxRooms; r++) {
          var w = this.getRandom(this.roomMinSize, this.roomMaxSize) * this.tileSize;
          var h = this.getRandom(this.roomMinSize, this.roomMaxSize) * this.tileSize;
          
          x = this.getRandom(1, ((this.mapSize.x) / this.tileSize) - (w/this.tileSize + 1)) * this.tileSize;
          y = this.getRandom(1, ((this.mapSize.y) / this.tileSize) - (w/this.tileSize + 1)) * this.tileSize;
                          
          this.createRoom(x, x+w, y, y+h);
          
          if (this.numRooms == 0) {                
              this.player.x = x + (w/2);
              this.player.y = y + (h/2);
          } else {
              var new_x = ludumDare.phaser.math.snapToFloor(x + (w/2), this.tileSize);
              var new_y = ludumDare.phaser.math.snapToFloor(y + (h/2), this.tileSize);
              
              var prev_x = ludumDare.phaser.math.snapToFloor(this.lastRoomCoords.x, this.tileSize);
              var prev_y = ludumDare.phaser.math.snapToFloor(this.lastRoomCoords.y, this.tileSize);
              
              this.createHTunnel(prev_x, new_x, prev_y, prev_y);
              this.createVTunnel(prev_y, new_y, new_x);
          }
          
          this.lastRoomCoords = { x: x + (w/2), y: y + (h/2) };
          this.numRooms++;
      }

      ludumDare.phaser.physics.game.world.setBounds(0,0,this.mapSize.x,this.mapSize.y);;

      return this.player;     
    },

    getRandom: function(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    },
    
    Room: function(x, y, w, h) {
        this.x1 = x;
        this.y1 = y;
        this.x2 = x + w;
        this.y2 = y + h;
        
        var center_x = (this.x1 + this.x2) / 2;
        var center_y = (this.y1 + this.y2) / 2;
        this.center_coords = {x: center_x, y: center_y};
    },
    
    createFloor: function(x, y) {
        fl = ludumDare.levelMap.floors.create(x, y, "floor");
        ludumDare.phaser.physics.arcade.enable(fl);

        ludumDare.phaser.physics.arcade.overlap(fl, ludumDare.levelMap.walls, function(floor, wall) {
            wall.destroy();
        });

        fl.destroy();
    },
    
    createRoom: function(x1, x2, y1, y2) {
        for (var x = x1; x<x2; x+=this.tileSize) {
            for (var y = y1; y<y2; y+=this.tileSize) {
                this.createFloor(x, y);
            }
        }
    },
    
    createHTunnel: function(x1, x2, y) {
        var min = Math.min(x1, x2);
        var max = Math.max(x1, x2);
        for (var x = min; x<max+8; x+=8) {
            this.createFloor(x, y);
        }
    },
    
    createVTunnel: function(y1, y2, x) {
        var min = Math.min(y1, y2);
        var max = Math.max(y1, y2);
        for (var y = min; y<max+8; y+=8) {
            this.createFloor(x, y);
        }
    }   
};
