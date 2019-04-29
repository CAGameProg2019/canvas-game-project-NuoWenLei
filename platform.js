class Platform{
    constructor(x,y,width,thickness, color){
        this.x = x;
        this.y = y;
        this.width = width;
        this.thickness = thickness;
        this.color = color;
    }

    draw(c){
        c.fillStyle = this.color;
        c.rect(this.x, this.y, this.width, this.thickness);
        c.fill();
        c.stroke();
    }
    update(c){
        this.draw(c);
    }
}
