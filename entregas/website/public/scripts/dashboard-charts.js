const lineChartDiv = document.getElementById("line-chart");
const columnChartDiv = document.getElementById("column-chart");

// === GRÁFICO DE LINHAS === //
const lineChartData = {      // dados mockados para visualização no gráfico
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
                max: 5,                                     // valor máximo do eixo Y = 5
                ticks: { stepSize: 1.0 },                   // delimita "salto" de sempre 1.0 entre as medições do eixo Y
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
    lineChart.update();                                                 // ! atualiza o gráfico !

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
    labels: ['C-01', 'C-02', 'C-03', 'C-04', 'C-05', 'Ideal'],
    data: [3.1, 2.0, 1.5, 4.2, 2.2]
};

let columnChart = new Chart(columnChartDiv, {
    type: 'bar',
    data: {
        labels: columnData.labels,
        datasets: [{
        data: columnData.data,
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
            legend: { display: false },
        },
        scales: {
            x: {
                grid: {display: false}
            }
        }
    }
});