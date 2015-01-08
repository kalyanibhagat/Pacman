//Total 3 lives for Pacman
var total_life = 3;
//Initial game state
var gameStatus = "Started";
var isPlaying = false;
var scoreChecker = false;
var fruitcount = 100;
Crafty.c('Pacman', {
    //Number of ghosts pacman has eaten. If its 4, then Pacman Wins
    ghostEaten: 0,
    //Total number lives with pacman
    life: total_life,
    //Number of dots pacman has eaten. If it has eaten all dots, 
    //then Pacman Wins
    totalDotsEaten: 0,

    init: function() {
    this.requires('Actor, spr_pacman, Fourway, Collision,SpriteAnimation')
    .attr({direction: 'NONE',initx:0,inity:0})
    .fourway(4)
    .stopOnSolids()
    .onHit('Dots', this.visitDots)
    .onHit('LargeDots', this.visitLargeDots)
    .onHit('Wallh', this.visitWall)
    .onHit('Wallv', this.visitWall)
    .onHit('Fruits', this.visiFruit)
    .reel('PlayerMovingUp',    400, 10, 3, 2)
    .reel('PlayerMovingRight', 400, 10, 0, 2)
    .reel('PlayerMovingDown',  400, 10, 1, 2)
    .reel('PlayerMovingLeft',  400, 10, 2, 2);
    
    var speed = 2.0;
    var animation_speed = 4;
    this.bind('NewDirection', function(data) {
      if (data.x > 0) {
        this.animate('PlayerMovingRight', -1);
        this.attr({direction: 'RIGHT'})
      } else if (data.x < 0) {
        this.animate('PlayerMovingLeft', -1);
        this.attr({direction: 'LEFT'})
      } else if (data.y > 0) {
        this.animate('PlayerMovingDown', -1);
        this.attr({direction: 'DOWN'})
      } else if (data.y < 0) {
        this.animate('PlayerMovingUp', -1);
        this.attr({direction: 'UP'})
      } 
    });
      

         

    //Initial state of game
    Crafty.e("life_bar").each(function(){this.update();});
    gameStatus="Started";
    Crafty.e("status_bar").each(function(){this.update();});

    this.bind('EnterFrame', function () {
       if (this.direction === 'UP'){
            this.fourway(0);
            this.y -= speed ;
            if (this._movement) {
				this.fourway(4);
				if(this.direction === 'DOWN') {
                    this.fourway(0);
					this.y += speed;
                }
                this.fourway(4)
                if(this.direction === 'UP') {
                    this.fourway(0);
					this.y = this.y -speed + 3;
                }
            }
       }
              
       if (this.direction === 'DOWN'){
            this.fourway(0);
            this.y += speed ;
            if (this._movement) {
                this.fourway(4);
                if(this.direction === 'UP') {
                    this.fourway(0);
                    this.y -= speed;
                }
                this.fourway(4)
                if(this.direction === 'DOWN') {
                    this.fourway(0);
                    this.y = this.y +speed - 3;
                }
            }
        }
              
              if (this.direction === 'RIGHT'){
              this.fourway(0);
              this.x += speed ;
              if (this._movement) {
              this.fourway(4);
              if(this.direction === 'LEFT') {
              this.fourway(0);
              this.x -= speed;
              }this.fourway(4)
              if(this.direction === 'RIGHT') {
              this.fourway(0);
              this.x = this.x +speed - 3;
              }
              }
              }
              
              if (this.direction === 'LEFT'){
              this.fourway(0);
              this.x -= speed ;
              if (this._movement) {
              this.fourway(4);
              if(this.direction === 'RIGHT') {
              this.fourway(0);
              this.x += speed;
              }this.fourway(4)
              if(this.direction === 'LEFT') {
              this.fourway(0);
              this.x = this.x -speed + 3;
              }
              }
              }
              
              if (this.direction === 'UP'){
              this.fourway(0);
              this.y -= speed;
              }
              
        if (this.direction === 'DOWN'){
		this.fourway(0);
            this.y += speed;
        }
        if (this.direction === 'LEFT'){
		this.fourway(0);
             this.x -= speed;
        }
        if (this.direction === 'RIGHT'){
		this.fourway(0);
            this.x += speed;
        }
    });


  },
 
//Set the initial position 
setInitPos: function() {
	this.initx = this.x;
	this.inity = this.y;
},

stopOnSolids: function(){
    this.onHit('Solid', this.stopMovement);
    return this;
    },
stopMovement: function(){
    this._speed = 0;
    if(this._movement){
    this.x -= this._movement.x;
    this.y -= this._movement.y;
    } 
	this.fourway(4);
},
visiFruit:function(data){
    fruit = data[0].obj;
    fruit.collect();
},
visitDots: function(data) {
         if ((isPlaying === false) && (this._movement)) {
         isPlaying = true;
         Crafty.audio.play('eat');
         }
    dots = data[0].obj;
    dots.collect();

    //Increment number of dots eaten by pacman
    this.totalDotsEaten++;
    if(total_score == fruitcount){
        Crafty.e('Fruits').at(2,9);
        //fruitcount = (fruitcount*6)/2;
    }
    //If all dots are eaten by Pacman, then Game won. Restart new game in 5sec
    if (this.totalDotsEaten == totalDots){ 
        scoreChecker=true;
        GameWon=true;
        
        this.resetGame("You Won!: Starting next stage . . .");  
    }
  },
visitLargeDots: function(data){
    largeDots = data[0].obj;
    largeDots.collect();

    //Increment number of dots eaten by pacman
    this.totalDotsEaten++;
    if(this.totalDotsEaten == fruitcount){
        Crafty.e('Fruits').at(2,9);
        //fruitcount = (fruitcount*6)/2;
    }
    //If all dots are eaten by Pacman, then Game won. Restart new game in 5sec
    if (this.totalDotsEaten == totalDots){
        scoreChecker=true;
        Gamewon=true;
        
        this.resetGame("You Won!: Starting next stage . . .");
        
    }


    //Make the ghosts vulnerable and animate them as blue ghosts for 10secs
    Crafty.trigger("PelletEaten");
    
},

    

visitWall: function(data) {
    Crafty.audio.stop('eat');
    isPlaying = false;
    this.pauseAnimation();
    this.direction = "NONE";
    this.at(Math.round(this.at().y),Math.round(this.at().x));
},

//Update the life count of pacman
updateLife: function() {
    Crafty.audio.stop('eat');
    isPlaying = false;
    pacman_alive = true;
    this.life--;
    total_life = this.life;
    Crafty("life_bar").each(function(){this.update();});
    
},
//Reset position of pacman. This will be done when pacman dies
//and still has lives. So, the new pacman will come in this 
//position
resetPos: function() {
	this.attr({
	    x: this.initx,
	    y: this.inity,
	});
},
resetBlueGhosts:function(){
    Crafty("Bashful").each(
        function() {
                this.resetPos();
                }
        );
},
resetPinkGhosts:function(){
    Crafty("Speedy").each(
        function() {
                this.resetPos();
                }
        );
},
resetOrangeGhosts:function(){
    Crafty("Pokey").each(
        function() {
                this.resetPos();
                }
        );
},
resetRedGhosts:function(){
    Crafty("Shadow").each(
        function() {
                this.resetPos();
                }
        );
},
//Reset positions of all ghosts and pacman to original stored
//co-oordinates. This will be done when pacman dies and still
//has lives. SO, the new pacman will come in that co-ordinate

resetGhosts: function() {

    Crafty.pause();
	setTimeout(function(){
	Crafty.pause()},2000);
         
    	Crafty("Speedy").each(
        function() {
                this.resetPos();
                }
        );
            
        Crafty("Bashful").each(
        function() {
                this.resetPos();
                }
        );

        Crafty("Pokey").each(
        function() {
                this.resetPos();
                }
        );

        Crafty("Shadow").each(
        function() {
                this.resetPos();
                }
        );

	Crafty("Pacman").each(
        function() {
                this.resetPos();
                }
        );
},

//Increment the count of ghosts eaten by pacman
//If it has eaten all 4 ghosts, then game won...restart new game in 5secs
destroyGhost: function() {
	this.ghostEaten++;
	if (this.ghostEaten == 4)
	    this.resetGame("You Won!: Starting next stage . . .");
},


//restart game. thos will be called for both Game Won and Lost
//The "msg" will be updated in the Status bar as appropriate
//And a new game will be started after 5 sec delay
resetGame: function(msg) {
    Crafty.audio.stop('eat');
    isPlaying = false;
	//scorestart = 0;
	total_life = 3;
	gameStatus=msg;
    pacman_alive = true;
 	//totalDots = 0;
    if(scoreChecker){
    
	
    console.log("I AM IN RESTART:"+total_score);
    //freeze everything until 5 secs
    Crafty.pause();
    
	//5 sec delay and start new game
	setTimeout(function(){
            scorestart = false;
            //total_score= total_score;
               Crafty.pause();
               Crafty.scene('Game');
               Crafty.pause();
               Crafty.e('Fruits').at(20,2);
               Crafty.audio.play('intro');
               setTimeout(function(){
                Crafty.pause();},2000);
               },2000);
        
    }else{
	
	//Crafty("status_bar").each(function(){this.update();});
    
    //freeze everything until 5 secs
    scorestart = false;
    //fruitcount=0;
    total_score=0;
        
    Crafty.pause();
    
	//5 sec delay and start new game
	setTimeout(function(){

        //unfreeze and restart
               Crafty.pause();
               Crafty.scene('Game');
               Crafty.pause();
               Crafty.audio.play('intro');
               setTimeout(function(){
                          Crafty.pause();},2000);
               },2000);
         
    
}
}
});


