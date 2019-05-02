class Bullet extends Vector{

    constructor(x, y, radius, dir){
        super(x, y);
        this.radius = radius;
        this.dir = dir;
    }

    draw(){}

    update(){
        
    }

}
Object.assign(Bullet, Vector);
