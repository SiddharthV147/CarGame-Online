import Sensors from "./Sensors"
class Car {
    constructor(x, y, width, height, color){
        this.x       = x;
        this.y       = y;
        this.width   = width;
        this.height  = height;
        this.speed   = 6;
        this.color   = color ? color : 'blue';
        this.sensors = new Sensors(x+(width/2), y+(height/2), 20);
    }
    update(pos) {
        this.x += pos;
        this.sensors.x = this.x + this.width / 2;
    }
    draw(cxt) {
        this.sensors.draw(cxt);
        const cornerRadius = 15;
        cxt.strokeStyle = "white";
        cxt.fillStyle      = this.color;
        cxt.lineWidth      = 2;

        cxt.setLineDash([]);
        cxt.beginPath();
        cxt.roundRect(this.x, this.y, this.width, this.height, cornerRadius);
        cxt.fill();

        cxt.stroke(); 
        cxt.closePath();
    }
}

export default Car;