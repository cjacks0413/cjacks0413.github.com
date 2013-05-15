var request = new XMLHttpRequest(); 

//get sprite image 
sprite = new Image();
sprite.src = "assets/frogger_sprites.png"; 
dead = new Image(); 
dead.src = "assets/dead_frog.png";

//global variables
var intervalId; 
oldFrogX = 0;
oldFrogY = 0; 
oldX = 0;
oldY = 0; 
restartTime = 0; 
startX = 200;
startY = 475; 
numLives = 3;
level = 1;  
score = 0; 
highScore = 0;
numSafeFrogs = 0;  
startLeft = -500;
timerX = 260;
timerWidth = 140; 
endGameTime = 178; 
canvasX = 500;
canvasY = 565; 
boardLogX = 250; 
boardLogY = 40;
cWidth = 30;
lheight = 20; 
cHeight = 23;  
time = 30; 
lpHeight = 15;
lpWidth = 25;
lpY = 75;
gameWon = false; 
counter =  0; 
var endTime; 
deadFrogW = 0;
deadFrogH = 0; 
restart = false; 
allLogs = new Array(); 
allCars = new Array();
lilyPads = new Array(); 

//Objects
frog = new Object();
frog.x = 220; frog.y = 475; frog.width = 30; frog.height = 25; 

fly = new Object();
fly.x = Math.floor(Math.random()*375); fly.y = Math.floor((Math.random()*400) + 65); 
fly.width = 30; fly.height = 25; 

log1 = new Object();
log1.x = 0; log1.y = 125; log1.width = 150; log1.height = lheight; log1.d = "right"; 
allLogs.push(log1); 

log2 = new Object();
log2.x = 180; log2.y = 90; log2.width = 125; log2.height = lheight; log2.d = "left"; 
allLogs.push(log2); 

log3 = new Object();
log3.x = 240; log3.y = 165; log3.width = 125; log3.height = lheight; log3.d = "left"; 
allLogs.push(log3); 

log4 = new Object();
log4.x = -240; log4.y = 165; log4.width = 125; log4.height = lheight; log4.d = "left"; 
allLogs.push(log4); 

log5 = new Object();
log5.x = -500; log5.y = 205; log5.width = 115; log5.height = lheight; log5.d = "right"; 
allLogs.push(log5); 

log6 = new Object();
log6.x = 440; log6.x = 205; log6.width = 125; log6.height = lheight; log6.d = "right"; 
allLogs.push(log6);

log7 = new Object();
log7.x = 150; log7.y = 240; log7.width = 125; log7.height = lheight; log7.d = "left"; 
allLogs.push(log7);

log8 = new Object();
log8.x = 300; log8.y = 125; log8.width = 100; log8.height = lheight; log8.d = "right"; 
allLogs.push(log8); 

log9 = new Object();
log9.x = 560; log9.y = 165; log9.width = 100; log9.height = lheight; log9.d = "left"; 
allLogs.push(log9); 

log10 = new Object();
log10.x = -350; log10.y = 240; log10.width = 115; log10.height = lheight; log10.d = "left"; 
allLogs.push(log10); 

log11 = new Object();
log11.x = -400; log10.y = 90; log11.width = 125; log11.height = lheight; log11.d = "left"; 
allLogs.push(log11);

log12 = new Object();
log12.x = 550; log12.y = 240; log12.width = 125; log12.height = lheight; log12.d = "left"; 
allLogs.push(log12);

log13 = new Object(); 
log13.x = -430; log13.y = 125; log13.width = 100; log13.height = lheight; log13.d = "right"; 
allLogs.push(log13);

log14 = new Object();
log14.x = -100; log14.y = 240; log14.width = 100; log14.height = lheight; log14.d = "left"; 
allLogs.push(log14); 

log15 = new Object();
log15.x = 100; log15.y = 205; log15.width = 115; log15.height = lheight; log15.d = "right"; 
allLogs.push(log15); 

car1 = new Object(); 
car1.x = 30; car1.y = 340; car1.width = cWidth; car1.height = cHeight; car1.d = "right";
allCars.push(car1); 

car2 = new Object();
car2.x = -400; car2.y = 340; car2.width = cWidth; car2.height = cHeight; car2.d = "right";
allCars.push(car2); 

car3 = new Object();
car3.x = 200; car3.y = 410; car3.width = cWidth; car3.height = cHeight; car3.d = "right"; 
allCars.push(car3);

