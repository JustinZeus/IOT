// settings.js

new p5();

const HIERARCHY_GAP_MIN = 1;
const HIERARCHY_GAP_MAX = 3;


  window.settings = {
    herbivore: {
      numEntities: 150,
      size: 6,
      energy: 100,
      energyDepletion: 0.2,
      reproductionRate: 0.003, // Decrease the reproduction rate
      reproductionThreshold: 0.6, // Increase the reproduction threshold
      reproductionInterval: 250, // Increase the reproduction interval
      energyRestoration: 50,
      color: color(0, 0, 255), // Blue
      active: true
    },
  carnivoreA: {
    numEntities: 100, // Increase number of carnivores
    size: 8,
    energy: 300,
    energyDepletion: 1.0, // Adjust energy depletion
    reproductionRate: 0.03, // Adjust reproduction rate
    reproductionThreshold: 0.95, // Increase reproduction threshold
    energyRestoration: 100, // Adjust energy restoration
    reproductionInterval: 30, // Increase the reproduction interval
    color: color(0, 255, 255), // Cyan
    active: true
  },
  carnivoreB: {
    numEntities: 15,
    size: 10,
    energy: 500,
    energyDepletion: 1.5,
    reproductionRate: 0.015, // Adjust reproduction rate
    reproductionThreshold: 0.8,
    energyRestoration: 150,
    reproductionInterval: 250, // Increase the reproduction interval
    color: color(255, 0, 0), // Red
    active: true
  },
  carnivoreC: {
    numEntities: 10,
    size: 12,
    energy: 700,
    energyDepletion: 2,
    reproductionRate: 0.01, // Adjust reproduction rate
    reproductionThreshold: 0.8,
    energyRestoration: 200,
    reproductionInterval: 250, // Increase the reproduction interval
    color: color(255, 128, 0), // Orange
    active: true
  },
  carnivoreD: {
    numEntities: 7,
    size: 14,
    energy: 900,
    energyDepletion: 2.5,
    reproductionRate: 0.008, // Adjust reproduction rate
    reproductionThreshold: 0.8,
    energyRestoration: 250,
    reproductionInterval: 250, // Increase the reproduction interval
    color: color(255, 255, 0), // Yellow
    active: true
  },
  carnivoreE: {
    numEntities: 5,
    size: 16,
    energy: 1100,
    energyDepletion: 3,
    reproductionRate: 0.005, // Adjust reproduction rate
    reproductionThreshold: 0.8,
    energyRestoration: 300,
    reproductionInterval: 250, // Increase the reproduction interval
    color: color(128, 0, 255), // Purple
    active: true
  },
  carnivoreF: {
    numEntities: 3,
    size: 18,
    energy: 1300,
    energyDepletion: 3.5,
    reproductionRate: 0.003, // Adjust reproduction rate
    reproductionThreshold: 0.8,
    energyRestoration: 350,
    reproductionInterval: 250, // Increase the reproduction interval
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
