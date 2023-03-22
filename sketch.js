let plants = [];
let herbivores = [];
let fastCarnivores = [];
let strongCarnivores = [];


let populationChart;

function setup() {
  createCanvas(windowWidth,windowHeight);
  

  // Initialize populations with some starting values
  for (let i = 0; i < window.settings.plant.initialAmount; i++) {
    plants.push(new Plant());
  }

  for (let i = 0; i < window.settings.herbivore.initialAmount; i++) {
    herbivores.push(new Herbivore());
  }

  for (let i = 0; i < window.settings.fastCarnivore.initialAmount; i++) {
    fastCarnivores.push(new FastCarnivore());
  }

  for (let i = 0; i < window.settings.strongCarnivore.initialAmount; i++) {
    strongCarnivores.push(new StrongCarnivore());
  }

  // Initialize population chart
  populationChart = new PopulationChart(
    300, // width of the chart
    200, // height of the chart
    herbivores.length, // initial herbivore count
    fastCarnivores.length, // initial fast carnivore count
    strongCarnivores.length // initial strong carnivore count
  );
}

function draw() {
  background(83);

  // Update and display populations
  for (let plant of plants) {
    plant.update();
    plant.display();
  }

  herbivores = herbivores.filter(herbivore => !herbivore.dead);
  for (let herbivore of herbivores) {
    herbivore.update();
    herbivore.display();
    herbivore.eat(plants);
    let newHerbivore = herbivore.reproduce();
    if (newHerbivore) {
      herbivores.push(newHerbivore);
    }
  }

  fastCarnivores = fastCarnivores.filter(carnivore => !carnivore.dead);
  for (let fastCarnivore of fastCarnivores) {
    fastCarnivore.update();
    fastCarnivore.display();
    fastCarnivore.eat(herbivores);
    let newFastCarnivore = fastCarnivore.reproduce();
    if (newFastCarnivore) {
      fastCarnivores.push(newFastCarnivore);
    }
  }

  strongCarnivores = strongCarnivores.filter(carnivore => !carnivore.dead);
  for (let strongCarnivore of strongCarnivores) {
    strongCarnivore.update();
    strongCarnivore.display();
    strongCarnivore.eat(herbivores, fastCarnivores);
    let newStrongCarnivore = strongCarnivore.reproduce();
    if (newStrongCarnivore) {
      strongCarnivores.push(newStrongCarnivore);
    }
  }

  // Update and display population chart
  populationChart.update(
    herbivores.length,
    fastCarnivores.length,
    strongCarnivores.length
  );

}