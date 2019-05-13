let canvas = document.getElementById("main");
let c = canvas.getContext('2d');
canvas.width = window.innerWidth - 20;
canvas.height = window.innerHeight - 20;

//common
let gameStage = 0;
let mpos = new Vector(0,0);
let mouseState = {
	down: false
}

//gameStage 6
let backButton6 = new Button(canvas.width/10, canvas.height/6, 'Back', 30, 'black');

//gameStage 5
let backButton5 = new Button(canvas.width/10, canvas.height/6, "Back", 30, 'black');
let stage1 = [];
let stage2 = [];
let stage3 = [];
let stage4 = [];
let stage1Button = new Button(canvas.width*3/8, canvas.height*3/8, "1", 30, "black");
let stage2Button = new Button(canvas.width*3/8, canvas.height*5/8, "2", 30, "black");
let stage3Button = new Button(canvas.width*5/8, canvas.height*3/8, "3", 30, "black");
let stage4Button = new Button(canvas.width*5/8, canvas.height*5/8, "4", 30, "black");
let stageTag = new Tag(canvas.width/2, canvas.height/10, 'Selected');

//gameStage 4
let backButton4 = new Button(canvas.width/10, canvas.height/6, "Back", 30, 'black');
let colorButtons = [];
let p1Tag = new Tag(canvas.width*5/6, canvas.height/4, 'P1');
let p2Tag = new Tag(canvas.width*5/6, canvas.height*3/4, 'P2');
let p1Color = 'none';
let p2Color = 'none';



//gameStage 0
let playButton = new Button(canvas.width/2, canvas.height/2, 'Play', 60, 'random');
let colorSelectButton = new Button(canvas.width*3/4, canvas.height/4, "Color", 40, 'random');
let stageSelectButton = new Button(canvas.width/4, canvas.height/4, "Stage", 40, 'random');
let ruleButton = new Button(canvas.width/4, canvas.height*3/4, "Rules", 40, 'random');



//gameStage 3
let winner = null;
let backButton3 = new Button(canvas.width/2, canvas.height/2, 'Back', 30, 'black');


//gameStage 2
let energySpread = [];
let inPlace = 0;

//gameStage 1
let player1;
let player1name;
let player2;
let player2name;
let p1Vec;
let p2Vec;
let platforms = [];
let p1Energy = [];
let p2Energy = [];
let p1bullets = [];
let p2bullets = [];
let floatEnergy = [];
let floatEngSpd = 5;
let BULLETMAX = 15;
let MAXRAD = 40;
let hP1 = 0;
let hP2 = 0;
//Shoot Timers
let p1shootTime;
let p2shootTime;
//Charging bullets
let bullet1 = 0;
let bullet2 = 0;


let colorArray = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
		  '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
		  '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
		  '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
		  '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
		  '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
		  '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
		  '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
		  '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
		  '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];

let keys = {
    w: false,
    s: false,
    a: false,
    d: false,
	z: false,
	x: false
};

let controls = {
	i: false,
	k: false,
	j: false,
	l: false,
	n: false,
	m: false
};

function randomColor(){
    return colorArray[Math.floor(Math.random()*colorArray.length)];
}

function p1shootTimer(){
	p1shootTime = setTimeout(function(){
		player1.shootRestrict = false;
		clearTime1();
	}, 1000);
}

function clearTime1(){
	clearTimeout(p1shootTime);
}

function p2shootTimer(){
	p2shootTime = setTimeout(function(){
		player2.shootRestrict = false;
		clearTime2();
	}, 1000);
}

function clearTime2(){
	clearTimeout(p2shootTime);
}

function bulletRelease1(rad){
	let dir;
	if(!keys.w && !keys.s){
		dir = player1.dir;
	}else if(keys.w && !keys.s){
		dir = 'up';
	}else if(keys.s && !keys.w){
		dir = 'down';
	}
	p1bullets.push(new Bullet(player1.x, player1.y, rad, dir));
}

function bulletRelease2(rad){
	let dir;
	if(!controls.i && !controls.k){
		dir = player2.dir;
	}else if(controls.i && !controls.k){
		dir = 'up';
	}else if(controls.k && !controls.i){
		dir = 'down';
	}
	p2bullets.push(new Bullet(player2.x, player2.y, rad, dir));
}

function stageFrame1(){
	// platforms.push(new Platform(canvas.width/10, canvas.height*2/3, canvas.width/10, 20, 'random', true));
	// platforms.push(new Platform(canvas.width*8/10, canvas.height*2/3, canvas.width/10, 20, 'random', true));
	// platforms.push(new Platform(canvas.width*3/8, canvas.height/3, canvas.width/4, 20, 'random', true));
	stage1.push(new Platform(0, canvas.height, canvas.width, 100, 'black', false));
	stage1.push(new Platform(canvas.width/10, canvas.height*2/3, canvas.width/5, 20, 'random', true));
	stage1.push(new Platform(canvas.width*7/10, canvas.height*2/3, canvas.width/5, 20, 'random', true));
	stage1.push(new Platform(canvas.width*3/8, canvas.height/3, canvas.width/4, 20, 'random', true));
}

