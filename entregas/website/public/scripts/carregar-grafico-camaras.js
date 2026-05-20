
const instanciasGraficos = {};

export function carregarGraficoCamara(chamberId, interval) {
    const ctx = document.getElementById(`chart-${chamberId}`);
    if(!ctx) return;

    if(instanciasGraficos[chamberId]) {
        instanciasGraficos[chamberId].destroy();
    }

    const idCamaraNumerico = parseInt(chamberId.replace("c-", ""));
    fetch(`/medidas/buscar-camara-individual/${idCamaraNumerico}/${interval}`)
        .then((res) => {
            if (!res.ok) {
                throw new Error(`Não foi possível carregar gráficos da Câmara: ${chamberId}`)
            }
            return res.json();
        })
        .then((dados) => {
            const chartLabels = dados.map((d) => d.data_formatada);

            const listaIdSensores = [];
            dados.forEach((d) => !listaIdSensores.includes(d.id_sensor) && listaIdSensores.push(d.id_sensor));

            const chartDatasets = listaIdSensores.map((sensorId) => {
                const leiturasDoSensor = dados.filter((d) => d.id_sensor === sensorId);
                return {
                    label: leiturasDoSensor[0].numero_sensor,
                    data: leiturasDoSensor.map((leitura) => ({x: leitura.data_formatada, y: leitura.etileno})),
                    borderColor: "#7A9B55",
                    backgroundColor: "rgba(122, 155, 85, 0.2)",
                    fill: true,
                    tension: 0.4,
                    pointRadius: 4,
                    borderWidth: 2,
                };
            })

            instanciasGraficos[chamberId] = new Chart(ctx, {
                type: "line",
                data: {
                    labels: chartLabels,
                    datasets: chartDatasets,
                },
                options: {
                    responsive: true,
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
                    scales: { y: { min: 0, max: 3 } },
                },
            });
        })
        .catch((error) => {
            console.error(error);
        });
}

export function atualizarGraficoCamara(chamberId) {
    const chart = instanciasGraficos[chamberId];
    if (!chart) {
        console.warn(`[atualizarGraficoCamara] Gráfico da câmara ${chamberId} não foi inicializado ainda.`);
        return;
    }

    const idCamaraNumerico = parseInt(chamberId.replace("c-", ""));
    fetch(`/medidas/buscar-camara-individual/${idCamaraNumerico}/1`)
        .then((res) => {
            if (!res.ok) throw new Error(`Erro ao atualizar dados da Câmara: ${chamberId}`);
            return res.json();
        })
        .then((dados) => {
            const chartLabels = dados.map((d) => d.data_formatada);
            chart.data.labels = chartLabels;

            const listaIdSensores = [];
            dados.forEach((d) => !listaIdSensores.includes(d.id_sensor) && listaIdSensores.push(d.id_sensor));

            listaIdSensores.forEach((sensorId) => {
                const leiturasDoSensor = dados.filter((d) => d.id_sensor === sensorId);

                let dataset = chart.data.datasets.find((ds) => ds.label === leiturasDoSensor[0].numero_sensor);
                const novosDados = leiturasDoSensor.map((leitura) => ({x: leitura.data_formatada, y: leitura.etileno}));

                // se dataset já existe
                if(dataset) {
                    dataset.data = novosDados
                } else {
                // se outro dataset apareceu
                    chart.data.datasets.push({
                        label: leiturasDoSensor[0].numero_sensor,
                        data: novosDadoss,
                        borderColor: "#7A9B55",
                        backgroundColor: "rgba(122, 155, 85, 0.2)",
                        fill: true,
                        tension: 0.4,
                        pointRadius: 4,
                        borderWidth: 2,
                    });
                }  
            })

            chart.update();
            console.log(`[atualizarGraficoCamara] Atualizei Gráfico [chart-${chamberId}]`)
        })
        .catch((error) => {
            console.error(`Erro no update do gráfico ${chamberId}:`, error);
        });
}