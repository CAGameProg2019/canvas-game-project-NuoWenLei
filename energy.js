class Energy extends Vector{

    constructor(x, y, radius, color){
        super(x,y);
        this.radius = radius;
        this.color = color;
    }

    draw(c){
        c.fillStyle = this.color;
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        c.fill();
    }

    update(c, vec){
        let vel = new Vector(vec.x, vec.y);
        vel.subVector(this);
        vel.toDirVec();
        vel.scale(2.5);
        this.addVector(vel);
        this.draw(c);
    }
}
Object.assign(Energy, Vector);