function stageFrame2(){
	// platforms.push(new Platform(0, canvas.height*2/3, canvas.width/8, 20, 'random', true));
	// platforms.push(new Platform(0, canvas.height/3, canvas.width/8, 20, 'random', true));
	// platforms.push(new Platform(canvas.width*7/8, canvas.height/3, canvas.width/8, 20, 'random', true));
	// platforms.push(new Platform(canvas.width*7/8, canvas.height*2/3, canvas.width/8, 20, 'random', true));
	stage2.push(new Platform(0, canvas.height, canvas.width, 100, 'black', false));
	stage2.push(new Platform(0, canvas.height*2/3, canvas.width/8, 20, 'random', true));
	stage2.push(new Platform(0, canvas.height/3, canvas.width/8, 20, 'random', true));
	stage2.push(new Platform(canvas.width*7/8, canvas.height/3, canvas.width/8, 20, 'random', true));
	stage2.push(new Platform(canvas.width*7/8, canvas.height*2/3, canvas.width/8, 20, 'random', true));
}

function stageFrame3(){
	// platforms.push(new Platform(canvas.width/6, canvas.height*2/3, canvas.width/6, 20, 'random', true));
	// platforms.push(new Platform(canvas.width*2/3, canvas.height*2/3, canvas.width/6, 20, 'random', true));
	stage3.push(new Platform(0, canvas.height, canvas.width, 100, 'black', false));
	stage3.push(new Platform(canvas.width/6, canvas.height*2/3, canvas.width/6, 20, 'random', true));
	stage3.push(new Platform(canvas.width*2/3, canvas.height*2/3, canvas.width/6, 20, 'random', true));
}

function stageFrame4(){
	stage4.push(new Platform(0, canvas.height, canvas.width, 100, 'black', false));
}








//gameStage 6
function rules(){
	c.clearRect(0,0,canvas.width,canvas.height);


	if(backButton6.dist(backButton6.x, backButton6.y, mpos.x, mpos.y) <= backButton6.radius && mouseState.down){
		gameStage = 0;
		mouseState.down = false;
		titleScreen();
	}

	c.font = '30px Arial';
	c.textAlign = 'center';
	c.textBaseline = 'middle';
	c.fillStyle = 'black';
	c.strokeStyle = 'black';
	c.fillText("Player 1 Controls", canvas.width/4, canvas.height/10);
	c.fillText("Goal", canvas.width/2, canvas.height/10);
	c.fillText("Player 2 Controls", canvas.width*3/4, canvas.height/10);
	c.fillText("Fun Fact", canvas.width/2, canvas.height*8/10);
	c.font = '20px Arial';
	//P1 Controls
	c.fillText("A or D = Walking Left or Right", canvas.width/4, canvas.height*2/10);
	c.fillText("W = Jump, S = Pass Platform", canvas.width/4, canvas.height*3/10);
	c.fillText("Z = Punch", canvas.width/4, canvas.height*4/10);
	c.fillText("Z + W = Punch Up", canvas.width/4, canvas.height*5/10);
	c.fillText("Z + S (in air) = Punch Down", canvas.width/4, canvas.height*6/10);
	c.fillText("Z + S (on ground) = Low Sweep", canvas.width/4, canvas.height*7/10);
	c.fillText("X = Charge Bullet, X (after charging) = Shoot Bullet", canvas.width/4, canvas.height*8/10);
	//P2 controls
	c.fillText("J or L = Walking Left or Right", canvas.width*3/4, canvas.height*2/10);
	c.fillText("I = Jump, K = Pass Platform", canvas.width*3/4, canvas.height*3/10);
	c.fillText("N = Punch", canvas.width*3/4, canvas.height*4/10);
	c.fillText("N + I = Punch Up", canvas.width*3/4, canvas.height*5/10);
	c.fillText("N + K (in air) = Punch Down", canvas.width*3/4, canvas.height*6/10);
	c.fillText("N + K (on ground) = Low Sweep", canvas.width*3/4, canvas.height*7/10);
	c.fillText("M = Charge Bullet, M (after charging) = Shoot Bullet", canvas.width*3/4, canvas.height*8/10);
	//Goal
	c.fillText("Get their energy to Less Than 10!", canvas.width/2, canvas.height*2/10);
	//fun Fact
	c.fillText('Bullets use your own energy to charge, so be careful!', canvas.width/2, canvas.height*17/20);
	c.fillText("If bullets hit the opponent, not only do they do massive damage, they also steal their energy!", canvas.width/2, canvas.height*9/10);
	c.fillText("If bullets hit the wall, all the energy within it will disperse into small energies!", canvas.width/2, canvas.height*19/20);




	backButton6.update(c,mpos);
	if(gameStage == 6){
		requestAnimationFrame(rules);
	}
}








