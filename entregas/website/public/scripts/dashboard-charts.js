const lineChartDiv = document.getElementById("line-chart");
const columnChartDiv = document.getElementById("column-chart");

// === GRÁFICO DE LINHAS === //
const lineChartData = {
    '24h': {
        labels: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00', '23:59'],
        data: [0.5, 2.6, 1.3, 1.3, 2.3, 1.5, 1.5, 0.7, 1.2] 
    },
    '7d': {
        labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'],
        data: [1.4, 1.8, 1.2, 2.0, 1.5, 0.9, 1.3]
    },
    '30d': {
        labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
        data: [1.6, 1.4, 1.9, 1.5]
    }
};

// criação/configuração do gráfico
const lineChart = new Chart(lineChartDiv, {
    type: "line",
    data: {
        labels: lineChartData['24h'].labels,                // legendas do eixo X
        datasets: [{
            data: lineChartData['24h'].data,                // dados do gráfico
            borderColor: '#7a9b55',                       // cor do contorno
            backgroundColor: 'rgba(122, 155, 85, 0.2)',   // cor da linha
            fill: true,                                     // colore o espaço interno
            tension: 0.4,                                   // forneçe o aspecto "curvado" da linha
            pointRadius: 0,                                 // elimina os pontinhos da linha
            borderWidth: 2                                  // determina grossura da linha
        }]
    },
    options: {
        responsive: true,                                   // deixa o tamanho do gráfico adaptável
        plugins: {
            legend: { display: false },                     // remove a legenda para os dados
        },
        scales: {
            y: {
                min: 0,                                     // valor mínimo do eixo Y = 0
                max: 3,                                     // valor máximo do eixo Y = 3
                ticks: { stepSize: 0.5 },                   // delimita "salto" de sempre 0.5 entre as medições do eixo Y
                grid: { drawBorder: false }                 // não desenha as bordas do eixo Y
            },
            x: {
            grid: { display: false }                        // não desenha as linhas do eixo X
            }
        }
    }
});

function atualizarPeriodo(periodo) {                                    // recebe '24h', '7d' ou '30d'
    lineChart.data.labels = lineChartData[periodo].labels;              // configura as labels do período correspondente
    lineChart.data.datasets[0].data = lineChartData[periodo].data;      // configura os dados do período correspondente
    lineChart.update();                                                 // atualiza o gráfico

    // confere a classe "active" ao botão ativo no momento e remove-a dos demais
    let btnGtoup = document.querySelectorAll(".btn-group button");      
    for (let i = 0; i < btnGtoup.length; i++) {
        btnGtoup[i].classList.remove("active");
    }
    let activeBtn = document.querySelector(`.btn-group button[data-periodo="${periodo}"]`);
    activeBtn.classList.add("active");

}


// // === GRÁFICO DE BARRAS === //
const columnData = {
    labels: ['C-01', 'C-02', 'C-03', 'C-04', 'C-05'],
    data: [1.1, 1.0, 0.5, 1.2, 1.8],
};

let columnChart = new Chart(columnChartDiv, {
    type: 'bar',
    data: {
        labels: columnData.labels,
        datasets: [{
            label: "Valor Atual",
            data: columnData.data,
            borderColor: '#B83232',
            backgroundColor: 'rgba(184, 50, 50, 0.4)',
            borderWidth: 2
        }]
    },
    options: {
        plugins: {
            legend: { display: true },
            annotation: {
                annotations: {
                    zonaIdeal: {
                        type: 'box',
                        yMin: 0.5,
                        yMax: 1.5,
                        backgroundColor: '#7a9b555c',
                        borderColor: '#7A9B55',
                        borderWidth: 2,
                        label: {
                            display: true,
                            content: 'Zona Ideal',
                            position: 'end',
                            color: '#3D5C28',
                            font: { size: 18, weight: 'bold' }
                        }
                    }
                }
            }
        },
        scales: {
            y: {
                min: 0,
                max: 3,
            },
            x: {
            grid: { display: false }
            }
        }
    }
});