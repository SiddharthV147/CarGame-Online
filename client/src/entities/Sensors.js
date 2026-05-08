class Sensors {
  constructor(x, y, rays) {
    this.x = x;
    this.y = y;
    this.rays = rays;          
    this.angle = 150;          
    this.rayLength = 350;
  }
  draw(context) {
    context.strokeStyle = "yellow";
    context.lineWidth = 0.5;
    context.setLineDash([]);
    const totalAngle = (this.angle * Math.PI) / 180;
    const startAngle = -totalAngle / 2;
    const angleStep  = this.rays > 1 ? totalAngle / (this.rays - 1) : 0;
    for (let i = 0; i < this.rays; i++) {
      const rayAngle = startAngle + i * angleStep;
      const endX     = this.x + Math.sin(rayAngle) * this.rayLength;
      const endY     = this.y - Math.cos(rayAngle) * this.rayLength;
      context.beginPath();
      context.moveTo(this.x, this.y);
      context.lineTo(endX, endY);
      context.stroke();
    }
  }
}

export default Sensors;