//gameStage 5
function stageSelect(){
	c.clearRect(0,0,canvas.width,canvas.height);

	//stage1 coord (canvas.width/4, canvas.height/4)
	c.strokeStyle = 'black';
	c.rect(canvas.width/4, canvas.height/4, canvas.width/4, canvas.height/4);
	c.stroke();
	for(let i = 0; i<stage1.length; i++){
		c.fillStyle = stage1[i].color;
		c.strokeStyle = stage1[i].color;
		c.fillRect(canvas.width/4 + stage1[i].x/4, canvas.height/4 + stage1[i].y/4, stage1[i].width/4, stage1[i].thickness/4);
	}

	//stage2 coord (canvas.width/4, canvas.height/2)
	c.strokeStyle = 'black';
	c.rect(canvas.width/4, canvas.height/2, canvas.width/4, canvas.height/4);
	c.stroke();
	for(let i = 0; i<stage2.length; i++){
		c.fillStyle = stage2[i].color;
		c.strokeStyle = stage2[i].color;
		c.fillRect(canvas.width/4 + stage2[i].x/4, canvas.height/2 + stage2[i].y/4, stage2[i].width/4, stage2[i].thickness/4);
	}

	//stage3 coord (canvas.width/2, canvas.height/4)
	c.strokeStyle = 'black';
	c.rect(canvas.width/2, canvas.height/4, canvas.width/4, canvas.height/4);
	c.stroke();
	for(let i = 0; i<stage3.length; i++){
		c.fillStyle = stage3[i].color;
		c.strokeStyle = stage3[i].color;
		c.fillRect(canvas.width/2 + stage3[i].x/4, canvas.height/4 + stage3[i].y/4, stage3[i].width/4, stage3[i].thickness/4);
	}

	//stage4 coord (canvas.width/2, canvas.height/2)
	c.strokeStyle = 'black';
	c.rect(canvas.width/2, canvas.height/2, canvas.width/4, canvas.height/4);
	c.stroke();
	for(let i = 0; i<stage4.length; i++){
		c.fillStyle = stage4[i].color;
		c.strokeStyle = stage4[i].color;
		c.fillRect(canvas.width/2 + stage4[i].x/4, canvas.height/2 + stage4[i].y/4, stage4[i].width/4, stage4[i].thickness/4);
	}

	if(stageTag.dist(stageTag.x, stageTag.y, mpos.x, mpos.y) <= stageTag.radius && mouseState.down && !stageTag.heldState){
		stageTag.heldState = true;
		mouseState.down = false;
	}else if(stageTag.heldState && mouseState.down){
		stageTag.heldState = false;
		mouseState.down = false;
	}

	if(backButton5.dist(backButton5.x, backButton5.y, mpos.x, mpos.y) <= backButton5.radius && mouseState.down){
		mouseState.down = false;
		gameStage = 0;
		titleScreen();
	}

	if(stage1Button.dist(stage1Button.x,stage1Button.y,stageTag.x,stageTag.y) <= stage1Button.radius + stageTag.radius && !stageTag.heldState){
		platforms = stage1;
	}
	if(stage2Button.dist(stage2Button.x,stage2Button.y,stageTag.x,stageTag.y) <= stage2Button.radius + stageTag.radius && !stageTag.heldState){
		platforms = stage2;
	}
	if(stage3Button.dist(stage3Button.x,stage3Button.y,stageTag.x,stageTag.y) <= stage3Button.radius + stageTag.radius && !stageTag.heldState){
		platforms = stage3;
	}
	if(stage4Button.dist(stage4Button.x,stage4Button.y,stageTag.x,stageTag.y) <= stage4Button.radius + stageTag.radius && !stageTag.heldState){
		platforms = stage4;
	}


	backButton5.update(c,mpos);
	stageTag.update(c,mpos);
	stage1Button.update(c, mpos);
	stage2Button.update(c,mpos);
	stage3Button.update(c,mpos);
	stage4Button.update(c,mpos);
	if(gameStage == 5){
		requestAnimationFrame(stageSelect);
	}
}











//gameStage 4
function colorSelect(){
	c.clearRect(0,0,canvas.width, canvas.height);
	let selected1 = 0;
	let selected2 = 0;
	for(let i = 0; i < colorButtons.length; i++){
		if(p1Tag.dist(p1Tag.x, p1Tag.y, colorButtons[i].x, colorButtons[i].y) <= colorButtons[i].radius && !p1Tag.heldState){
			p1Color = colorButtons[i].color;
			selected1++;
		}
		if(p2Tag.dist(p2Tag.x, p2Tag.y, colorButtons[i].x, colorButtons[i].y) <= colorButtons[i].radius && !p2Tag.heldState){
			p2Color = colorButtons[i].color;
			selected2++;
		}

	}

	if(selected1 == 0){
		p1Color = 'none';
	}
	if(selected2 == 0){
		p2Color = 'none';
	}

	if(backButton4.dist(backButton4.x, backButton4.y, mpos.x, mpos.y) <= backButton4.radius && mouseState.down){
		mouseState.down = false;
		gameStage = 0;
		titleScreen();
	}

	if(p1Tag.dist(p1Tag.x, p1Tag.y, mpos.x, mpos.y) <= p1Tag.radius && p1Tag.heldState == false && mouseState.down){
		p1Tag.heldState = true;
		mouseState.down = false;
	}else if(p1Tag.heldState && mouseState.down){
		p1Tag.heldState = false;
		mouseState.down = false;
	}
	if(p2Tag.dist(p2Tag.x, p2Tag.y, mpos.x, mpos.y) <= p2Tag.radius && p2Tag.heldState == false && mouseState.down){
		p2Tag.heldState = true;
		mouseState.down = false;
	}else if(p2Tag.heldState && mouseState.down){
		p2Tag.heldState = false;
		mouseState.down = false;
	}
	p1Tag.update(c, mpos);
	p2Tag.update(c, mpos);
	backButton4.update(c, mpos);
	for(let i = 0; i < colorButtons.length; i++){
		colorButtons[i].update(c, mpos);
	}
	if(gameStage == 4){
		requestAnimationFrame(colorSelect);
	}
}











