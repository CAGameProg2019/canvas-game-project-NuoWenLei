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
        c.beginPath();
        c.rect(this.x, this.y, this.width, this.thickness);
        c.fill();
        c.stroke();
        c.closePath();
    }
    update(c){
        this.draw(c);
    }
}
