class Particle {

    constructor(x, y) {
        this.particleColor = getColor();
        this.x = x;
        this.y = y;
        this.radius = random(1, 15);
        this.xFactor = random([-1, 1]);
        this.yFactor = random([-1, 1]);
    }

    setColor(changedColor) {
        this.particleColor = changedColor;
    }

    movement() {
        this.x += particleSpeed / 10 * this.xFactor;
        this.y += particleSpeed / 10 * this.yFactor;
        if (this.x > width - this.radius || this.x < this.radius) {
            this.xFactor = -this.xFactor;
        }
        if (this.y > height - this.radius || this.y < this.radius) {
            this.yFactor = -this.yFactor;
        }
        this.drawParticle();
    }

    drawParticle() {
        strokeWeight(0);
        this.particleColor = getColor();
        fill(this.particleColor);
        ellipse(this.x, this.y, this.radius, this.radius)
    }

}