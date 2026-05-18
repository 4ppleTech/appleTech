// 1, 7, 30
/*
{
    id_empresa: 1,
    id_camara: 1,
    id_sensor: 5,
    numero_sensor: '12AbD',
    etileno: 2.1,
    data_hora: 2026-05-15T22:00:48.000Z,
    data_formatada: '15/05 19:00'
  }
*/
export function carregarGraficoCamara(chamberId, interval) {
    const ctx = document.getElementById(`chart-${chamberId}`);
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
            const chartDatasets = dados.map((d) => {
                console.log(dados)
                return {
                    label: d.numero_sensor,
                    data: d.etileno,
                    borderColor: "#7A9B55",
                    backgroundColor: "rgba(122, 155, 85, 0.2)",
                    fill: true,
                    tension: 0.4,
                    pointRadius: 4,
                    borderWidth: 2,
                };
            });

            new Chart(ctx, {
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

}