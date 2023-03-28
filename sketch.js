// sketch.js
const DEBUG = false;
const creatures = [];



function setup() {
  const canvasParent = document.querySelector(".canvas-container");
  const canvasWidth = canvasParent.offsetWidth;
  const canvasHeight = canvasParent.offsetHeight;
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(canvasParent);
  

  for (const creatureType of settings.hierarchy) {
    const creatureSettingsKey = creatureType[0].toLowerCase() + creatureType.slice(1);

    const creatureSettings = settings[creatureSettingsKey];
    if(creatureSettings.active){
    for (let i = 0; i < creatureSettings.numEntities; i++) {
      let creature;
      switch (creatureType) {
        case "Herbivore":
          creature = new Herbivore(creatureSettings);
          break;
        case "CarnivoreA":
          creature = new CarnivoreA(creatureSettings);
          break;
        case "CarnivoreB":
          creature = new CarnivoreB(creatureSettings);
          break;
        case "CarnivoreC":
          creature = new CarnivoreC(creatureSettings);
          break;
        case "CarnivoreD":
          creature = new CarnivoreD(creatureSettings);
          break;
        case "CarnivoreE":
          creature = new CarnivoreE(creatureSettings);
          break;
        case "CarnivoreF":
          creature = new CarnivoreF(creatureSettings);
          break;
      }
      creatures.push(creature);
    }
    }


    
      // Start the simulation loop
  simulationLoop();
  }
}
setupPopulationChart(); // Add this line to setup the population chart

function simulationLoop() {
  // Clear the canvas
  background(83);

  // Create a quadtree with the canvas boundary
  const quadtree = new Quadtree(new Rectangle(width / 2, height / 2, width, height), 4);

  // Insert creatures into the quadtree
  for (const creature of creatures) {
    quadtree.insert(creature);
  }


  // Update creatures and use the quadtree for collision detection
  for (const creature of creatures) {
    creature.update(creatures, quadtree);
    creature.display();
  }

  if (DEBUG) {
    quadtree.show(); // Visualize the quadtree
  }
  // Call simulationLoop() again
  requestAnimationFrame(simulationLoop);
  updatePopulationChart(); 
}
