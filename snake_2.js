/*
 * JavaScript Snake game with multi snakes
 * 
 * @author: Ivan Lazarevic
 * @web: http://workshop.rs
 * @version: 1.2 (11/27/2010)
 * 
 */
 
 
var KEY = false; // pressed key
var SNAKES = new Array(); // all snakes objects
var INTERVAL = false; // time interval


/*
 * Initialize panel
 */
var panel = {};
 
panel.initialize = function(){
	
	BODY = document.getElementsByTagName('body')[0];
	FIELD = document.createElement('div'); // field that will hold snakes
	FOOD = document.createElement('div'); // food holder
	SCOREBOARD = document.createElement('div'); // scoreboard holder
	SCOREBOARD.setAttribute('id','scoreboard');
	SCOREBOARD.style.position = 'fixed';
	
	BODY.appendChild(FIELD);
	BODY.appendChild(FOOD);
	BODY.appendChild(SCOREBOARD);
	
	this.control();
	
	snake1 = new snake;
	snake1.initialize();

	food.create();

	INTERVAL = setInterval('panel.interval()',100);
	
}

/*
 * Main function that will be repeated in interval
 */
panel.interval 	= function(){
	
	for(var i in SNAKES){
		SNAKES[i].move();		
	}

	this.colision();

}

/*
 * Detect colisions between snakes
 */
panel.colision 	= function(){
	
	for(var i in SNAKES){
		if(SNAKES[i].colideOthers()) {
			this.gameover(SNAKES[i].colideOthers());
			return true;	
		}
	}
	
	return false;
		
}

/*
 * Game over
 */
panel.gameover = function(snake){

	if(snake.length > 1){
		for(var i=0;i<snake.length;i++){
			snake[i].kill();
		}
		return true;
	} else {
		snake.kill();
		return true;
	}
	
	return false;
	
}

/*
 * Catch key pressed
 */
panel.control	= function(){
	window.addEventListener('keydown', function(e){
		KEY = e.keyCode;
	},false);		
}



/*
 * Snake object
 */
function snake(){};

snake.prototype.controls = {
	37 : 'left',
	39 : 'right',
	38 : 'up',
	40 : 'down'
}

snake.prototype.id					= '';
snake.prototype.no					= 0;
snake.prototype.color 				= 'black';
snake.prototype.size				= 20;
snake.prototype.current_direction	= 'right';
snake.prototype.previous_direction	= 'right';
snake.prototype.left				= 0;
snake.prototype.top					= 0;
snake.prototype.score				= 1;

/*
 * Initialize Snake
 */
snake.prototype.initialize = function(){
	
	SNAKES.push(this);
	
	var sLen = SNAKES.length;
	
	this.id = 'snake_'+sLen;
	this.no = sLen;
	
	var snake_ 	= document.createElement('div');
		snake_.setAttribute('id', this.id);
	
	var part = this.part();
		snake_.appendChild(part);
	
	var score_ = document.createElement('div');
	var scoreTitle_ = document.createElement('div');
		scoreTitle_.innerHTML = 'snake_' + sLen + ' (' + this.color + '): ';
		score_.appendChild(scoreTitle_);
	var scoreResult_ = document.createElement('span');
		scoreResult_.innerHTML = this.score;
		scoreResult_.setAttribute('id','score_snake_' + sLen);
		score_.appendChild(scoreResult_);
	
	FIELD.appendChild(snake_);
	SCOREBOARD.appendChild(score_);
	
	return true;
	
}

/*
 * One part of snake - joint
 */
snake.prototype.part = function(){

	var part = document.createElement('div');
		part.style.width  		= '20px';
		part.style.height 		= '20px';
		part.style.position		= 'absolute';
		part.style.background	= this.color;
		part.style.top			= this.top + 'px';
		part.style.left			= this.left + 'px';	
		
	return part;	
}

/* 
 * Move snake 
 */