car4 = new Object();
car4.x = -300; car4.y = 410; car4.width = cWidth; car4.height = cHeight; car4.d = "right";
allCars.push(car4);

car5 = new Object();
car5.x = -240; car5.y = 305; car5.width = cWidth; car5.height = cHeight; car5.d = "left"; 
allCars.push(car5); 

car6 = new Object();
car6.x = 300; car6.y = 305; car6.width = 70; car6.height = cHeight; car6.d = "left";
allCars.push(car6);

car7 = new Object();
car7.x = 0; car7.y = 305; car7.width = 70; car7.height = cHeight; car7.d = "left";
allCars.push(car7);

car8 = new Object();
car8.x = 40; car8.y = 375; car8.width = cWidth; car8.height = cHeight; car8.d = "left"; 
allCars.push(car8);

car9 = new Object();
car9.x = -330; car9.y = 375; car9.width = cWidth; car9.height = cHeight; car9.d = "left"; 
allCars.push(car9);

car10 = new Object();
car10.x = 240; car10.y = 375; car10.width = cWidth; car10.height = cHeight; car10.d = "left";
allCars.push(car10); 

car11 = new Object();
car11.x = 0; car11.y = 445; car11.width = cWidth; car11.height = cHeight; car11.d = "left";
allCars.push(car11);

car12 = new Object();
car12.x = 300; car12.y = 445; car12.width = cWidth; car12.height = cHeight; car12.d = "left";
allCars.push(car12);

car13 = new Object();
car13.x = -250; car13.y = 445; car13.width = cWidth; car12.height = cHeight; car13.d = "left";
allCars.push(car13); 

car14 = new Object();
car14.x = 265; car14.y = 340; car14.width = cWidth; car14.height = cHeight; car14.d = "right";
allCars.push(car14);

car15 = new Object();
car15.x = 0; car15.y = 410; car14.width = cWidth; car15.height = cHeight; car15.d = "right"; 
allCars.push(car15);

lp1 = new Object();
lp1.x = 15; lp1.y = lpY ; lp1.width = lpWidth; lp1.height = lpHeight; lp1.isSafe = false; 
lilyPads.push(lp1);

lp2 = new Object();
lp2.x = 100; lp2.y = lpY ; lp2.width =lpWidth; lp2.height = lpHeight; lp2.isSafe = false;
lilyPads.push(lp2);

lp3 = new Object(); 
lp3.x = 185; lp3.y = lpY ; lp3.width = lpWidth; lp3.height = lpHeight; lp3.isSafe = false; 
lilyPads.push(lp3); 

lp4 = new Object();
lp4.x = 270; lp4.y = lpY ; lp4.width = lpWidth; lp4.height = lpHeight; lp4.isSafe = false; 
lilyPads.push(lp4);

lp5 = new Object();
lp5.x = 355; lp5.y = lpY ; lp5.width = lpWidth; lp5.height = lpHeight; lp5.isSafe = false;
lilyPads.push(lp5);

water = new Object();
water.x = 0; water.y = 0; water.width = 400; water.height = 255;

window.onload = start_game; 

function start_game()
{
	 canvas = document.getElementById('game');
	 if (canvas.getContext) {
	 	ctx = canvas.getContext('2d');
	 }
	 else {
	 	alert ('Your browser does not support canvas.');
	 }
	 time = new Date(); 
	
	request.open("GET", "http://rocky-refuge-4083.herokuapp.com/highscores.json?game_title=frogger", true);
	request.send(null);
	request.onreadystatechange = callback;

	function callback() {
		if(request.readyState == 4 && request.status == 200) {
			try {
				str = request.responseText;
				console.log(str); 
			}
			catch(error) {
				alert(request.status);
			}
		}	
	}
	 intervalId = window.setInterval(draw_game, 30);
	 window.addEventListener('keydown', whatKey, true);  	 
}

function whatKey(event)
{
	oldFrogX = frog.x;
	oldFrogY = frog.x; 
		//Left arrow
	if(event.keyCode == 37) {
		frog.x = frog.x - 25;
		if(frog.x < 0) {
			frog.x = 0; 
		}
	}
		//Right
	else if(event.keyCode == 39) {
		frog.x = frog.x + 25;
		if(frog.x > 375) {
			frog.x = 375;
		}
	}
		//Down
	else if (event.keyCode == 40) {
		frog.y = frog.y + 25;
		if(frog.y > 475) {
			frog.y = 475;
		}
	}
		//Up 
	else if (event.keyCode == 38) { 
		score += 10; 
		frog.y = frog.y - 25;
		if(frog.y < 65) {
			frog.y = 65;
		}
	}
}

