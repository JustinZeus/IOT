class Herbivore {
  constructor() {
    this.position = createVector(random(width), random(height));
    this.velocity = createVector(random(-1, 1), random(-1, 1));
    this.size = window.settings.herbivore.size;
    this.color = color(0, 0, 255); // Blue
    this.energy = window.settings.herbivore.energy;
  }

  update() {
    this.position.add(this.velocity);
    this.velocity.add(p5.Vector.random2D().mult(0.5));
    this.velocity.limit(2); // Limit speed

    // Keep the herbivore within the canvas
    this.position.x = constrain(this.position.x, 0, width);
    this.position.y = constrain(this.position.y, 0, height);

    // energy depletion over time
    this.energy -= window.settings.herbivore.energyDepletion;
    if (this.energy <= 0) {
      this.dead = true;
    }
  }

  display() {
    fill(this.color);
    noStroke();
    ellipse(this.position.x, this.position.y, this.size, this.size);
  }

  eat(plants) {
    if (!plants) {
      return;
    }
    
    for (let i = plants.length - 1; i >= 0; i--) {
      let plant = plants[i];
      if (plant && plant.position) {
        let distanceToPlant = p5.Vector.dist(this.position, plant.position);
        if (distanceToPlant < (this.size + plant.size) / 2) {
          this.energy += plant.energyValue; // restore energy based on the plant's energy value
          plant.size = 0.5; // reset plant size to 0.5 when eaten
          plant.energyValue = plant.size * 2; // update plant's energy value based on the new size
          return;
        }
      }
    }
  }

  reproduce() {
    if (random() < window.settings.herbivore.reproductionRate && this.energy > window.settings.herbivore.energy * window.settings.herbivore.reproductionThreshold) {
      this.energy *= 0.5;
      return new Herbivore();
    }
    return null;
  }

}

window.Herbivore = Herbivore;