//gameStage 0
function titleScreen(){
	c.clearRect(0,0,canvas.width, canvas.height);

	if(playButton.dist(playButton.x, playButton.y, mpos.x, mpos.y) <= playButton.radius && mouseState.down){
		gameStage = 1;
		mouseState.down = false;
		init();
	}
	if(colorSelectButton.dist(colorSelectButton.x, colorSelectButton.y, mpos.x, mpos.y) <= colorSelectButton.radius && mouseState.down){
		gameStage = 4;
		let y = 0;
		let x = canvas.width/6;
		for(let i = 0; i < colorArray.length; i++){
			y += 30;
			if(y >= canvas.height){
				y = 30;
				x += 40;
			}
			colorButtons.push(new Button(x,y,'',10,colorArray[i]));
		}
		mouseState.down = false;
		colorSelect();
	}
	if(stageSelectButton.dist(stageSelectButton.x, stageSelectButton.y, mpos.x, mpos.y) <= stageSelectButton.radius && mouseState.down){
		gameStage = 5;
		mouseState.down = false;
		stage1 = [];
		stage2 = [];
		stage3 = [];
		stage4 = [];
		stageFrame1();
		stageFrame2();
		stageFrame3();
		stageFrame4();
		stageSelect();
	}
	if(ruleButton.dist(ruleButton.x, ruleButton.y, mpos.x, mpos.y) <= ruleButton.radius && mouseState.down){
		gameStage = 6;
		mouseState.down = false;
		rules();
	}

	playButton.update(c, mpos);
	colorSelectButton.update(c, mpos);
	stageSelectButton.update(c, mpos);
	ruleButton.update(c,mpos);
	if(gameStage == 0){
		requestAnimationFrame(titleScreen);
	}

}















//gameStage 3
function endScreen(){
	c.clearRect(0,0, canvas.width, canvas.height);

	if(backButton3.dist(backButton3.x, backButton3.y, mpos.x, mpos.y) <= backButton3.radius && mouseState.down){
		gameStage = 0;
		mouseState.down = false;
		titleScreen();
	}

	c.textAlign = 'center';
	c.textBaseline = 'middle';
	c.fillStyle = 'black'
	c.font = "60px Arial";
	c.fillText("Winner is " + winner, canvas.width/2, (canvas.height/2) + 100);


	backButton3.update(c, mpos);
	if(gameStage == 3){
		requestAnimationFrame(endScreen);
	}
}













//gameStage 2
function p1WScene(){


	p1Energy = [];
	for(let i = 0; i < 8; i++){
		p1Energy.push(new Energy(player2.x, player2.y, 5, randomColor()));
	}
	energySpread.push(new Vector(100,100));
	energySpread.push(new Vector(-100, 100));
	energySpread.push(new Vector(-100, -100));
	energySpread.push(new Vector(100, -100));
	energySpread.push(new Vector(-140.7, 0));
	energySpread.push(new Vector(140.7, 0));
	energySpread.push(new Vector(0, 140.7));
	energySpread.push(new Vector(0, -140.7));
	for(let i = 0; i< p1Energy.length; i++){
		energySpread[i].x += p1Energy[i].x;
		energySpread[i].y += p1Energy[i].y;
	}

	p1ReScene();



}

function p1ReScene(){
	c.clearRect(0,0,canvas.width, canvas.height);


	if(inPlace < 8){
		for(let i = 0; i< p1Energy.length; i++){
			if(p1Energy[i].x != energySpread[i].x || p1Energy[i].y != energySpread[i].y){
				p1Energy[i].update(c, energySpread[i]);
				if(energySpread[i].dist(energySpread[i].x, energySpread[i].y, p1Energy[i].x, p1Energy[i].y) <= p1Energy[i].radius){
					inPlace++;
				}
			}

		}

	}
	player1.draw(c);
	if(inPlace >= 8){
		for(let i = 0; i< p1Energy.length; i++){
			p1Energy[i].update(c, p1Vec);
			if(p1Energy[i].dist(p1Energy[i].x, p1Energy[i].y, player1.x, player1.y) <= p1Energy[i].radius + player1.radius){
				player1.radius+=5;
				p1Energy.splice(i,1);
			}
		}
	}

	if(p1Energy.length == 0){
		winner = player1name;
		gameStage = 3;
		endScreen();
	}






	if(gameStage == 2){
		requestAnimationFrame(p1ReScene);
	}
}

function p2WScene(){
	p2Energy = [];
	for(let i = 0; i < 8; i++){
		p2Energy.push(new Energy(player1.x, player1.y, 5, randomColor()));
	}
	energySpread.push(new Vector(100,100));
	energySpread.push(new Vector(-100, 100));
	energySpread.push(new Vector(-100, -100));
	energySpread.push(new Vector(100, -100));
	energySpread.push(new Vector(-140.7, 0));
	energySpread.push(new Vector(140.7, 0));
	energySpread.push(new Vector(0, 140.7));
	energySpread.push(new Vector(0, -140.7));
	for(let i = 0; i< p2Energy.length; i++){
		energySpread[i].x += p2Energy[i].x;
		energySpread[i].y += p2Energy[i].y;
	}

	p2ReScene();




}

