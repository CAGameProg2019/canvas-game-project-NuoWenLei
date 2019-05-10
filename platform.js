class Platform{
    constructor(x,y,width,thickness, color, passable){
        this.x = x;
        this.y = y;
        this.width = width;
        this.thickness = thickness;
        if(color == 'random'){
            this.color = this.random_rgb();
        }else{
            this.color = color;
        }
        this.passable = passable;
    }

    draw(c){
        c.strokeStyle = this.color;
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

    random_rgb() {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + 1 + ')';
    }
}