snake.prototype.move = function(){
	
	if(this.controls[KEY]){
		direction = this.controls[KEY];
		if(direction == 'left' && this.current_direction == 'right') direction = this.current_direction;	
		if(direction == 'right' && this.current_direction == 'left') direction = this.current_direction;	
		if(direction == 'down' && this.current_direction == 'up') direction = this.current_direction;	
		if(direction == 'up' && this.current_direction == 'down') direction = this.current_direction;	
	}
	else {
		direction = this.current_direction;	
	}
	
	this.current_direction = direction;	

	var part = this.part();
		
	if(direction == 'left'){
		this.left -= this.size;
	}
	
	if(direction == 'right'){
		this.left += this.size;
	}

	if(direction == 'up'){
		this.top -= this.size;
	}
	
	if(direction == 'down'){
		this.top += this.size;
	}	

	if(this.top >= document.height) this.top = 0;
	if(this.top < 0) this.top = Math.floor(document.height/20)*20;
	if(this.left >= document.width) this.left = 0;
	if(this.left < 0) this.left = Math.floor(document.width/20)*20;

	part.style.left = this.left + 'px';	
	part.style.top = this.top + 'px';	

	if(this.colideSelf()){
		this.kill();
		return false;
	}

	var snake_ = document.getElementById(this.id);
	snake_.appendChild(part);
	
	if(!this.eat())
		snake_.removeChild(snake_.firstChild);
		
	return true;
	
}

/*
 * Check if snake eat the food
 */
snake.prototype.eat = function(){
	
	if(this.left == food.left && this.top == food.top){
		this.scoreUpdate();
		food.eat();
		food.create();
		return true;
	}
	
	return false;
}

/*
 * Update scoreboard
 */
snake.prototype.scoreUpdate = function(){
	this.score++;
	var score_ = document.getElementById('score_'+this.id);
		score_.innerHTML = this.score;
	return true;
}

/*
 * Check if snake colide with herself
 */
snake.prototype.colideSelf = function(){
	
	var parts	 = document.getElementById(this.id).getElementsByTagName('div');
	var partsLen = parts.length;
	
	for(var i=0;i<partsLen;i++){
		var top_ = parseInt(parts[i].style.top);
		var left_ = parseInt(parts[i].style.left); 
		if(top_ == this.top && left_ == this.left)
			return true;
	}
	
	return false;	
}

/* 
 * Check if snake's head colide with any part of other snakes
 */
snake.prototype.colideOthers = function(){
	
	for(var i in SNAKES){
		if(SNAKES[i].id == this.id) continue;
		
		var parts	 = document.getElementById(SNAKES[i].id).getElementsByTagName('div');
		var partsLen = parts.length;		
		
		for(var j=0;j<partsLen;j++){
			var top_ = parseInt(parts[j].style.top);
			var left_ = parseInt(parts[j].style.left); 
			if(top_ == this.top && left_ == this.left){
				if(j==0){
					return [this, SNAKES[i]];
				} else {
					return this;
				}		
			}		
		}
	}
	
	return false;
	
}

/*
 * Kill the Snake and end the game
 */
snake.prototype.kill = function(){

	document.getElementById('score_'+this.id).style.color = 'red';
	FIELD.removeChild(document.getElementById(this.id));
	SNAKES.pop(this.no);
	
	if(SNAKES.length <= 1){
		clearInterval(INTERVAL);
		FOOD.innerHTML = 'GAME OVER';
	}
		
	return true;
}



/*
 * Food object
 */
var food = { };

/*
 * Create food and place random on screen
 */
food.create = function(){
	
	food.top	= Math.floor(Math.random()*parseInt(document.height/20))*20;
	food.left	= Math.floor(Math.random()*parseInt(document.width/20))*20;
	
	var food_ = document.createElement('div');
		food_.style.width  		= '20px';
		food_.style.height 		= '20px';
		food_.style.position	= 'absolute';
		food_.style.top			= food.top + 'px';
		food_.style.left		= food.left + 'px';
		food_.style.background	= 'red';
		food_.setAttribute('id','food');
	
	FOOD.appendChild(food_);	
	return true;
	
};

/*
 * Remove food if is eaten
 */
food.eat = function(){
	FOOD.removeChild(document.getElementById('food'));
	return true;
}
