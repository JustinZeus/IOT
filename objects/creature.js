// creature.js
class Creature {
    constructor(speciesSettings) {
      this.position = createVector(random(width), random(height));
      this.velocity = p5.Vector.random2D().mult(1);
      this.acceleration = createVector(0, 0);
      this.size = speciesSettings.size;
      this.energy = speciesSettings.energy;
      this.energyDepletion = speciesSettings.energyDepletion;
      this.reproductionRate = speciesSettings.reproductionRate;
      this.reproductionThreshold = speciesSettings.reproductionThreshold;
      this.speciesSettings = speciesSettings;
      this.hierarchy = window.settings.hierarchy.indexOf(this.constructor.name);
      this.reproductionTimer = speciesSettings.reproductionInterval;  
    }
  
    update(creatures, quadtree) {
      if (this.hierarchy != 0) {
        this.energy -= this.energyDepletion;
      }
      if (this.energy > 0) {
        this.move();
        this.eat(quadtree);
        this.reproduce(creatures);
      } else {
        this.die(creatures);
      }
      this.reproductionTimer--;
    }
    
  
    move() {
        this.acceleration.add(createVector(random(-1.5, 1.5), random(-1.5, 1.5)));
        this.velocity.add(this.acceleration);
        this.velocity.limit(4);
        this.position.add(this.velocity);
      
        // Add some jittery movement
        const jitter = p5.Vector.random2D().mult(0.2);
        this.position.add(jitter);
      
        // Slow down the creature's movement
        this.velocity.mult(0.95);
      
        // Check if the creature is crossing the border of the canvas
        if (this.position.x < this.size / 2) {
          this.position.x = this.size / 2;
          this.velocity.x *= -1;
        } else if (this.position.x > width - this.size / 2) {
          this.position.x = width - this.size / 2;
          this.velocity.x *= -1;
        }
      
        if (this.position.y < this.size / 2) {
          this.position.y = this.size / 2;
          this.velocity.y *= -1;
        } else if (this.position.y > height - this.size / 2) {
          this.position.y = height - this.size / 2;
          this.velocity.y *= -1;
        }
      
        this.acceleration.mult(0);
      }
      
  
      eat(quadtree) {
        const range = new Rectangle(this.position.x, this.position.y, this.size, this.size);
        const nearbyCreatures = quadtree.query(range);
      
        for (const other of nearbyCreatures) {
          // Skip if checking against itself
          if (this === other) {
            continue;
          }
      
          const distance = this.position.dist(other.position);
          const combinedSize = (this.size + other.size) / 2;
      
          // Check if the two creatures are touching
          if (distance < combinedSize) {
            // If this creature can eat the other creature, remove the other creature and update energy
            if (this.canEat(other)) {
              this.energy += Math.min(other.speciesSettings.energyRestoration+this.energy, this.speciesSettings.energy);
              other.die(creatures);
            }
          }
        }
      }
      
      
  
      canEat(creature) {
        // Check if the creature is a Herbivore
        if (creature.constructor.name === 'Herbivore') {
          return this.hierarchy > 0;
        }
      
        // Check if the creature is within the hierarchy gap constraints
        const hierarchyDifference = this.hierarchy - creature.hierarchy;
        return (
          hierarchyDifference >= HIERARCHY_GAP_MIN &&
          hierarchyDifference <= HIERARCHY_GAP_MAX
        );
      }
      
      
  
      reproduce(creatures) {
        if (this.reproductionTimer <= 0 && this.energy > this.speciesSettings.energy * this.speciesSettings.reproductionThreshold) {
          if (this.hierarchy === 0) {
            return;
          }
          const offspring = new this.constructor(this.speciesSettings, this.quadtree);
    
          // Set the position of the offspring close to the parent
          const offsetDistance = 40; // Adjust this value to control how close the offspring is to the parent
          const offsetX = random(-offsetDistance, offsetDistance);
          const offsetY = random(-offsetDistance, offsetDistance);
          offspring.position = createVector(this.position.x + offsetX, this.position.y + offsetY);
    
          // Ensure the offspring's position is within the canvas bounds
          offspring.position.x = constrain(offspring.position.x, 0, width);
          offspring.position.y = constrain(offspring.position.y, 0, height);
    
          offspring.energy = this.energy * 0.5;
          this.energy *= 0.5;
          creatures.push(offspring);
    
          this.reproductionTimer = this.speciesSettings.reproductionInterval;
        }
      }
      
      

  
    die(creatures) {
      const index = creatures.indexOf(this);
      if (index !== -1) {
        creatures.splice(index, 1);
      }
    }
  
    edges() {
      if (this.position.x > width + this.size / 2) {
        this.position.x = -this.size / 2;
      } else if (this.position.x < -this.size / 2) {
        this.position.x = width + this.size / 2;
      }
  
      if (this.position.y > height + this.size / 2) {
        this.position.y = -this.size / 2;
      } else if (this.position.y < -this.size / 2) {
        this.position.y = height + this.size / 2;
      }
    }
  
    display() {
      fill(this.speciesSettings.color);
      noStroke();
      ellipse(this.position.x, this.position.y, this.size, this.size);
    }
  }