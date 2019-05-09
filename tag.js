class Tag extends Vector{
    constructor(x,y, info){
        super(x,y);
        this.info = info;
        this.color = 'black';
        this.heldState = false;
        this.radius = 15;
    }

    draw(c){
        c.fillStyle = this.color;
        c.strokeStyle = this.color;
        c.font = '20px Arial';
        c.textAlign = 'center';
        c.textBaseline = 'middle';
        c.fillText(this.info, this.x, this.y);
    }

    update(c, mpos){
        if(this.heldState){
            this.x = mpos.x;
            this.y = mpos.y;
        }
        this.draw(c);
    }
}
Object.assign(Tag, Vector);
