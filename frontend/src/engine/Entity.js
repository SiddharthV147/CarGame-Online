class Entity {
    constructor(x, y, width, height, color){
        this.x      = x;
        this.y      = y;
        this.width  = width;
        this.height = height;
        this.color  = color ? color : 'black';
    }
}

export default Entity;