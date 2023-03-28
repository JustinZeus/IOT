class Herbivore extends Creature {
  constructor(settings) {
    super(settings);
    this.reproductionInterval = settings.reproductionInterval;
    this.reproductionTimer = this.reproductionInterval; // start the timer at the interval value
  }

  update(creatures, quadtree) {

    // Decrement the reproduction timer
    this.reproductionTimer--;
    // If the reproduction timer reaches 0, reset it and create a new herbivore
    if (this.reproductionTimer <= 0) {

      this.reproductionTimer = this.reproductionInterval;
      this.reproduce(creatures);
    }
    this.move();
  }

  reproduce(creatures) {
    

    const offspring = new this.constructor(this.speciesSettings, this.quadtree);
          
    // Set the position of the offspring close to the parent
    const offsetDistance = 40; // Adjust this value to control how close the offspring is to the parent
    const offsetX = random(-offsetDistance, offsetDistance);
    const offsetY = random(-offsetDistance, offsetDistance);
    offspring.position = createVector(this.position.x + offsetX, this.position.y + offsetY);

    // Ensure the offspring's position is within the canvas bounds
    offspring.position.x = constrain(offspring.position.x, 0, width);
    offspring.position.y = constrain(offspring.position.y, 0, height);

    creatures.push(offspring);
  }


  eat() {
    // Herbivores don't eat
  }
}