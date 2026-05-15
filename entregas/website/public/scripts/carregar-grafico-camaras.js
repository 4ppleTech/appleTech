export function carregarGraficoCamara(chamberId) {
    const ctx = document.getElementById(`chart-${chamberId}`);

    new Chart(ctx, {
        type: "line",
        data: {
            // Aviso: substituir por dados reais da API
            labels: ["a", "b", "c"],
            datasets: [{
                label: "Etileno (ppm)",
                data: [1, 2, 3],
                borderColor: "#7A9B55",
                backgroundColor: "rgba(122, 155, 85, 0.2)",
                fill: true,
                tension: 0.4,
                pointRadius: 4,
                borderWidth: 2,
            }],
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
}

export function atualizarGraficoCamara(chamberId) {
    
}