const populationChartData = {
    labels: [],
    datasets: settings.hierarchy.map((creatureType) => {
      const creatureSettingsKey = creatureType[0].toLowerCase() + creatureType.slice(1);
      const creatureSettings = settings[creatureSettingsKey];
      return {
        label: creatureType,
        data: [],
        borderColor: creatureSettings.color,
        tension: 0.1,
      };
    }),
  };
  
  let populationChart;
  let chartUpdateInterval = 30; // Update the chart every 30 frames
  let frameCounter = 0;
  
  function setupPopulationChart() {
    const ctx = document.getElementById("population-chart").getContext("2d");
    populationChart = new Chart(ctx, {
      type: "line",
      data: populationChartData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top",
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: "Time",
            },
          },
          y: {
            title: {
              display: true,
              text: "Population",
            },
          },
        },
      },
    });
  }
  
  function updatePopulationChart() {
    const populations = settings.hierarchy.map((creatureType) => {
      return creatures.filter((creature) => creature.constructor.name === creatureType).length;
    });
  
    if (frameCounter % chartUpdateInterval === 0) {
      populationChartData.labels.push(frameCounter / chartUpdateInterval);
      for (let i = 0; i < populations.length; i++) {
        populationChartData.datasets[i].data.push(populations[i]);
      }
      populationChart.update();
    }
    frameCounter++;
  }
  