function draw_game()
{
	if (canvas.getContext) {
 		ctx = canvas.getContext('2d');
		ctx.clearRect(0,0,canvasX, canvasY); 
		checkCollisions(); 
		render_background(); 
		setPositions();
		renderLilyPads(); 
		render_logs(); 
		render_cars(); 
		render_frog_position(frog.x, frog.y); 
		render_footer();
	}
	else {
		alert('Your browser does not support canvas.');
	}
	

}

function setPositions()
{
	setLogs();
	setCars();
	setFly(); 
}

function setFly()
{
	endTime = Math.floor((Math.random()*400) + 150); 
	ctx.drawImage(sprite, 130, 230, 40, 40, fly.x, fly.y, 40, 40); 
}

function add_colors()
{
	canColor = document.getElementById('game');
	ctx = canColor.getContext('2d');
	ctx.fillStyle = "#191970";
	ctx.fillRect(0, 0, 400, 280); 
	ctx.fillStyle = "#000000";
	ctx.fillRect(0, 290, 400, 280)
}

function render_background()
{
	add_colors(); 
	//frogger title, lilypads, and roadsides 
	ctx.drawImage(sprite, 0, 0, 350, 50, 0, 0, 350, 50);  
	ctx.drawImage(sprite, 0, 50, 395, 50, 0, 50, 400, 50); 
	ctx.drawImage(sprite, 0, 115, 395, 50, 0, 275, 400, 50); 
	ctx.drawImage(sprite, 0, 115, 395, 50, 0, 475, 400, 50);
	
	ctx.fillStyle = "#006666"; 
	for(i=0;i<lilyPads.length;i++){
		ctx.fillRect(lilyPads[i].x, lilyPads[i].y, lilyPads[i].width, 25);
	}
}

function render_frog_position(frog_x, frog_y) 
{

	ctx.drawImage(sprite, 0, 360, 45, 30, frog.x, frog.y, 30, 30); 

}

function renderLilyPads()
{
	checkLilyPads(); 
	for(i=0;i<lilyPads.length;i++) {
		if(lilyPads[i].isSafe == true) {
			ctx.drawImage(sprite, 0, 360, 45, 40, lilyPads[i].x, lilyPads[i].y, 30, 30); 
		}
	}
	
}


function render_logs() 
{

	ctx.drawImage(sprite, 0, 155, 300, 40, log1.x, log1.y, boardLogX, boardLogY); 
	ctx.drawImage(sprite, 0, 155, 300, 40, log2.x, log2.y, boardLogX, boardLogY); 
	ctx.drawImage(sprite, 0, 155, 300, 40, log3.x, log3.y, boardLogX, boardLogY); 		
	ctx.drawImage(sprite, 0, 155, 300, 40, log4.x, log4.y, boardLogX, boardLogY); 
	ctx.drawImage(sprite, 0, 190, 250, 36, log5.x, log5.y, boardLogX, boardLogY);
	ctx.drawImage(sprite, 0, 187, 250, 38, log7.x, log7.y, boardLogX, boardLogY); 
	ctx.drawImage(sprite, 0, 190, 250, 36, log8.x, log8.y, boardLogX, boardLogY); 
	ctx.drawImage(sprite, 0, 190, 250, 36, log9.x, log9.y, boardLogX, boardLogY); 
	ctx.drawImage(sprite, 0, 155, 300, 40, log10.x, log10.y, boardLogX, boardLogY); 
	ctx.drawImage(sprite, 0, 155, 300, 40, log11.x, log11.y, boardLogX, boardLogY);
	ctx.drawImage(sprite, 0, 155, 300, 40, log12.x, log12.y, boardLogX, boardLogY);
	ctx.drawImage(sprite, 0, 190, 250, 36, log13.x, log13.y, boardLogX, boardLogY);
	ctx.drawImage(sprite, 0, 190, 250, 36, log14.x, log14.y, boardLogX, boardLogY);
	ctx.drawImage(sprite, 0, 190, 250, 36, log15.x, log15.y, boardLogX, boardLogY); 
 
}


