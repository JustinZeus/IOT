class Carnivore {
  constructor() {
    this.position = createVector(random(width), random(height));
    this.velocity = createVector(random(-1, 1), random(-1, 1));
    this.size = 15;
    this.color = color(255, 0, 0); // Red
  }

  update() {
    this.position.add(this.velocity);
    this.velocity.add(p5.Vector.random2D().mult(0.5));
    this.velocity.limit(2); // Limit speed

    // Keep the carnivore within the canvas
    this.position.x = constrain(this.position.x, 0, width);
    this.position.y = constrain(this.position.y, 0, height);

    // energy depletion over time

  }

  display() {
    fill(this.color);
    noStroke();
    ellipse(this.position.x, this.position.y, this.size, this.size);
  }
}

window.Carnivore = Carnivore;

class FastCarnivore extends Carnivore {
  constructor() {
    super();
    this.size = window.settings.fastCarnivore.size;
    this.color = color(255, 128, 0); // Orange
    this.velocity.limit(4); // Increase speed limit for FastCarnivore
    this.energy = window.settings.fastCarnivore.energy;
  }

  update() {
    super.update(); 
    this.energy -= window.settings.fastCarnivore.energyDepletion;
    if (this.energy <= 0) {
      this.dead = true;
    }
  }

  reproduce() {
    if (random() < window.settings.fastCarnivore.reproductionRate && this.energy > window.settings.fastCarnivore.energy * window.settings.fastCarnivore.reproductionThreshold) {
      this.energy *= 0.5;
      return new FastCarnivore();
    }
    return null;
  }

  eat(herbivores, fastCarnivores) {
    if (!herbivores) {
      return;
    }

    for (let i = herbivores.length - 1; i >= 0; i--) {
      let herbivore = herbivores[i];
      if (herbivore && herbivore.position) {
        let distanceToHerbivore = p5.Vector.dist(this.position, herbivore.position);
        if (distanceToHerbivore < (this.size + herbivore.size) / 2) {
          herbivores.splice(i, 1);
          this.energy += window.settings.fastCarnivore.energyRestoration;
          return;
        }
      }
    }
  }
}

class StrongCarnivore extends Carnivore {
  constructor() {
    super();
    this.size = window.settings.strongCarnivore.size;
    this.color = color(128, 0, 128); // Purple
    this.energy = window.settings.strongCarnivore.energy;
  }

  update() {
    super.update(); 
    this.energy -= window.settings.strongCarnivore.energyDepletion;
    if (this.energy <= 0) {
      this.dead = true;
    }
  }

  reproduce() {
    if (random() < window.settings.strongCarnivore.reproductionRate && this.energy > window.settings.strongCarnivore.energy * window.settings.strongCarnivore.reproductionThreshold) {
      this.energy *= 0.5;
      return new StrongCarnivore();
    }
    return null;
  }

  eat(herbivores, fastCarnivores) {
    if (!herbivores && !fastCarnivores) {
      return;
    }
    if (herbivores){
      for (let i = herbivores.length - 1; i >= 0; i--) {
        let herbivore = herbivores[i];
        if (herbivore && herbivore.position) {
          let distanceToHerbivore = p5.Vector.dist(this.position, herbivore.position);
          if (distanceToHerbivore < (this.size + herbivore.size) / 2) {
            herbivores.splice(i, 1);
            this.energy += window.settings.strongCarnivore.energyRestorationHerbivore;
            return;
          }
        }
      }
    }


    if (fastCarnivores){
      // new logic to eat fastCarnivores
      for (let i = fastCarnivores.length - 1; i >= 0; i--) {
        let fastCarnivore = fastCarnivores[i];
        if (fastCarnivore && fastCarnivore.position) {
          let distanceToFastCarnivore = p5.Vector.dist(this.position, fastCarnivore.position);
          if (distanceToFastCarnivore < (this.size + fastCarnivore.size) / 2) {
            fastCarnivores.splice(i, 1);
            this.energy += window.settings.strongCarnivore.energyRestorationFastCarnivore;
            return;
          }
        }
      }
    }
  }
}