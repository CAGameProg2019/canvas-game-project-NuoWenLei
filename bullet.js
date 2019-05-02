class Bullet extends Vector{

    constructor(x, y, radius, dir){
        super(x, y);
        this.radius = radius;
        this.dir = dir;
    }

    draw(c){
        c.fillStyle = this.random_rgba();
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        c.fill();
    }

    update(c){
        if(this.dir == 'left'){
            this.x -= 120/this.radius;
        }else if(this.dir == 'right'){
            this.x += 120/this.radius;
        }else if(this.dir == 'up'){
            this.y -= 120/this.radius;
        }else if(this.dir == 'down'){
            this.y += 120/this.radius;
        }

        this.draw(c);
    }

}
Object.assign(Bullet, Vector);