function p2ReScene(){
	c.clearRect(0,0,canvas.width, canvas.height);


	if(inPlace < 8){
		for(let i = 0; i< p2Energy.length; i++){
			if(p2Energy[i].x != energySpread[i].x || p2Energy[i].y != energySpread[i].y){
				p2Energy[i].update(c, energySpread[i]);
				if(energySpread[i].dist(energySpread[i].x, energySpread[i].y, p2Energy[i].x, p2Energy[i].y) <= p2Energy[i].radius){
					inPlace++;
				}
			}

		}

	}
	player2.draw(c);
	if(inPlace >= 8){
		for(let i = 0; i< p2Energy.length; i++){
			p2Energy[i].update(c, p2Vec);
			if(p2Energy[i].dist(p2Energy[i].x, p2Energy[i].y, player2.x, player2.y) <= p2Energy[i].radius + player2.radius){
				player2.radius+=5;
				p2Energy.splice(i,1);
			}
		}
	}

	if(p2Energy.length == 0){
		winner = player2name;
		gameStage = 3;
		endScreen();
	}






	if(gameStage == 2){
		requestAnimationFrame(p2ReScene);
	}
}
























//gameStage 1
function init(){
    player1name = prompt("player 1's name");
    player2name = prompt("player 2's name");
    player1 = new Player(player1name, canvas.width/3, canvas.height/2, p1Color, 1);
    player2 = new Player(player2name, canvas.width*2/3, canvas.height/2, p2Color, 2);
	p1Vec = new Vector(0,0);
	p2Vec = new Vector(0,0);



	platforms = [];
	p1Energy = [];
	p2Energy = [];
	p1bullets = [];
	p2bullets = [];
	floatEnergy = [];

	if(platforms.length == 0){
		platforms = stage4;
	}
    // platforms.push(new Platform(canvas.width/4, canvas.height/1.5, 200, 20, 'red', true));
	// platforms.push(new Platform(canvas.width*3/4, canvas.height/1.5, 200, 20, 'red', true));

    update();

}

