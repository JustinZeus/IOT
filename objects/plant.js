class Plant {
  constructor() {
    this.position = createVector(random(width), random(height));
    this.size = 5;
    this.color = color(0, 255, 0); // Green
    this.energyValue = this.size * 2;
  }

  update() {
    this.grow();
  } 

  display() {
    fill(this.color);
    noStroke();
    ellipse(this.position.x, this.position.y, this.size, this.size);
  }

  grow() {
    if (this.size < window.settings.plant.maxSize) {
      this.size += window.settings.plant.growthRate;
      this.energyValue = this.size * window.settings.plant.energyMultiplier;
    }
  }
}