
Crafty.scene('Loading', function () {
  // Draw some text for the player to see in case the file
  //  takes a noticeable amount of time to load
    "use strict";
    Crafty.e('2D, DOM, Text')
        .text('Loading...')
    //.attr({ x: 0, y: Game.height()/2 - 24, w: Game.width() })
        .css($text_css);
 
  // Load our sprite map image
    Crafty.load(['lib/pacman-20.png',
                 'lib/sam_gfx.png',
                 'lib/borders.png',
                 'lib/pacman_chomp2.wav',
                 'lib/pacman_beginning.wav',
                 'lib/pacman_death.wav',
                 'lib/pacman_eatghost.wav'], function () {
    // Once the image is loaded...
                
                
                Crafty.audio.add({
                    eat: ['lib/pacman_chomp2.wav'],
                    intro: ['lib/pacman_beginning.wav'],
                    death: ['lib/pacman_death.wav'],
                    eatghost: ['lib/pacman_eatghost.wav']
                });
                
                
 
    // Define the individual sprites in the image
    // Each one (spr_tree, etc.) becomes a component
    // These components' names are prefixed with "spr_"
    //  to remind us that they simply cause the entity
    //  to be drawn with a certain sprite
        //Sprite for game board and grid
        Crafty.sprite(18, 'lib/borders.png', {
            spr_wallh:      [1.3, 0],
            spr_wallv:     [1.3, 1.5]
        });
       
        //Pixelation of the Pacdots differ for each sprite sheet. The 
        // ratio of pacdots to large pacdots is nearly twice the size.
        Crafty.sprite(14, 'lib/sam_gfx.png', {
            spr_dots:      [16.44, 0]
        });
        Crafty.sprite(15.5, 'lib/sam_gfx.png', {
            spr_largeDots: [16.5, 0] 
            //spr_largeDots: [0.43, 7.375]
        });
        Crafty.sprite(17.5, 'lib/sam_gfx.png', {
            //spr_largeDots: [16.5, 0] 15.5
            cherry: [0.43, 7.375]
        });
        Crafty.sprite(20, 'lib/pacman-20.png', {
            spr_blinky: [1,2],
            spr_pinky: [5,2],
            spr_inky: [7,0],
            spr_clyde: [3,0],
            spr_pacman: [10, 0],
            spr_blueGhost:[12,0],
        });
         Crafty.sprite(17.9, 'lib/sam_gfx.png', {
            spr_straw: [1.64, 7.05]
        });


        Crafty.scene('Game');
        Crafty.pause();
        Crafty.audio.play('intro');
        setTimeout(function(){
            Crafty.pause();},2000);
        });
    
});

var control=function() {
              Crafty.pause();
          }
         // var pause_control=function() {
        //      Crafty.pause(true);
        //  }
        //  var unpause_control=function() {
        //      Crafty.pause(false);
        //  }