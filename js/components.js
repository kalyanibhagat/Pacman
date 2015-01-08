var total_score = 0;
var scorestart = false;
var pacman_alive = true;

Crafty.c('Grid', {
    init: function () {
        'use strict';
         this.attr({
            w: Game.map_grid.tile.width,
            h: Game.map_grid.tile.height
    });
},
    
at: function (y, x) {
    'use strict';
        if (x === undefined && y === undefined) {
            return { x: this.x / Game.map_grid.tile.width, y: this.y / Game.map_grid.tile.height};
        } else {
            this.attr({ x: x * Game.map_grid.tile.width, y: y * Game.map_grid.tile.height});
            return this;
        }
    }
});

Crafty.c('Actor', {
    init: function () {
        'use strict';
        this.requires('2D, Canvas, Grid');
    }
});

Crafty.c('Space', {
    init: function () {
        'use strict';
        this.requires('Actor');
    }
});

Crafty.c('Wallh', {
    init: function () {
        'use strict';
        this.requires('Actor,Solid, spr_wallh');
    }
});

Crafty.c('Wallv', {
    init: function () {
        'use strict';
        this.requires('Actor,Solid, spr_wallv');
    }
});

Crafty.c('Dots', {
  init: function() {
        this.requires('Actor, spr_dots');
  },
   
  collect: function() {
        this.add_points();
        this.destroy();
  },
         
  add_points: function() {
    total_score = total_score + 10;
    if(scorestart){
         Crafty("score_bar").each(function(){this.update();});
    } else {
        Crafty.e("score_bar").each(function(){this.update();});
        scorestart = true;
    }
  },
});

Crafty.c('LargeDots', {
  init: function() {
    this.requires('Actor, spr_largeDots');
  },
         
  collect: function(){
    this.add_points();
    this.destroy();
  },
         
  add_points: function () {
    total_score = total_score + 50;
    if(scorestart){
        Crafty("score_bar").each(function(){this.update();});
    } else {
        Crafty.e("score_bar").each(function(){this.update();});
        scorestart = true;
    }
  },
});

Crafty.c("score_bar", { 
    init:function(){
        this.requires("DOM, 2D, Text");
        this.attr({x:20, y:465, z:500, w:500});
        this.textColor("#ffffff");
        this.textFont({ size: '20px', weight: 'bold'});
        this.text("Score: " + total_score.toString());
        console.log(total_score);
    }, 
    
    update:function(){
        this.text("Score: " + total_score.toString());
    }
});
Crafty.c('Fruits', {
  init: function() {
    this.requires('Actor, spr_straw');
  },
         
  collect: function(){
    this.add_points();
    this.destroy();
  },
         
  add_points: function () {
    total_score = total_score + 300;
    if(scorestart){
        Crafty("score_bar").each(function(){this.update();});
    } else {
        Crafty.e("score_bar").each(function(){this.update();});
        scorestart = true;
    }
  },
});