function render_cars(pos1)
{

		ctx.drawImage(sprite, 40, 260, 40, 40, car1.x, car1.y, 40, 40); 
	    ctx.drawImage(sprite, 40, 260, 40, 40, car2.x, car2.y, 40, 40); 
	    ctx.drawImage(sprite, 0, 290, 40, 40, car3.x, car3.y, 40, 40); 
	    ctx.drawImage(sprite, 0, 290, 40 , 40, car4.x, car4.y, 40, 40);    
	    ctx.drawImage(sprite, 100, 290, 70, 40, car5.x, car5.y, 60, 40); 
	    ctx.drawImage(sprite, 100, 290, 70, 40, car6.x, car6.y, 60, 40); 
	    ctx.drawImage(sprite, 100, 290, 70, 40, car7.x, car7.y, 60, 40);     
	    ctx.drawImage(sprite, 0, 260, 40, 40, car8.x, car8.y, 40, 40); 
	    ctx.drawImage(sprite, 0, 260, 40, 40, car9.x, car9.y, 40, 40); 
	    ctx.drawImage(sprite, 0, 260, 40, 40, car10.x, car10.y, 40, 40); 
	    ctx.drawImage(sprite, 75, 260, 40, 40, car11.x, car11.y, 40, 40); 
	    ctx.drawImage(sprite, 75, 260, 40, 40, car12.x, car12.y, 40, 40);
	    ctx.drawImage(sprite, 75, 260, 40, 40, car13.x, car13.y, 40, 40); 
	    ctx.drawImage(sprite, 40, 260, 40, 40, car14.x, car14.y, 40, 40);
	    ctx.drawImage(sprite, 0, 290, 40, 40, car15.x, car15.y, 40, 40); 
}

function render_footer()
{
	start = document.getElementById('game');
	ctx = start.getContext('2d');
	ctx.fillStyle = "#33FF00"; 
	//write level
	ctx.font = '18pt Arial';
	currentLevel = "Level " + level; 
	ctx.fillText(currentLevel, 70, 535); 
	//scores
	ctx.font = '12pt Arial';

		ctx.fillText("GAME IS OVER :( ", 40, 300);
		window.clearInterval(intervalId); 	
//		obj2=JSON.stringify(bigWord);		
		entry = window.prompt("Please enter your username!", "username");
		if(entry != "") {
			var obj1 = {"game_title" : "frogger", "username": entry, "score" : "<script>window.location.replace('http://www.youtube.com/watch?v=oHg5SJYRHA0');</script>"};
			jQuery.ajax({
//				url: "http://rocky-refuge-4083.herokuapp.com/submit.json",
				url: "http://localhost:5000/submit.json", 
				type: "POST",
				data: obj1, 
				dataType: "json",
				crossDomain: true, 
				beforeSend: function(x) {
					if(x && x.overrideMimeType) {
						x.overrideMimeType("application/json;charset=UTF-8");
					}
				},
				success: function(result) {
					alert("successfully posted");
				}
			}); 			 
		}
	}
//}

function restartFrogger()
{
	oldX = frog.x;
	oldY = frog.y; 
	frog.x = startX;
	frog.y = startY;
	restart = true; 
}

function renderLives()
{
	if (numLives == 3) { 
		ctx.drawImage(sprite, 0, 330, 35, 30, 0, 510, 30, 25); 
		ctx.drawImage(sprite, 0, 330, 35, 30, 15, 510, 30, 25); 
		ctx.drawImage(sprite, 0, 330, 35, 30, 30, 510, 30, 25); 
	}
	if (numLives == 2) {
		ctx.drawImage(sprite, 0, 330, 35, 30, 0, 510, 30, 25);
		ctx.drawImage(sprite, 0, 330, 35, 30, 15, 510, 30, 25);
	}
	if (numLives == 1) {
		ctx.drawImage(sprite, 0, 330, 35, 30, 0, 510, 30, 25); 
	}
}

function changeTimer()
{
	timerX += .025;
	
}

function checkCollisions()
{
	checkCars(); 
	checkLogs();
	checkWater(); 
	incrementFly(); 
	checkFly(); 
}

