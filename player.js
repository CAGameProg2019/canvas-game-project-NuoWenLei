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
        this.jumping = true;
        // this.jumpChance = 2;
        this.jumpRestrict = false;
        this.walkSpd = 0;
        this.radius = 30;
        this.MAXSPEED = 5;
        this.jumpTimeout;
        this.onLand = 0;
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
            this.jumpSpd -= 0.15;
        }
        if(this.x-this.radius <= 0 || this.x+this.radius >= canvas.width){
            this.walkSpd *= -1;
        }
        if(this.y-this.radius <= 0){
            this.jumpSpd *= -1;
        }





        this.draw(context);
    }


    jump(){
        if(this.jumpRestrict == false){
            this.jumpSpd = 10;
            this.jumping = true;
            this.jumpRestrict = true;
        }

    }

    land(platform, platformNum){
        this.jumping = false;
        this.jumpRestrict = false;
        this.y = platform.y-this.radius-1;
        this.onLand = platformNum;
    }

    punch(){

    }

    checkPlatform(){
        return this.onLand;
    }

    passPlatform(platform){
        if(!this.jumping){
            this.y = platform.y+this.radius+1;
            this.jumpSpd = -2;
            this.jumping = true;
        }

    }

    shoot(){

    }

    //
    //
    // jumpTimer(){
    //     setTimeout(function(){
    //         this.jumpRestrict = false;
    //         console.log(this.jumpChance);
    //
    //     }, 1000);
    //     clearTimeout(this.jumpTimeout);
    // }



    walk(){
        if(this.dir === 'left'){
            this.walkSpd-= 0.05;
        }
        if(this.dir === 'right'){
            this.walkSpd+= 0.05;
        }

    }
}
