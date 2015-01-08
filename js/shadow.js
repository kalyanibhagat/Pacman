
Crafty.c('Shadow', {
	 isWeak: false, // checks whether a ghost is vulnerable or not
	 isDead: false, // checks whether a ghost has been eaten or not

         init: function() {
            this.requires('Actor, spr_blinky, Collision, SpriteAnimation')
            .attr({direction: 'LEFT', initx:this.x, inity:this.y})
            .turnOnSolids()
            .onHit('Wallh', this.keepMoving)
            .onHit('Wallv', this.keepMoving)
            .onHit('Pacman', this.killPacman)
            .reel('RedGhostMovingLeft', 300, 0, 2, 2)
            .reel('RedGhostMovingRight',300, 0, 0, 2)
            .reel('RedGhostMovingUp',   300, 0, 3, 2)
            .reel('RedGhostMovingDown', 300, 0, 1, 2)
            .reel('turnBlue', 300, 12, 0, 3)
         
            var speed = 1.5;
            var animation_speed = 4;
			this.z = 1;
            this.bind('EnterFrame', function () {
            // Default ghost directions
                if (this.direction === 'UP'){
                    this.y -= speed;
                }
                if (this.direction === 'DOWN'){
                    this.y += speed;
                }
                if (this.direction === 'LEFT'){
                    this.x -= speed;
                }
                if (this.direction === 'RIGHT'){
                    this.x += speed;
                }
            });
         
            this.bind('PelletEaten', this.makeWeak); // a trigger is used to call the makeWeak function
			this.bind('Reverse', this.changeDirection); // a trigger is used to call the changeDirection function
    },

	setInitPos: function() {
    //Store the initial postion, so that we can use these co-ordinates
    //to restore it later
		this.initx = this.x;
		this.inity = this.y;
	},

	resetPos: function () {
    // Restore the position to the original coordinates
        Crafty("Shadow").each(
            function() {
                this.attr({
                    x: this.initx,
                    y: this.inity,
                });
            }
        );
    },

	makeWeak: function () {
    // Make ghosts vulnerable for 10 seconds
        this.isWeak = true;
        Crafty.trigger("Reverse");
        this.animate('turnBlue', -1);
        this.timeout(function () {
            if (!this.isDead) {
                this.isWeak = false;
            }
        }, 10000);
    },
		 
	changeDirection: function() {
    // Ghost A.I. for vulnerability
         var pac = Crafty('Pacman');
            if (this.x > pac.x) {
                this.direction = "RIGHT";
            } else if (this.x < pac.x) {
                this.direction = "LEFT";
            } else if (this.y > pac.y) {
                this.direction = "DOWN";
            } else if (this.y < pac.y) {
                this.direction = "UP";
            }
    },

    killPacman: function(data){
         pacman = data[0].obj;
         if (this.isWeak) {
            this.isDead = true;
            Crafty.audio.play('eatghost');
            total_score = total_score + (100*2);
            this.isWeak = false; 
            pacman.resetRedGhosts();
           
         } else {
            Crafty.audio.play('death');
            pacman_alive = false;
            if (pacman.life == 1) {
			    pacman.updateLife();
                pacman.resetGame("Game Lost: Restarting in 5 secs");
            } else {
                pacman.resetGhosts();
                pacman.updateLife();
            }
        }
    },
         
    turnOnSolids: function(){
        this.onHit('Solid', this.stopAndTurn);
        return this;
    },
         
    stopAndTurn: function(){
        this._speed = 0;
        if (this._movement){
            this.x -= this._movement.x;
            this.y -= this._movement.y;
        }
    },
         
    keepMoving: function(data) {
    // Ghost A.I. for the red ghost
         var pac = Crafty('Pacman');
         if (this.direction === "LEFT") {
            var upAvailable = this.at().y - 1; // The next move above
            var downAvailable = this.at().y + 1; // the next move below
            if (upAvailable ^ downAvailable) { // If both directions are available, choose randomly
                var newDirection = Crafty.math.randomInt(1,2); // Random number between 1 and 2
                if ((this.y > pac.y + 80) && (pacman_alive === true)) {
                    this.at(Math.round(this.at().y),Math.round(this.at().x));
                    if (this.isWeak)
                        this.animate("turnBlue", -1);
                    else
                        this.animate('RedGhostMovingUp', -1);
                        this.direction = "UP";
                } else if ((this.y < pac.y + 80) && (pacman_alive === true)) {
                    this.at(Math.round(this.at().y),Math.round(this.at().x));
                    if (this.isWeak)
                        this.animate("turnBlue", -1);
                    else
                        this.animate('RedGhostMovingDown', -1);
                        this.direction = "DOWN";
                } else if ((this.y === pac.y + 80) || (pacman_alive === false)) {
                    if (newDirection === 1) {
                        this.at(Math.round(this.at().y),Math.round(this.at().x));
                        if (this.isWeak)
                            this.animate("turnBlue", -1);
                        else
                            this.animate('RedGhostMovingLeft', -1);
                            this.direction = "UP";
                    } else if (newDirection === 2) {
                        this.at(Math.round(this.at().y),Math.round(this.at().x));
                        if (this.isWeak)
                            this.animate("turnBlue", -1);
                        else
                            this.animate('RedGhostMovingRight', -1);
                            this.direction = "DOWN";
                    }
                }
            }
         } else if (this.direction === "RIGHT") {
            var upAvailable = this.at().y - 1; // The next move above
            var downAvailable = this.at().y + 1; // The next move below
            if (upAvailable ^ downAvailable) { // If both directions are available, choose randomly
                var newDirection = Crafty.math.randomInt(1,2); // Random number between 1 and 2
                if ((this.y > pac.y + 80) && (pacman_alive === true)) {
                    this.at(Math.round(this.at().y),Math.round(this.at().x));
                    if (this.isWeak)
                        this.animate("turnBlue", -1);
                    else
                        this.animate('RedGhostMovingUp', -1);
                        this.direction = "UP";
                } else if ((this.y < pac.y + 80) && (pacman_alive === true)) {
                    this.at(Math.round(this.at().y),Math.round(this.at().x));
                    if (this.isWeak)
                        this.animate("turnBlue", -1);
                    else
                        this.animate('RedGhostMovingDown', -1);
                        this.direction = "DOWN";
                } else if ((this.y === pac.y + 80) || (pacman_alive === false)) {
                    if (newDirection === 1) {
                        this.at(Math.round(this.at().y),Math.round(this.at().x));
                        if (this.isWeak)
                            this.animate("turnBlue", -1);
                        else
                            this.animate('RedGhostMovingLeft', -1);
                            this.direction = "UP";
                    } else if (newDirection === 2) {
                        this.at(Math.round(this.at().y),Math.round(this.at().x));
                        if (this.isWeak)
                            this.animate("turnBlue", -1);
                        else
                            this.animate('RedGhostMovingRight', -1);
                            this.direction = "DOWN";
                    }
                }
            }
         } else if (this.direction === "UP") {
            var leftAvailable = this.at().x - 1; // The next move to the left
            var rightAvailable = this.at().x + 1; // The next move to the right
            if (leftAvailable ^ rightAvailable) { // If both directions are available, choose randomly
                var newDirection = Crafty.math.randomInt(1,2); // Random number between 1 and 2
                if ((this.x > pac.x + 80) && (pacman_alive === true)){
                    this.at(Math.round(this.at().y),Math.round(this.at().x));
                    if (this.isWeak)
                        this.animate("turnBlue", -1);
                    else
                        this.animate('RedGhostMovingLeft', -1);
                        this.direction = "LEFT";
                } else if ((this.x < pac.x + 80) && (pacman_alive === true)) {
                    this.at(Math.round(this.at().y),Math.round(this.at().x));
                    if (this.isWeak)
                        this.animate("turnBlue", -1);
                    else
                        this.animate('RedGhostMovingRight', -1);
                        this.direction = "RIGHT";
                } else if ((this.x === pac.x + 80) || (pacman_alive === false)) {
                    if (newDirection === 1) {
                        this.at(Math.round(this.at().y),Math.round(this.at().x));
                        if (this.isWeak)
                            this.animate("turnBlue", -1);
                        else
                            this.animate('RedGhostMovingLeft', -1);
                            this.direction = "LEFT";
                    } else if (newDirection === 2) {
                        this.at(Math.round(this.at().y),Math.round(this.at().x));
                        if (this.isWeak)
                            his.animate("turnBlue", -1);
                        else
                            this.animate('RedGhostMovingRight', -1);
                            this.direction = "RIGHT";
                    }
                }
            }
         } else if (this.direction === "DOWN") {
            var leftAvailable = this.at().x - 1; // The next move to the left
            var rightAvailable = this.at().x + 1; // The next move to the right
            if (leftAvailable ^ rightAvailable) { // If both directions are available, choose randomly
                var newDirection = Crafty.math.randomInt(1,2); // Random number between 1 and 2
                if ((this.x > pac.x + 80) && (pacman_alive === true)) {
                    this.at(Math.round(this.at().y),Math.round(this.at().x));
                    if (this.isWeak)
                        this.animate("turnBlue", -1);
                    else
                        this.animate('RedGhostMovingLeft', -1);
                        this.direction = "LEFT";
                } else if ((this.x < pac.x + 80) && (pacman_alive === true)) {
                    this.at(Math.round(this.at().y),Math.round(this.at().x));
                    if (this.isWeak)
                        this.animate("turnBlue", -1);
                    else
                        this.animate('RedGhostMovingRight', -1);
                        this.direction = "RIGHT";
                } else if ((this.x === pac.x + 80) || (pacman_alive === false)) {
                    if (newDirection === 1) {
                        this.at(Math.round(this.at().y),Math.round(this.at().x));
                        if (this.isWeak)
                            this.animate("turnBlue", -1);
                        else
                            this.animate('RedGhostMovingLeft', -1);
                            this.direction = "LEFT";
                    } else if (newDirection === 2) {
                        this.at(Math.round(this.at().y),Math.round(this.at().x));
                        if (this.isWeak)
                            this.animate("turnBlue", -1);
                        else
                            this.animate('RedGhostMovingRight', -1);
                            this.direction = "RIGHT";
                    }
                }
            }
         }
    },
});
