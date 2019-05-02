let canvas = document.getElementById("main");
let c = canvas.getContext('2d');
canvas.width = window.innerWidth - 20;
canvas.height = window.innerHeight - 20;

let player1;
let player1name;
let player2;
let player2name;
let platforms = [];
let hP1 = 0;
let hP2 = 0;

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
	z: false
};

let controls = {
	i: false,
	k: false,
	j: false,
	l: false,
	n: false
};

function randomColor(){
    return colorArray[Math.floor(Math.random()*colorArray.length)];
}

function init(){
    player1name = prompt("player 1's name");
    player2name = prompt("player 2's name");
    player1 = new Player(player1name, canvas.width/3, canvas.height/2, randomColor(), 1);
    player2 = new Player(player2name, canvas.width*2/3, canvas.height/2, randomColor(), 2);

	platforms.push(new Platform(0, canvas.height, canvas.width, 100, 'black'));
    platforms.push(new Platform(canvas.width/4, canvas.height/1.5, 200, 20, 'red'));
	platforms.push(new Platform(canvas.width*3/4, canvas.height/1.5, 200, 20, 'red'));

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
	if(hP1 < 5){
		c.fillText(player1name + ' Radius: ' + Math.round(hP1*10)/10, 0, 0);
	}else{
		c.fillText(player1name + ' Radius: ' + Math.round(hP1), 0, 0);
	}

	c.textAlign = 'right';
	c.textBaseline = 'top';
	if(hP2 < 5){
		c.fillText(player2name + ' Radius: ' + Math.round(hP2*10)/10, canvas.width, 0);
	}else{
	c.fillText(player2name + ' Radius: ' + Math.round(hP2), canvas.width, 0);
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
		if(player1.checkPlatform() != 0){
			player1.passPlatform(platforms[player1.checkPlatform()]);
		}
	}
	if(keys.z){
		player1.punch(keys);
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
		if(player2.checkPlatform() != 0){
			player2.passPlatform(platforms[player1.checkPlatform()]);
		}
	}
	if(controls.n){
		player2.punch(controls);
	}

    // platform player interaction

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
		if(Math.abs(player1.punchDist) < 60 && player1.punching){
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

		if(Math.abs(player2.punchDist) < 60 && player2.punching){
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
	if(!player1.uDPunch && player1.dir == 'right' && player1.x + player1.punchDist > player2.x - player2.radius && player1.y+5 > player2.y - player2.radius && player1.y-5 < player2.y + player2.radius && player1.x < player2.x + player2.radius){
		player2.radius-= 0.1;
	}
	if(!player1.uDPunch && player1.dir == 'left' && player1.x + player1.punchDist < player2.x + player2.radius && player1.y+5 > player2.y - player2.radius && player1.y-5 < player2.y + player2.radius && player1.x > player2.x - player2.radius){
		player2.radius-= 0.1;
	}
	if(!player2.uDPunch && player2.dir == 'right' && player2.x + player2.punchDist > player1.x - player1.radius && player2.y+5 > player1.y - player1.radius && player2.y-5 < player1.y + player1.radius && player2.x < player1.x + player1.radius){
		player1.radius-= 0.1;
	}
	if(!player2.uDPunch && player2.dir == 'left' && player2.x + player2.punchDist < player1.x + player1.radius && player2.y+5 > player1.y - player1.radius && player2.y-5 < player1.y + player1.radius && player2.x > player1.x - player1.radius){
		player1.radius-= 0.1;
	}

		//Up and Down Punches
	if(player1.uDPunch && player1.punchSpd > 0 && player1.y + player1.punchDist > player2.y - player2.radius && player1.x > player2.x - player2.radius && player1.x+10 < player2.x + player2.radius && player1.y < player2.y + player2.radius){
		player2.radius-= 0.1;
	}
	if(player1.uDPunch && player1.punchSpd < 0 && player1.y + player1.punchDist < player2.y + player2.radius && player1.x > player2.x - player2.radius && player1.x+10 < player2.x + player2.radius && player1.y > player2.y - player2.radius){
		player2.radius-= 0.1;
	}
	if(player2.uDPunch && player2.punchSpd > 0 && player2.y + player2.punchDist > player1.y - player1.radius && player2.x > player1.x - player1.radius && player2.x+10 < player1.x + player1.radius && player2.y < player1.y + player1.radius){
		player1.radius-= 0.1;
	}
	if(player2.uDPunch && player2.punchSpd < 0 && player2.y + player2.punchDist < player1.y + player1.radius && player2.x > player1.x - player1.radius && player2.x+10 < player1.x + player1.radius && player2.y > player1.y - player1.radius){
		player1.radius-= 0.1;
	}




    player1.update(c);
	player2.update(c);
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
		if(event.key == 'z'){
			keys.z = true;
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
		if(event.key == 'z'){
			keys.z = false;
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
    })
});
