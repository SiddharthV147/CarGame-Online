import Car from './Car';
class Road {
  constructor(width, height, offset, gap, dividerHeight, player) {
    this.width         = width;
    this.height        = height;
    this.offset        = offset;
    this.gap           = gap;
    this.dividerHeight = dividerHeight;
    this.lineOffset    = 0;
    this.speed         = 2.5;
    this.player        = new Car(
                            player.x,
                            player.y,
                            player.width,
                            player.height,
                            player.color
                          );
  }

  update() {
    this.lineOffset += this.speed;
    if (this.lineOffset >= this.gap + this.dividerHeight) {
      this.lineOffset = 0;
    }
  }

  draw(ctx) {

    ctx.clearRect(0, 0, this.width, this.height);
    ctx.strokeStyle = "white";
    ctx.lineWidth   = 3;

    // draw road background
    ctx.fillStyle = "#2c2c2c";
    ctx.fillRect(0, 0, this.width, this.height);

    // draw boundaries
    ctx.setLineDash([]);
    ctx.beginPath();
    ctx.moveTo(30, 0);
    ctx.lineTo(30, this.height);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(this.width - 30, 0);
    ctx.lineTo(this.width - 30, this.height);
    ctx.stroke();

    // draw divider
    ctx.setLineDash([this.dividerHeight, this.gap]);
    ctx.lineDashOffset = -this.lineOffset;
    ctx.beginPath();
    ctx.moveTo(this.width / 2, 0);
    ctx.lineTo(this.width / 2, this.height);
    ctx.stroke();
  }
}

export default Road;