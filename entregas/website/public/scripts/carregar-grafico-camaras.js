const coresMap = {
 0: '#B83232',
 1: '#7A9B55',
 2: '#d18b00',
 3: '#6A5ACD',
 4: '#1A568F'
}

// HashMap que guarda referência dos gráficos já criados
const instanciasGraficos = {};

// Aviso: Onde se ver .slice(-10), significa: últimos 10 valores da lista
export function carregarGraficoCamara(chamberId, interval) { 
    const ctx = document.getElementById(`chart-${chamberId}`);
    if(!ctx) return;

    const idCamaraNumerico = parseInt(chamberId.replace("c-", ""));
    fetch(`/medidas/buscar-camara-individual/${idCamaraNumerico}/${interval}`)
        .then((res) => {
            if(!res.ok) throw new Error(`Não foi possível carregar gráfico da Câmara: ${chamberId}`);
            return res.json();
        })
        .then((valores) => {
            const leiturasMap = {};
            const chartLabels = [];

            valores.forEach((valor) => {
                let numeroSensor = valor.numero_sensor;
                if(leiturasMap[numeroSensor]) {
                    leiturasMap[numeroSensor].push(valor.etileno);
                } else {
                    leiturasMap[numeroSensor] = [valor.etileno];
                }

                let dataLeitura = interval == 1 
                    ? new Date(valor.data_hora).toLocaleTimeString()
                    : valor.data_formatada;
                if(!chartLabels.includes(dataLeitura)) chartLabels.push(dataLeitura);
            });

            const chartDatasets = Object.keys(leiturasMap).map((numeroSensor, index) => {
                return {
                    label: numeroSensor,
                    data: leiturasMap[numeroSensor].slice(-10),
                    borderColor: coresMap[index],
                    backgroundColor: coresMap[index] + '30',
                    fill: true,
                    tension: 0.4,
                    pointRadius: 4,
                    borderWidth: 2,
                };
            });

            // Dados do Gráfico
            let data = {
                labels: chartLabels.slice(-10),
                datasets: chartDatasets
            };
            
            // Configurações do Gráfico
            let options = {
                responsive: true,
                scales: {
                    x: {
                        beginAtZero: true,
                    },
                    y: {
                        beginAtZero: true,
                        suggestedMin: 0,
                        suggestedMax: 2.5
                    }
                },
                plugins: {
                    annotation: {
                        annotations: {
                            limiteCritico: {
                                type: "line",
                                yMin: 1.5,
                                yMax: 1.5,
                                borderColor: "#B83232",
                                borderWidth: 3,
                                label: {
                                    display: true,
                                    content: "Limite Crítico (1.5 ppm)",
                                    position: "end",
                                    backgroundColor: "rgba(184, 50, 50, 0.8)",
                                    color: "#fff",
                                    font: { size: 12, weight: "bold" },
                                },
                            },
                        },
                    },
                },
            };

            // Cria Gráfico e guarda referência no HashMap
            instanciasGraficos[chamberId] = new Chart(ctx, {
                type: "line",
                data,
                options
            });
        })
        .catch((error) => {
            console.error(error);
        });
}

export function atualizarGraficoCamara(chamberId) {
    const chart = instanciasGraficos[chamberId];
    if(!chart) {
        carregarGraficoCamara(chamberId, 1);
        return;
    };

    let interval = 1;
    const activeBtn = document.querySelector(`#${chamberId} .btn-group button.active`);
    if(activeBtn) interval = activeBtn.dataset.periodo;

    const idCamaraNumerico = parseInt(chamberId.replace("c-", ""));
    fetch(`/medidas/buscar-camara-individual/${idCamaraNumerico}/${interval}`)
        .then((res) => {
            if(!res.ok) throw new Error(`Erro ao atualizar dados da Câmara: ${chamberId}`);
            return res.json();
        })
        .then((valores) => {
            const chartLabels = [];
            const leiturasMap = {};

            valores.forEach((valor) => {
                let numeroSensor = valor.numero_sensor;
                if(leiturasMap[numeroSensor]) {
                    leiturasMap[numeroSensor].push(valor.etileno);
                } else {
                    leiturasMap[numeroSensor] = [valor.etileno];
                }

                let dataLeitura = interval == 1 
                    ? new Date(valor.data_hora).toLocaleTimeString()
                    : valor.data_formatada;
                if(!chartLabels.includes(dataLeitura)) chartLabels.push(dataLeitura);
            });

            // Atualiza Labels
            chart.data.labels = chartLabels.slice(-10);

            // Atualiza Datasets
            Object.keys(leiturasMap).forEach((numeroSensor, index) => {
                let datasetCorrespondente = chart.data.datasets.find((dataset) => dataset.label === numeroSensor);
                const novosDados = leiturasMap[numeroSensor].slice(-10);
                datasetCorrespondente.data = novosDados;
            });

            chart.update();
        })
        .catch((error) => {
            console.error(`Erro no update do gráfico ${chamberId}:`, error);
        });
}