//total number of dots that are in the game maze
var totalDots = 0;
var GameWon= false;
Crafty.scene('Game', function () {
    totalDots = 0;
    var data = [];
    if(GameWon){
        console.log("GAMEWON:TRUE");
        data = SecondData;
        console.log(data.length);
    }else{
        console.log("GAMEWON:FALSE");
        data = FirstData;
        console.log(data.length);
    }
    for (var x1= 0; x1 < data.length; x1++)
    {
            var each_x1 = data[x1];
          for (var y1 = 0; y1 < each_x1.length; y1++)
          {
              
              //console.log("cube[" + x1 + "][" + y1 + "] = " + each_x1[y1]);
              var temp = each_x1[y1];

              if(temp === 0){
                 this.player = Crafty.e('Wallh').at(x1, y1);
              }         
              else if(temp === 8)
              {
                this.player = Crafty.e('Wallv').at(x1, y1);
                   //console.log("i am here dost");
              }
              else if(temp === 1)
              {
                this.player = Crafty.e('Dots').at(x1, y1);
                   //console.log("i am here dost");
                totalDots++;
              }
              else if(temp === 5)
              {
                 this.player = Crafty.e('Pacman').at(x1, y1);
                   //console.log("i am here pacman");
		 //set the initial co-ordinates
                 this.player.setInitPos();
              }
              else if (temp === 4) 
              {
                  this.player = Crafty.e('Shadow').at(x1,y1);
                  //console.log("i am here shadow");
		 //set the initial co-ordinates
		  this.player.setInitPos();
              }
             else if (temp === 13) 
             {
                 this.player = Crafty.e('Speedy').at(x1,y1);
                 //console.log("i am here speedy");
		 //set the initial co-ordinates
                 this.player.setInitPos();
             }
             else if (temp === 6) 
             {
                 this.player = Crafty.e('Bashful').at(x1,y1);
                 //console.log("i am here bashful");
		 //set the initial co-ordinates
		 this.player.setInitPos();
             }
            else if (temp === 7) 
            {
                this.player = Crafty.e('Pokey').at(x1,y1);
                //console.log("i am here clyde"); 
		 //set the initial co-ordinates
		 this.player.setInitPos();
            }
              else if(temp === 2)
              {
                  this.player= Crafty.e('Space').at(x1, y1);
                   //console.log("i am here space");
              }
              else if(temp === 3)
              {
                  this.player= Crafty.e('LargeDots').at(x1, y1);
                   //console.log("i am here ");
		   //store the total dots created, so that we will use that to 
		   //detect a Winning condition, when all dots are eaten
                  totalDots++;
              }

      }
      }
      //alert("totalDots: "+totalDots);
 
});
