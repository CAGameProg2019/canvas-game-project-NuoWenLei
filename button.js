class Button extends Vector{
    constructor(x, y, info, radius, color){
        super(x,y);
        this.info = info;
        this.radius = radius;
        this.enlargedRad = radius*1.5;
        this.normalRad = radius;
        if(color == 'random'){
            this.color = this.random_rgba();
        }else{
            this.color = color;
        }

    }

    draw(c){
        c.strokeStyle = this.color;
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        c.stroke();
        c.font = this.radius/2 + "px Arial";
        c.textAlign = 'center';
        c.textBaseline = 'middle';
        c.fillStyle = this.color;
        c.fillText(this.info, this.x, this.y);
    }

    update(c, mpos){
        // if(this.dist(this.x, this.y, mpos.x, mpos.y) > this.radius && this.normalRad != this.radius){
        //     this.normalRad = this.radius;
        //     this.enlargedRad = this.radius * 1.5;
        // }else if(this.dist(this.x, this.y, mpos.x, mpos.y) <= this.radius && this.enlargedRad != this.radius){
        //     this.enlargedRad = this.radius;
        //     this.normalRad = 2*this.radius/3;
        // }
        if(this.dist(this.x, this.y, mpos.x, mpos.y) <= this.radius){
            this.enlarge();
        }else{
            this.normalSize();
        }
        this.draw(c);
    }

    enlarge(){
        this.radius = this.enlargedRad;
    }

    normalSize(){
        this.radius = this.normalRad;
    }
}
Object.assign(Button, Vector);
