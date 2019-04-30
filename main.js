let canvas = document.getElementById("main");
let c = canvas.getContext('2d');
canvas.width = window.innerWidth - 20;
canvas.height = window.innerHeight - 20;

let player1;
let player1name;
let player2;
let player2name;
let platforms = [];

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
    d: false
};

function randomColor(){
    return colorArray[Math.floor(Math.random()*colorArray.length)];
}

function init(){
    player1name = prompt("player 1's name");
    // player2name = prompt("player 2's name");
    player1 = new Player(player1name, canvas.width/3, canvas.height/2, randomColor(), 1);
    // player2 = new Player(player2name, canvas.width*2/3, canvas.height/2, randomColor(), 2);

	platforms.push(new Platform(0, canvas.height, canvas.width, 100, 'black'));
    platforms.push(new Platform(canvas.width/4, canvas.height/1.5, 100, 20, 'red'));
	platforms.push(new Platform(canvas.width*3/4, canvas.height/1.5, 100, 20, 'red'));

    update();

}

function update(){
    c.clearRect(0,0,canvas.width,canvas.height);


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
		if(player1.checkPlatform() != 0){
			player1.passPlatform(platforms[player1.checkPlatform()]);
		}
	}

    // platform player interaction

    for(let i = 0; i < platforms.length; i++){
        if(player1.y + player1.radius >= platforms[i].y && player1.y - player1.radius <= platforms[i].y&& player1.x >= platforms[i].x && player1.x <= platforms[i].x + platforms[i].width && player1.jumpSpd <= 0){
            player1.land(platforms[i], i);
        }
    }

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






    player1.update(c);
    for(let i = 0; i < platforms.length; i++){
        platforms[i].update(c);
    }

    requestAnimationFrame(update);
}



window.addEventListener('load', function(){
    init();
    window.addEventListener('keydown', function(event){
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
    });
    window.addEventListener('keyup', function(event){
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
    })
});
