class Player{

    constructor(name, x, y, color, num){
        this.name = name;
        this.x = x;
        this.y = y;
        if(color == 'none'){
            this.color = this.random_rgb();
        }else{
            this.color = color;
        }

        this.num = num;
        if(this.num == 1){
            this.dir = 'right';
        } else {
            this.dir = 'left';
        }
        //jump
        this.jumpSpd = 0;
        this.jumping = true;
        this.jumpRestrict = false;
        //walk
        this.walkSpd = 0;

        this.radius = 30;
        this.MAXSPEED = 5;
        //landing Stuff
        this.passRestrict = false;
        //passPlatform
        this.onLand = 0;
        //punch
        this.punchDist = 0;
        this.punchRestrict = false;
        this.punching = false;
        this.punchSpd = 0;
        this.uDPunch = false;
        //shoot
        this.shootRestrict = false;
        this.shooting = false;
        this.chargeBulletRad = 0;

    }

    draw(context){
        context.fillStyle = this.color;
        context.strokeStyle = this.color;
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        context.fill();
        context.stroke();
        if(this.uDPunch && this.punchRestrict && this.jumping){
            context.beginPath();
            context.rect(this.x, this.y-5, 10, this.punchDist);
            context.fill();
        }else if(this.punchRestrict && this.uDPunch && !this.jumping && this.dir == 'right'){
            context.beginPath();
            context.rect(this.x, this.y+this.radius-10, this.punchDist, 10);
            context.fill();
        }else if(this.punchRestrict && this.uDPunch && !this.jumping && this.dir == 'left'){
            context.beginPath();
            context.rect(this.x, this.y+this.radius-10, -this.punchDist, 10);
            context.fill();
        }else if(this.punchRestrict){
            context.beginPath();
            context.rect(this.x, this.y-5, this.punchDist, 10);
            context.fill();
        }

        if(this.shooting){
            context.beginPath();
            context.fillStyle = this.random_rgba();
            context.arc(this.x, this.y, this.chargeBulletRad, 0, Math.PI*2, false);
            context.fill();
        }

        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillStyle = 'black';
        context.font = "20px Arial";
        context.fillText(this.name, this.x, this.y-this.radius-20);
    }

    update(context){
        if(this.jumping){
            this.y -= this.jumpSpd;
            this.jumpSpd -= 0.15;
        }
        if(this.x-this.radius <= 0 || this.x+this.radius >= canvas.width){
            this.walkSpd = -this.walkSpd;

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

    punch(key){
        if(!this.punchRestrict){
            if(this.dir == 'left'){
                this.punchSpd = -5;
                this.punchRestrict = true;
                this.punching = true;
            }
            if(this.dir == 'right'){
                this.punchSpd = 5;
                this.punchRestrict = true;
                this.punching = true;
            }
            if(this.num == 1){
                if(key.w){
        			this.punchSpd = -5;
        			this.uDPunch = true;
        		}else if(key.s){
        			this.punchSpd = 5;
        			this.uDPunch = true;
        		}else{
        			this.uDPunch = false;
        		}
            }
            if(this.num == 2){
                if(key.i){
        			this.punchSpd = -5;
        			this.uDPunch = true;
        		}else if(key.k){
        			this.punchSpd = 5;
        			this.uDPunch = true;
        		}else{
        			this.uDPunch = false;
        		}
            }

        }

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
        if(!this.shootRestrict){
            this.shooting = true;
            this.shootRestrict = true;
        }
    }

    release(){
        let bullet = this.chargeBulletRad;
        this.chargeBulletRad = 0;
        return bullet;
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
        if(Math.abs(this.walkSpd) <= this.MAXSPEED){
            if(this.dir === 'left'){
                this.walkSpd-= 0.05;
            }
            if(this.dir === 'right'){
                this.walkSpd+= 0.05;
            }
        }


    }

    random_rgba() {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
    }

    random_rgb() {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + 1 + ')';
    }
}
