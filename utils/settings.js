// settings.js

new p5();

const HIERARCHY_GAP_MIN = 1;
const HIERARCHY_GAP_MAX = 2;


// every higher layer has more size, more biomass, BUT
// starve faster and need more food to reproduce

  window.settings = {
    herbivore: {
      numEntities: 70,
      size: 5,
      energy: 100,                // herbivores dont need this as they don't storve
      energyDepletion: 50,       // herbivores dont need this
      reproductionRate: 0,    // Decrease the reproduction rate
      reproductionThreshold: 0, // Increase the reproduction threshold
      reproductionInterval: 100,  // Increase the reproduction interval
      energyRestoration: 100,      // When eaten, how much energy does the predator regain
      color: color(0, 0, 255),    // Blue
      active: true
    },
  carnivoreA: {
    numEntities: 70,             // Increase number of carnivores
    size: 10,
    energy: 300,
    energyDepletion: 15,         // Adjust energy depletion
    reproductionRate: 0,       // Adjust reproduction rate
    reproductionThreshold: 0.3,  // Increase reproduction threshold
    energyRestoration: 300,       // Adjust energy restoration
    reproductionInterval: 5,     // Increase the reproduction interval
    color: color(0, 255, 255),    // Cyan
    active: true
  },
  carnivoreB: {
    numEntities: 35,
    size: 11,
    energy: 500,
    energyDepletion: 25,
    reproductionRate: 0,      // Adjust reproduction rate
    reproductionThreshold: 0.5,
    energyRestoration: 500,
    reproductionInterval: 5,    // Increase the reproduction interval
    color: color(255, 0, 0),      // Red
    active: true
  },
  carnivoreC: {
    numEntities: 20,
    size: 15,
    energy: 800,
    energyDepletion: 45,
    reproductionRate: 0,       // Adjust reproduction rate
    reproductionThreshold: 0.3,
    energyRestoration: 900,
    reproductionInterval: 5, // Increase the reproduction interval
    color: color(255, 128, 0), // Orange
    active: true
  },
  carnivoreD: {
    numEntities: 10,
    size: 16,
    energy: 1700,
    energyDepletion: 85,
    reproductionRate: 0, // Adjust reproduction rate
    reproductionThreshold: 0.3,
    energyRestoration: 1700,
    reproductionInterval: 5, // Increase the reproduction interval
    color: color(255, 255, 0), // Yellow
    active: true
  },
  carnivoreE: {
    numEntities: 5,
    size: 20,
    energy: 3000,
    energyDepletion: 150,
    reproductionRate: 0, // Adjust reproduction rate
    reproductionThreshold: 0.3,
    energyRestoration: 3000,
    reproductionInterval: 5, // Increase the reproduction interval
    color: color(128, 0, 255), // Purple
    active: true
  },
  carnivoreF: {
    numEntities: 2,
    size: 21,
    energy: 5000,
    energyDepletion: 250,
    reproductionRate: 0, // Adjust reproduction rate
    reproductionThreshold: 0.3,
    energyRestoration: 0,
    reproductionInterval: 5, // Increase the reproduction interval
    color: color(255, 0, 255), // Magenta
    active: true
  },
  hierarchy: [
    'Herbivore',
    'CarnivoreA',
    'CarnivoreB',
    'CarnivoreC',
    'CarnivoreD',
    'CarnivoreE',
    'CarnivoreF',
  ],
};
