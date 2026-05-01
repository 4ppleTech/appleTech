const lineChartDiv = document.getElementById("line-chart");
const columnChartDiv = document.getElementById("column-chart");

// === GRÁFICO DE LINHAS === //
const lineChartData = {
    '24h': {
        labels: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00', '23:59'],
        data: [
            [1.1, 1.1, 1.0, 1.1, 1.2, 1.3, 1.5, 1.4, 1.42],                     // dados da C-01
            [1.1, 1.1, 1.0, 1.1, 1.2, 1.3, 1.5, 1.4, 1.42],                     // dados da C-02
            [1.1, 1.1, 1.0, 1.1, 1.2, 1.3, 1.5, 1.4, 1.42],                     // dados da C-03
            [1.1, 1.1, 1.0, 1.1, 1.2, 1.3, 1.5, 1.4, 1.42],                     // dados da C-04
            [1.1, 1.1, 1.0, 1.1, 1.2, 1.3, 1.5, 1.4, 1.42],                     // dados da C-05
        ] 
    },
    '7d': {
        labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'],
        data: [
            [1.1, 1.1, 1.0, 1.1, 1.2, 1.3, 1.5, 1.4, 1.42],                     // dados da C-01
            [1.1, 1.1, 1.0, 1.1, 1.2, 1.3, 1.5, 1.4, 1.42],                     // dados da C-02
            [1.1, 1.1, 1.0, 1.1, 1.2, 1.3, 1.5, 1.4, 1.42],                     // dados da C-03
            [1.1, 1.1, 1.0, 1.1, 1.2, 1.3, 1.5, 1.4, 1.42],                     // dados da C-04
            [1.1, 1.1, 1.0, 1.1, 1.2, 1.3, 1.5, 1.4, 1.42],                     // dados da C-05
        ] 
    },
    '30d': {
        labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
        data: [
            [1.1, 1.1, 1.0, 1.1, 1.2, 1.3, 1.5, 1.4, 1.42],                     // dados da C-01
            [1.1, 1.1, 1.0, 1.1, 1.2, 1.3, 1.5, 1.4, 1.42],                     // dados da C-02
            [1.1, 1.1, 1.0, 1.1, 1.2, 1.3, 1.5, 1.4, 1.42],                     // dados da C-03
            [1.1, 1.1, 1.0, 1.1, 1.2, 1.3, 1.5, 1.4, 1.42],                     // dados da C-04
            [1.1, 1.1, 1.0, 1.1, 1.2, 1.3, 1.5, 1.4, 1.42],                     // dados da C-05
        ] 
    }
};

// criação/configuração do gráfico
const lineChart = new Chart(lineChartDiv, {
    type: "line",
    data: {
        labels: lineChartData['24h'].labels,                // legendas do eixo X
        datasets: [
        {
            data: lineChartData['24h'].data[0],                // dados do gráfico
            borderColor: '#7a9b55',                       // cor do contorno
            backgroundColor: 'rgba(122, 155, 85, 0.2)',   // cor da linha
            fill: false,                                     // colore o espaço interno
            tension: 0.4,                                   // forneçe o aspecto "curvado" da linha
            pointRadius: 2,                                 // elimina os pontinhos da linha
            borderWidth: 2                                  // determina grossura da linha
        },
        {
            data: lineChartData['24h'].data[1],                // dados do gráfico
            borderColor: '#7a9b55',                       // cor do contorno
            backgroundColor: 'rgba(122, 155, 85, 0.2)',   // cor da linha
            fill: false,                                     // colore o espaço interno
            tension: 0.4,                                   // forneçe o aspecto "curvado" da linha
            pointRadius: 2,                                 // elimina os pontinhos da linha
            borderWidth: 2                                  // determina grossura da linha
        },
        {
            data: lineChartData['24h'].data[2],                // dados do gráfico
            borderColor: '#7a9b55',                       // cor do contorno
            backgroundColor: 'rgba(122, 155, 85, 0.2)',   // cor da linha
            fill: false,                                     // colore o espaço interno
            tension: 0.4,                                   // forneçe o aspecto "curvado" da linha
            pointRadius: 2,                                 // elimina os pontinhos da linha
            borderWidth: 2                                  // determina grossura da linha
        },
        {
            data: lineChartData['24h'].data[3],                // dados do gráfico
            borderColor: '#7a9b55',                       // cor do contorno
            backgroundColor: 'rgba(122, 155, 85, 0.2)',   // cor da linha
            fill: false,                                     // colore o espaço interno
            tension: 0.4,                                   // forneçe o aspecto "curvado" da linha
            pointRadius: 2,                                 // elimina os pontinhos da linha
            borderWidth: 2                                  // determina grossura da linha
        },
        {
            data: lineChartData['24h'].data[4],                // dados do gráfico
            borderColor: '#7a9b55',                       // cor do contorno
            backgroundColor: 'rgba(122, 155, 85, 0.2)',   // cor da linha
            fill: false,                                     // colore o espaço interno
            tension: 0.4,                                   // forneçe o aspecto "curvado" da linha
            pointRadius: 2,                                 // elimina os pontinhos da linha
            borderWidth: 2                                  // determina grossura da linha
        },
    ]
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
    data: [1.1, 1.0, 1.8, 1.2, 2.0],
};

let columnChart = new Chart(columnChartDiv, {
    type: 'bar',
    data: {
        labels: columnData.labels,
datasets: [{
    label: "Nível de Etileno (ppm)",
    data: columnData.data,
    backgroundColor: columnData.data.map(valor => valor > 1.5 ? 'rgba(184, 50, 50, 0.6)' : 'rgba(122, 155, 85, 0.6)'),
    borderColor: columnData.data.map(valor => valor > 1.5 ? '#B83232' : '#7A9B55'),
    borderWidth: 2
}]
    },
    options: {
        plugins: {
            legend: { display: true },
            annotation: {
                annotations: {
                    limiteCritico: {
                        type: 'line',
                        yMin: 1.5,
                        yMax: 1.5,
                        borderColor: '#B83232',
                        borderWidth: 3,
                        label: {
                            display: true,
                            content: 'Limite Crítico (1.5 ppm)',
                            position: 'end',
                            backgroundColor: 'rgba(184, 50, 50, 0.8)',
                            color: '#fff',
                            font: {
                                size: 14,
                                weight: 'bold'
                            },
                            padding: 6,
                            borderRadius: 4
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