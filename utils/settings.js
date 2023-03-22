window.settings = {
    plant: {
      initialAmount: 50,
      maxSize: 10,
      growthRate: 0.1,
      energyMultiplier: 20,
    },
    herbivore: {
      initialAmount: 50,
      size: 10,
      energy: 1000,
      energyDepletion: 0.5,
      reproductionRate: 0.01,
      reproductionThreshold: 0.5,
      energyRestoration: 250,
    },
    fastCarnivore: {
      initialAmount: 5,
      size: 12,
      energy: 2000,
      energyDepletion: 1,
      reproductionRate: 0.01,
      reproductionThreshold: 0.5,
      energyRestoration: 250,
    },
    strongCarnivore: {
      initialAmount: 2,
      size: 20,
      energy: 250,
      energyDepletion: 1,
      reproductionRate: 0.01,
      reproductionThreshold: 0.5,
      energyRestorationHerbivore: 250,
      energyRestorationFastCarnivore: 350,
    },
  };

const settingsForm = document.getElementById('settings-form');
settingsForm.addEventListener('submit', function(event) {
event.preventDefault();

const formData = new FormData(settingsForm);
const updatedSettings = {};

for (const [name, value] of formData.entries()) {
    const [group, key] = name.split('.');
    updatedSettings[group] = updatedSettings[group] || {};
    updatedSettings[group][key] = Number(value);
}

Object.assign(window.settings, updatedSettings);
});