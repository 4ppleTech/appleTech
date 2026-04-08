const line_chart_div = document.getElementById("line-chart");
const column_chart_div = document.getElementById("column-chart");

// === GRÁFICO DE LINHAS === //
const line_data = {
    '24h': {
        labels: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00', '23:59'],
        data: [0, 2.6, 1.3, 1.3, 4.3, 2.5, 2.5, 0.7, 2.6, 1.2]
    },
    '7d': {
        labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'],
        data: [2, 3.5, 2.1, 4.0, 3.2, 1.5, 2.8]
    },
    '30d': {
        labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
        data: [1.5, 2.8, 3.9, 2.2]
    }
}
let line_chart = new Chart(line_chart_div, {
  type: 'line',
  data: {
    labels: line_data['24h'].labels,
    datasets: [{
      data: line_data['24h'].data,
      borderColor: '#7a9b55',
      backgroundColor: 'rgba(122, 155, 85, 0.2)',
      fill: true,
      tension: 0.4,
      pointRadius: 0,
      borderWidth: 2
    }]
  },
  options: {
    responsive: true,
    plugins: {
        legend: { 
            display: false 
        },
    },
    scales: {
      y: {
        min: 0,
        max: 5,
        ticks: {
            stepSize: 1.0,
        },
        grid: {
          drawBorder: false,
        }
      },
      x: {
        grid: { display: false }
      }
    }
  }
});

function atualizarData(periodo) {
  line_chart.data.labels = line_data[periodo].labels;
  line_chart.data.datasets[0].data = line_data[periodo].data;
  line_chart.update();

  document.querySelectorAll('.btn-group button').forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
}

// === GRÁFICO DE BARRAS === //
const column_data = {
    labels: ['C-01', 'C-02', 'C-03', 'C-04', 'C-05', 'Ideal'],
    data: [3.1, 2.0, 1.5, 4.2, 2.2]
};

let column_chart = new Chart(column_chart_div, {
    type: 'bar',
    data: {
        labels: column_data.labels,
        datasets: [{
        data: column_data.data,
        borderColor: '#7a9b55',
        backgroundColor: 'rgba(122, 155, 85, 0.2)',
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        borderWidth: 2
        }]
    },
    options: {
        plugins: {
            legend: { 
                display: false 
            },
        },
        scales: {
            x: {
                grid: {display: false}
            }
        }
    }
});