function update(){
    c.clearRect(0,0,canvas.width,canvas.height);
	hP1 = player1.radius;
	hP2 = player2.radius;
	//Score Board
	c.fillStyle = "black";
	c.textAlign = 'left';
	c.textBaseline = 'top';
	c.font = "30px Arial";

	c.fillText(player1name + ' Energy: ' + Math.round(hP1), 0, 0);


	c.textAlign = 'right';
	c.textBaseline = 'top';

	c.fillText(player2name + ' Energy: ' + Math.round(hP2), canvas.width, 0);


	for(let i = 0; i < platforms.length; i++){
        if(player1.y + player1.radius >= platforms[i].y && player1.y - player1.radius <= platforms[i].y&& player1.x >= platforms[i].x && player1.x <= platforms[i].x + platforms[i].width && player1.jumpSpd <= 0){
            player1.land(platforms[i], i);
        }
    }
	for(let i = 0; i < platforms.length; i++){
        if(player2.y + player2.radius >= platforms[i].y && player2.y - player2.radius <= platforms[i].y&& player2.x >= platforms[i].x && player2.x <= platforms[i].x + platforms[i].width && player2.jumpSpd <= 0){
            player2.land(platforms[i], i);
        }
    }

    if(keys.w){
        player1.jump();
    }
    if(keys.a){
        player1.dir = 'left';
        player1.walk();
    }
    if(keys.d){
        player1.dir = 'right';
        player1.walk();
    }
	if(keys.s){
		if(player1.onLand != 0 && platforms[player1.onLand].passable == true){

			player1.passPlatform(platforms[player1.onLand]);
		}
	}
	if(keys.z){
		player1.punch(keys);
	}
	if(keys.x){
		if(!player1.shootRestrict && !player1.shooting){
			player1.shoot();
			p1shootTimer();
		}else if(player1.shooting && !player1.shootRestrict){
			player1.shooting = false;
			bulletRelease1(player1.release());
			player1.shootRestrict = true;
			p1shootTimer();
		}
	}
	if(controls.i){
        player2.jump();
    }
    if(controls.j){
        player2.dir = 'left';
        player2.walk();
    }
    if(controls.l){
        player2.dir = 'right';
        player2.walk();
    }
	if(controls.k){
		if(player2.onLand != 0 && platforms[player2.onLand].passable == true){
			player2.passPlatform(platforms[player2.onLand]);
		}
	}
	if(controls.n){
		player2.punch(controls);
	}
	if(controls.m){
		if(!player2.shootRestrict && !player2.shooting){
			player2.shoot();
			p2shootTimer();
		}else if(player2.shooting && !player2.shootRestrict){
			player2.shooting = false;
			bulletRelease2(player2.release());
			player2.shootRestrict = true;
			p2shootTimer();
		}

	}

    // platform player interaction



	//Through platform


	//walk off platform
	for(let i = 0; i < platforms.length; i++){
        if(player1.x < platforms[i].x || player1.x > platforms[i].x+platforms[i].width){
			if(player1.onLand == i && player1.onLand != 0 && player1.jumping == false){
				player1.jumpSpd = -2;
				player1.jumping = true;
			}

        }
    }
	for(let i = 0; i < platforms.length; i++){
        if(player2.x < platforms[i].x || player2.x > platforms[i].x+platforms[i].width){
			if(player2.onLand == i && player2.onLand != 0 && player2.jumping == false){
				player2.jumpSpd = -2;
				player2.jumping = true;
			}

        }
    }

	//Walking
	player1.x += player1.walkSpd;
	if(!keys.a && !keys.d){
		if(player1.walkSpd > 0.01){
			player1.walkSpd -= 0.01;
		}else if(player1.walkSpd < -0.01){
			player1.walkSpd += 0.01;
		}else{
			player1.walkSpd = 0;
		}

	}
	player2.x += player2.walkSpd;
	if(!controls.j && !controls.l){
		if(player2.walkSpd > 0.01){
			player2.walkSpd -= 0.01;
		}else if(player2.walkSpd < -0.01){
			player2.walkSpd += 0.01;
		}else{
			player2.walkSpd = 0;
		}

	}

	//punch
	if(player1.punchRestrict == true){
		if(Math.abs(player1.punchDist) < 80 && player1.punching){
			player1.punchDist += player1.punchSpd;
		}else{
			player1.punching = false;
		}
		if(!player1.punching && player1.punchRestrict){
			player1.punchDist -= player1.punchSpd;
		}
		if(Math.abs(player1.punchDist) < 1){
			player1.punchRestrict = false;
		}
	}
	if(player2.punchRestrict == true){

		if(Math.abs(player2.punchDist) < 80 && player2.punching){
			player2.punchDist += player2.punchSpd;
		}else{
			player2.punching = false;
		}
		if(!player2.punching && player2.punchRestrict){
			player2.punchDist -= player2.punchSpd;
		}
		if(Math.abs(player2.punchDist) < 1){
			player2.punchRestrict = false;
		}
	}

	//Hitbox and Damage

		//Left and Right Punches
	if(!player1.uDPunch && player1.punchRestrict && player1.dir == 'right' && player1.x + player1.punchDist > player2.x - player2.radius && player1.y+5 > player2.y - player2.radius && player1.y-5 < player2.y + player2.radius && player1.x < player2.x + player2.radius){
		player2.radius-= 0.1;
	}
	if(!player1.uDPunch && player1.punchRestrict && player1.dir == 'left' && player1.x + player1.punchDist < player2.x + player2.radius && player1.y+5 > player2.y - player2.radius && player1.y-5 < player2.y + player2.radius && player1.x > player2.x - player2.radius){
		player2.radius-= 0.1;
	}
	if(!player2.uDPunch && player2.punchRestrict && player2.dir == 'right' && player2.x + player2.punchDist > player1.x - player1.radius && player2.y+5 > player1.y - player1.radius && player2.y-5 < player1.y + player1.radius && player2.x < player1.x + player1.radius){
		player1.radius-= 0.1;
	}
	if(!player2.uDPunch && player2.punchRestrict && player2.dir == 'left' && player2.x + player2.punchDist < player1.x + player1.radius && player2.y+5 > player1.y - player1.radius && player2.y-5 < player1.y + player1.radius && player2.x > player1.x - player1.radius){
		player1.radius-= 0.1;
	}

		//Up and Down Punches
	if(player1.uDPunch && player1.punchRestrict && player1.jumping && player1.punchSpd > 0 && player1.y + player1.punchDist > player2.y - player2.radius && player1.x > player2.x - player2.radius && player1.x+10 < player2.x + player2.radius && player1.y < player2.y + player2.radius){
		player2.radius-= 0.1;
	}
	if(player1.uDPunch && player1.punchRestrict && player1.jumping && player1.punchSpd < 0 && player1.y + player1.punchDist < player2.y + player2.radius && player1.x > player2.x - player2.radius && player1.x+10 < player2.x + player2.radius && player1.y > player2.y - player2.radius){
		player2.radius-= 0.1;
	}
	if(player2.uDPunch && player2.punchRestrict && player2.jumping && player2.punchSpd > 0 && player2.y + player2.punchDist > player1.y - player1.radius && player2.x > player1.x - player1.radius && player2.x+10 < player1.x + player1.radius && player2.y < player1.y + player1.radius){
		player1.radius-= 0.1;
	}
	if(player2.uDPunch && player2.punchRestrict && player2.jumping && player2.punchSpd < 0 && player2.y + player2.punchDist < player1.y + player1.radius && player2.x > player1.x - player1.radius && player2.x+10 < player1.x + player1.radius && player2.y > player1.y - player1.radius){
		player1.radius-= 0.1;
	}

		//Low sweeps
	if(player1.uDPunch && player1.punchRestrict && !player1.jumping && player1.dir == 'right' && player1.x + player1.punchDist > player2.x - player2.radius && player1.y+player1.radius > player2.y - player2.radius && player1.y+player1.radius-10 < player2.y + player2.radius && player1.x < player2.x + player2.radius){
		player2.radius-= 0.1;
	}
	if(player1.uDPunch && player1.punchRestrict && !player1.jumping && player1.dir == 'left' && player1.x + -player1.punchDist < player2.x + player2.radius && player1.y+player1.radius > player2.y - player2.radius && player1.y+player1.radius-10 < player2.y + player2.radius && player1.x > player2.x - player2.radius){
		player2.radius-= 0.1;
	}
	if(player2.uDPunch && player2.punchRestrict && !player2.jumping && player2.dir == 'right' && player2.x + player2.punchDist > player1.x - player1.radius && player2.y+player2.radius > player1.y - player1.radius && player2.y+player1.radius-10 < player1.y + player1.radius && player2.x < player1.x + player1.radius){
		player1.radius-= 0.1;
	}
	if(player2.uDPunch && player2.punchRestrict && !player2.jumping && player2.dir == 'left' && player2.x + -player2.punchDist < player1.x + player1.radius && player2.y+player2.radius > player1.y - player1.radius && player2.y+player1.radius-10 < player1.y + player1.radius && player2.x > player1.x - player1.radius){
		player1.radius-= 0.1;
	}

	//shoot
	if(player1.shooting && player1.chargeBulletRad < BULLETMAX){
		player1.chargeBulletRad += 0.1;
		player1.radius -= 0.02;
	}
	if(player2.shooting && player2.chargeBulletRad < BULLETMAX){
		player2.chargeBulletRad += 0.1;
		player2.radius -= 0.02;
	}

	//bullet hits wall
	for(let i = 0; i < p1bullets.length; i++){
		if(p1bullets[i].x <= 0 || p1bullets[i].x >= canvas.width || p1bullets[i].y <= 0 || p1bullets[i].y >= canvas.height){
			p1bullets.splice(i, 1);
		}
	}
	for(let i = 0; i < p2bullets.length; i++){
		if(p2bullets[i].x <= 0 || p2bullets[i].x >= canvas.width || p2bullets[i].y <= 0 || p2bullets[i].y >= canvas.height){
			p2bullets.splice(i, 1);
		}
	}

	//bullet hits player
	for(let i = 0; i < p1bullets.length; i++){
		if(p1bullets[i].dist(p1bullets[i].x, p1bullets[i].y, player2.x, player2.y) <= p1bullets[i].radius + player2.radius){
			player2.radius -= p1bullets[i].radius/2;

			p1Energy.push(new Energy(player2.x, player2.y, p1bullets[i].radius/1.5, randomColor()));
			p1bullets.splice(i, 1);
		}
	}
	for(let i = 0; i < p2bullets.length; i++){
		if(p2bullets[i].dist(p2bullets[i].x, p2bullets[i].y, player1.x, player1.y) <= p2bullets[i].radius + player1.radius){
			player1.radius -= p2bullets[i].radius/2;
			p2Energy.push(new Energy(player1.x, player1.y, p2bullets[i].radius/1.5, randomColor()));
			p2bullets.splice(i, 1);
		}

	}

	//Energy take in by player
	for(let i = 0; i < p1Energy.length; i++){
		if(p1Energy[i].dist(p1Energy[i].x, p1Energy[i].y, player1.x, player1.y) <= player1.radius + p1Energy[i].radius){
			player1.radius += p1Energy[i].radius/2;
			p1Energy.splice(i,1);
		}
	}
	for(let i = 0; i < p2Energy.length; i++){
		if(p2Energy[i].dist(p2Energy[i].x, p2Energy[i].y, player2.x, player2.y) <= player2.radius + p2Energy[i].radius){
			player2.radius += p2Energy[i].radius/2;
			p2Energy.splice(i,1);
		}
	}

	//Bullet Hits Wall
	for(let i = 0; i < p1bullets.length; i++){
		let hitWall = 0;
		if(p1bullets[i].x + p1bullets[i].radius >= canvas.width){
			for(let k = 0; k < 20; k++){
				let xdir = -Math.random()*floatEngSpd;
				let ydir = Math.random()*floatEngSpd*2 - floatEngSpd;
				floatEnergy.push(new WallEnergy(p1bullets[i].x, p1bullets[i].y, xdir, ydir, p1bullets[i].radius/5));
			}
			hitWall++;
		}else if(p1bullets[i].x - p1bullets[i].radius <= 0){
			for(let k = 0; k < 20; k++){
				let xdir = Math.random()*floatEngSpd;
				let ydir = Math.random()*floatEngSpd*2 - floatEngSpd;
				floatEnergy.push(new WallEnergy(p1bullets[i].x, p1bullets[i].y, xdir, ydir, p1bullets[i].radius/5));
			}
			hitWall++;
		}else if(p1bullets[i].y + p1bullets[i].radius >= canvas.height){
			for(let k = 0; k < 20; k++){
				let ydir = -Math.random()*floatEngSpd;
				let xdir = Math.random()*floatEngSpd*2 - floatEngSpd;
				floatEnergy.push(new WallEnergy(p1bullets[i].x, p1bullets[i].y, xdir, ydir, p1bullets[i].radius/5));
			}
			hitWall++;
		}else if(p1bullets[i].y - p1bullets[i].radius <= 0){
			for(let k = 0; k < 20; k++){
				let ydir = Math.random()*floatEngSpd;
				let xdir = Math.random()*floatEngSpd*2 - floatEngSpd;
				floatEnergy.push(new WallEnergy(p1bullets[i].x, p1bullets[i].y, xdir, ydir, p1bullets[i].radius/5));
			}
			hitWall++;
		}
		if(hitWall != 0){
			p1bullets.splice(i, 1);
		}

	}

	for(let i = 0; i < p2bullets.length; i++){
		let hitWall = 0;
		if(p2bullets[i].x + p2bullets[i].radius >= canvas.width){
			for(let k = 0; k < 20; k++){
				let xdir = -Math.random()*floatEngSpd;
				let ydir = Math.random()*floatEngSpd*2 - floatEngSpd;
				floatEnergy.push(new WallEnergy(p2bullets[i].x, p2bullets[i].y, xdir, ydir, p2bullets[i].radius/5));
			}
			hitWall++;
		}else if(p2bullets[i].x - p2bullets[i].radius <= 0){
			for(let k = 0; k < 20; k++){
				let xdir = Math.random()*floatEngSpd;
				let ydir = Math.random()*floatEngSpd*2 - floatEngSpd;
				floatEnergy.push(new WallEnergy(p2bullets[i].x, p2bullets[i].y, xdir, ydir, p2bullets[i].radius/5));
			}
			hitWall++;
		}else if(p2bullets[i].y + p2bullets[i].radius >= canvas.height){
			for(let k = 0; k < 20; k++){
				let ydir = -Math.random()*floatEngSpd;
				let xdir = Math.random()*floatEngSpd*2 - floatEngSpd;
				floatEnergy.push(new WallEnergy(p2bullets[i].x, p2bullets[i].y, xdir, ydir, p2bullets[i].radius/5));
			}
			hitWall++;
		}else if(p2bullets[i].y - p2bullets[i].radius <= 0){
			for(let k = 0; k < 20; k++){
				let ydir = Math.random()*floatEngSpd;
				let xdir = Math.random()*floatEngSpd*2 - floatEngSpd;
				floatEnergy.push(new WallEnergy(p2bullets[i].x, p2bullets[i].y, xdir, ydir, p2bullets[i].radius/5));
			}
			hitWall++;
		}
		if(hitWall != 0){
			p2bullets.splice(i, 1);
		}

	}

	//Consume WallEnergy
	for(let i = 0; i < floatEnergy.length; i++){
		let consumed = 0;
		if(floatEnergy[i].dist(floatEnergy[i].x, floatEnergy[i].y, player1.x, player1.y) <= floatEnergy[i].radius + player1.radius){
			player1.radius += floatEnergy[i].radius/30;
			consumed++;
		}
		if(floatEnergy[i].dist(floatEnergy[i].x, floatEnergy[i].y, player2.x, player2.y) <= floatEnergy[i].radius + player2.radius){
			player2.radius += floatEnergy[i].radius/30;
			consumed++;
		}
		if(consumed != 0){
			floatEnergy.splice(i,1);
		}
	}

	//Max Radius Players
	if(player1.radius >= MAXRAD){
		player1.radius = MAXRAD;
	}
	if(player2.radius >= MAXRAD){
		player2.radius = MAXRAD;
	}




	//Game End
	if(player1.radius < 10){
		gameStage = 2;
		p2WScene();
	}
	if(player2.radius < 10){
		gameStage = 2;
		p1WScene();
	}



    player1.update(c);
	player2.update(c);
	p1Vec.x = player1.x;
	p1Vec.y = player1.y;
	p2Vec.x = player2.x;
	p2Vec.y = player2.y;
    for(let i = 0; i < platforms.length; i++){
        platforms[i].update(c);
    }
	for(let i = 0; i < p1bullets.length; i++){
		p1bullets[i].update(c);
	}
	for(let i = 0; i < p2bullets.length; i++){
		p2bullets[i].update(c);
	}
	for(let i = 0; i < p1Energy.length; i++){
		p1Energy[i].update(c, p1Vec);
	}
	for(let i = 0; i < p2Energy.length; i++){
		p2Energy[i].update(c, p2Vec);
	}
	for(let i = 0; i < floatEnergy.length; i++){
		floatEnergy[i].update(c);
	}
	if(gameStage == 1){
		requestAnimationFrame(update);
	}

}



