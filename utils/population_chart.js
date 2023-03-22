class PopulationChart {
    constructor(width, height, initialHerbivoreCount, initialFastCarnivoreCount, initialStrongCarnivoreCount) {
      this.width = width;
      this.height = height;
      this.data = {
        labels: [0],
        datasets: [
          {
            label: 'Herbivores',
            data: [initialHerbivoreCount],
            borderColor: 'rgba(0, 0, 255, 0.8)',
            backgroundColor: 'rgba(0, 0, 255, 0.2)',
            borderWidth: 1,
          },
          {
            label: 'Fast Carnivores',
            data: [initialFastCarnivoreCount],
            borderColor: 'rgba(255, 128, 0, 0.8)',
            backgroundColor: 'rgba(255, 128, 0, 0.2)',
            borderWidth: 1,
          },
          {
            label: 'Strong Carnivores',
            data: [initialStrongCarnivoreCount],
            borderColor: 'rgba(128, 0, 128, 0.8)',
            backgroundColor: 'rgba(128, 0, 128, 0.2)',
            borderWidth: 1,
          },
        ],
      };
  
      this.chart = this.createChart();
    }
  
    createChart() {
      const chartCanvas = document.getElementById('chart-canvas');
      chartCanvas.width = this.width;
      chartCanvas.height = this.height;
  
      return new Chart(chartCanvas, {
        type: 'line',
        data: this.data,
        options: {
          scales: {
            x: {
              display: true,
              title: {
                display: true,
                text: 'Time',
              },
            },
            y: {
              display: true,
              title: {
                display: true,
                text: 'Population',
              },
              beginAtZero: true,
            },
          },
          plugins: {
            legend: {
              display: true,
              position: 'top',
            },
          },
          maintainAspectRatio: false,
        },
      });
    }
  
    update(herbivoreCount, fastCarnivoreCount, strongCarnivoreCount) {
      const currentFrame = frameCount;
      if (currentFrame % 60 === 0) {
        this.data.labels.push(currentFrame / 60);
        this.data.datasets[0].data.push(herbivoreCount);
        this.data.datasets[1].data.push(fastCarnivoreCount);
        this.data.datasets[2].data.push(strongCarnivoreCount);
        this.chart.update();
      }
    }
  }