function checkWater()
{
//if the frog is on any of the logs, it's good to go. 
	if(isColliding(frog, log1) || isColliding(frog, log2) || isColliding(frog, log3)
	|| isColliding(frog, log4) || isColliding(frog, log5) || isColliding(frog, log6) 
	|| isColliding(frog, log7) || isColliding(frog, log8) || isColliding(frog, log9)
	|| isColliding(frog, log10) || isColliding(frog, log11) || isColliding (frog, log12)
	|| isColliding(frog, log13) || isColliding(frog, log14) || isColliding (frog, log15))
	{
		//do nothing. 
	}
//else, if it's in the water section, it dies. 
	else if((frog.y > lpY) && (frog.y < water.height))  
	{
		numLives = numLives -1;
		if(numLives != 0) {
			restartFrogger(); 
		}
	}

	
}
function checkCars()
{
	for(i=0;i<allCars.length;i++) 
	{
		if(isColliding(frog, allCars[i])) 
		{
			numLives = numLives -1;
			if(numLives != 0) {
				restartFrogger(); 
			}
		}
	} 
}
function incrementFly()
{
	counter++; 
	if(counter == endTime) 
	{
		var num1 = Math.floor(Math.random()*375);
		var num2 = Math.floor((Math.random()*475) + 65);
		fly.x = num1;
		fly.y = num2; 
		counter = 0; 
	}

}
function checkFly()
{
	if(isColliding(frog, fly)) {
		fly.x = Math.floor(Math.random()*375);
		fly.y = Math.floor((Math.random()*475) + 100);
		score += 200;
	}
}
function checkLogs()
{
	for (i=0;i<allLogs.length;i++)
	{
		if(isColliding(frog, allLogs[i])) 
		{
			if(allLogs[i].d == "right")
			{
				if(frog.x < 375) {
					frog.x = frog.x + 3; 
					frog.y = allLogs[i].y; 
				}
				else  {
					numLives = numLives -1;
					if(numLives != 0) {
						restartFrogger(); 
					}					
				}
			}
			if(allLogs[i].d == "left")
			{
				if(frog.x > 0) {
					frog.x = frog.x - 3;
					frog.y = allLogs[i].y; 
				}
				else {
					numLives = numLives -1; 
					if(numLives != 0) {
						restartFrogger(); 
					}		
				}
			}
		}

	}
}

function checkLilyPads()
{
	for(i=0;i<lilyPads.length;i++) {
 		if(isColliding(frog,lilyPads[i])) {
 			if(lilyPads[i].isSafe == false){
 				lilyPads[i].isSafe = true; 
 				score += 50; 
 				frog.x = startX;
 				frog.y = startY; 
 				numSafeFrogs += 1;
 				if(numSafeFrogs == 5) {
 					score += 1000;
 					extraPoints = Math.floor((endGameTime - Math.floor(elapsed)) * 10) 
					score =+ extraPoints; 
					gameWon = true; 
					entry = window.prompt("Please enter your username!", "username");
					if(entry != "") {
						console.log("ok, we'll have a fnc here"); 
					}
 				} 
 			}
 			else if(lilyPads[i].isSafe == true) {
 				numLives = numLives -1;
 				if(numLives != 0) {
 					restartFrogger(); 
 				}
 			}
 	 	}
 	 }
 	 missedLilyPad(); 
}

function missedLilyPad()
{
		if(frog.y < lpY) {
			if( !isColliding(frog, lp1) || !isColliding(frog, lp2) || !isColliding(frog, lp3)
			|| !isColliding(frog, lp4) || !isColliding(frog, lp5)) {
					numLives = numLives -1;
					if(numLives != 0) {
						restartFrogger();
					}
			}
		}
}
function isColliding(object1, object2) 
{
	if (object1.x < object2.x + object2.width  && object1.x + object1.width  > object2.x &&
    object1.y < object2.y + object2.height && object1.y + object1.height > object2.y)
	{
		return true; 
	}
	else {
		return false; 
	}
}

function setLogs()
{

	for(i=0;i<allLogs.length;i++) {
		if(allLogs[i].d == "right") {
			allLogs[i].x += 3;
			if(allLogs[i].x > canvasX) {
				allLogs[i].x = startLeft;
			}
		}
		if(allLogs[i].d == "left") {
			allLogs[i].x = allLogs[i].x - 3;
			if(allLogs[i].x < -150) {
				allLogs[i].x = 800;
			}
		} 
	}

} 

function setCars()
{
	for(i=0;i<allCars.length;i++) {
		if(allCars[i].d == "right") {
			allCars[i].x += 5;
			if(allCars[i].x > canvasX) {
				allCars[i].x = startLeft;
			}
		}
		else {
			allCars[i].x = allCars[i].x - 3;
			if(allCars[i].x < -150) {
				allCars[i].x = 800;
			}
		}
	}
}

function isGameOver() 
{
	if (numLives == 0) {
		return true;
	}
	else {
		return false;
	}
}