window.addEventListener('load', function(){
	stageFrame1();
	stageFrame2();
	stageFrame3();
	stageFrame4();
	titleScreen();
	window.addEventListener('mousemove', function(event){
		mpos.x = event.x;
		mpos.y = event.y;
	});

	window.addEventListener('mousedown', function(){
		mouseState.down = true;
	});

	window.addEventListener('mouseup', function(){
		mouseState.down = false;
	});
	window.addEventListener('keydown', function(event){
		if(gameStage == 1){
			if(event.key == 'w'){
				keys.w = true;

			}
			if(event.key == 'd'){
				keys.d = true;

			}
			if(event.key == 'a'){
				keys.a = true;

			}
			if(event.key == 's'){
				keys.s = true;

			}
			if(event.key == 'z'){
				keys.z = true;
			}
			if(event.key == 'x'){
				keys.x = true;
			}
			if(event.key == 'i'){
				controls.i = true;

			}
			if(event.key == 'l'){
				controls.l = true;

			}
			if(event.key == 'j'){
				controls.j = true;

			}
			if(event.key == 'k'){
				controls.k = true;

			}
			if(event.key == 'n'){
				controls.n = true;
			}
			if(event.key == 'm'){
				controls.m = true;
			}
		}

	});
	window.addEventListener('keyup', function(event){
		if(gameStage == 1){
			if(event.key == 'w'){
				keys.w = false;

			}
			if(event.key == 'd'){
				keys.d = false;

			}
			if(event.key == 'a'){
				keys.a = false;

			}
			if(event.key == 's'){
				keys.s = false;

			}
			if(event.key == 'z'){
				keys.z = false;
			}
			if(event.key == 'x'){
				keys.x = false;
			}
			if(event.key == 'i'){
				controls.i = false;

			}
			if(event.key == 'l'){
				controls.l = false;

			}
			if(event.key == 'j'){
				controls.j = false;

			}
			if(event.key == 'k'){
				controls.k = false;

			}
			if(event.key == 'n'){
				controls.n = false;
			}
			if(event.key == 'm'){
				controls.m = false;
			}
		}

	})

});
