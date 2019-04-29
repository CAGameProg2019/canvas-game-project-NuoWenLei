class Player{

    constructor(name, x, y, color, num){
        this.name = name;
        this.x = x;
        this.y = y;
        this.color = color;
        this.num = num;
        if(num == 1){
            this.dir = 'right';
        } else {
            this.dir = 'left';
        }
        this.jumpSpd = 0;
        this.jumping = false;
        this.radius = 30;
    }

    draw(context){
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        context.fill();
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.font = "10px Arial";
        context.fillText(this.name, this.x, this.y-20);
    }

    update(context){
        if(this.jumping){
            this.y -= this.jumpSpd;
            this.jumpSpd -= .1;
        }



        this.draw(context);
    }


    jump(){
        this.jumpSpd = 5;
        this.jumping = true;
    }

    land(platform){
        this.jumping = false;
        this.y = platform.y-1;
    }

    punch(){

    }

    passPlatform(){

    }

    shoot(){

    }

    walk(){
        if(this.dir === 'left'){
            this.x -= 5;
        }
        if(this.dir === 'right'){
            this.x += 5;
        }
    }
}