//Bar at the top showing remaining lives of pacman
Crafty.c("life_bar", {
    init:function(){
        this.requires("DOM, 2D, Text");
        this.attr({x:300, y:465, z:10, w:100});
        this.textColor("#ffffff");
        this.textFont({ size: '20px', weight: 'bold'});
        this.text("Score: " + total_life.toString());
        
        
    },

    update:function(){
        var flower_cherry = Crafty.e("2D, DOM, cherry");
        flower_cherry.attr({x:403, y:469, z:10, w:20});
        //var pacman_life = Crafty.e("2D, DOM,spr_pacman");
        //pacman_life.attr({x:370, y:467, z:10, w:20});
        this.text("Lives: " +total_life +"x");

    } });


//Bar at the bottom showing Game Status
Crafty.c("status_bar", {
    init:function(){
        this.requires("DOM, 2D, Text");
        //this.attr({x:20, y:465, z:500, w:500});
        this.textColor("#ffffff");
        this.textFont({ size: '20px', weight: 'bold'});
        //this.text("Status: " + gameStatus);
    },

    update:function(){
        //this.text("Status: " + gameStatus);

    } });
Crafty.c("final_score",function() {
    Crafty.background("#000"); Crafty.e("button_back"); 
    scoreText = "Total Score: (" + total_score.toString() + ")";        
    Crafty.e("DOM, 2D, Text") 
    .attr({x:50, y:180, w:200, h:50}) 
    .textFont({ size: '30px', weight: 'bold' }) 
    .textColor("#ffffff")
    .text(scoreText)
     });

