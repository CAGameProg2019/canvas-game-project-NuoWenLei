class WallEnergy extends Vector{

    constructor(x,y,xdir,ydir,radius){
        super(x,y);
        this.xdir = xdir;
        this.ydir = ydir;
        this.radius = radius;
        this.color = this.random_rgb();
    }

    draw(c){
        c.strokeStyle = this.color;
        c.fillStyle = this.color;
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        c.fill();
        c.stroke();

    }

    update(c){
        if(this.x + this.radius >= canvas.width || this.x - this.radius <= 0){
            this.xdir *= -1;
        }
        if(this.y + this.radius >= canvas.height || this.y - this.radius <= 0){
            this.ydir *= -1;
        }
        this.x += this.xdir;
        this.y += this.ydir;
        this.draw(c);
    }
}
Object.assign(WallEnergy, Vector);
