// const lineChartDiv = document.getElementById("line-chart");
// const columnChartDiv = document.getElementById("column-chart");

// // === GRÁFICO DE LINHAS === //
// const lineChartData = {
//     '24h': {
//         labels: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00', '23:59'],
//         data: [[1.1, 1.3, 0.9, 1.0, 1.1],
//                [1.0, 0.8, 0.9, 1.1, 1.0],
//                [1.3, 1.2, 1.5, 1.6, 1.8],
//                [1.1, 1.4, 1.0, 1.2, 1.2],
//                [1.5, 1.3, 1.8, 1.8, 2.0]] 
//     },
//     '7d': {
//         labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'],
//         data: [[1.1, 1.3, 0.9, 1.0, 1.1],
//                [1.0, 0.8, 0.9, 1.1, 1.0],
//                [1.3, 1.2, 1.5, 1.6, 1.8],
//                [1.1, 1.4, 1.0, 1.2, 1.2],
//                [1.5, 1.3, 1.8, 1.8, 2.0]] 
//     },
//     '30d': {
//         labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
//         data: [[1.1, 1.3, 0.9, 1.0, 1.1],
//                [1.0, 0.8, 0.9, 1.1, 1.0],
//                [1.3, 1.2, 1.5, 1.6, 1.8],
//                [1.1, 1.4, 1.0, 1.2, 1.2],
//                [1.5, 1.3, 1.8, 1.8, 2.0]] 
//     }
// };

// // criação/configuração do gráfico
// const lineChart = new Chart(lineChartDiv, {
//      type: 'line',
//     data: {
//         labels: lineChartData['24h'].labels,
// datasets: [{
//     label: "C-01",
//     data: lineChartData['24h'].data[0],
//     backgroundColor:'#B8323220',
//     borderColor:'#B83232',
//     borderWidth: 2
// },
// {
//     label: "C-02",
//     data: lineChartData['24h'].data[1],
//     backgroundColor:'#7A9B5520',
//     borderColor:'#7A9B55',
//     borderWidth: 2
// },
// {
//     label: "C-03",
//     data: lineChartData['24h'].data[2],
//     backgroundColor:'#1A568F20',
//     borderColor:'#1A568F',
//     borderWidth: 2
// },
// {
//     label: "C-04",
//     data: lineChartData['24h'].data[3],
//     backgroundColor:'#1E301220',
//     borderColor:'#1E3012',
//     borderWidth: 2
// },
// {
//     label: "C-05",
//     data: lineChartData['24h'].data[4],
//     backgroundColor:'#d18b0020',
//     borderColor:'#d18b00',
//     borderWidth: 2
// }]
//     },
//     options: {
//         plugins: {
//             legend: { display: true },
//             annotation: {
//                 annotations: {
//                     limiteCritico: {
//                         type: 'line',
//                         yMin: 1.5,
//                         yMax: 1.5,
//                         borderColor: '#B83232',
//                         borderWidth: 3,
//                         label: {
//                             display: true,
//                             content: 'Limite Crítico (1.5 ppm)',
//                             position: 'end',
//                             backgroundColor: 'rgba(184, 50, 50, 0.8)',
//                             color: '#fff',
//                             font: {
//                                 size: 14,
//                                 weight: 'bold'
//                             },
//                             padding: 6,
//                             borderRadius: 4
//                         }
//                     }
//                 }
//             }
//         },
//         scales: {
//             y: {
//                 min: 0,
//                 max: 3,
//             },
//             x: {
//             grid: { display: false }
//             }
//         }
//     }
// });




// // // === GRÁFICO DE BARRAS === //
// const columnData = {
//     labels: ['C-01', 'C-02', 'C-03', 'C-04', 'C-05'],
//     data: [1.1, 1.0, 1.8, 1.2, 2.0],
// };

// let columnChart = new Chart(columnChartDiv, {
//     type: 'bar',
//     data: {
//         labels: columnData.labels,
// datasets: [{
//     label: "Nível de Etileno (ppm)",
//     data: columnData.data,
//     backgroundColor: columnData.data.map(valor => valor > 1.5 ? 'rgba(184, 50, 50, 0.6)' : 'rgba(122, 155, 85, 0.6)'),
//     borderColor: columnData.data.map(valor => valor > 1.5 ? '#B83232' : '#7A9B55'),
//     borderWidth: 2
// }]
//     },
//     options: {
//         plugins: {
//             legend: { display: true },
//             annotation: {
//                 annotations: {
//                     limiteCritico: {
//                         type: 'line',
//                         yMin: 1.5,
//                         yMax: 1.5,
//                         borderColor: '#B83232',
//                         borderWidth: 3,
//                         label: {
//                             display: true,
//                             content: 'Limite Crítico (1.5 ppm)',
//                             position: 'end',
//                             backgroundColor: 'rgba(184, 50, 50, 0.8)',
//                             color: '#fff',
//                             font: {
//                                 size: 14,
//                                 weight: 'bold'
//                             },
//                             padding: 6,
//                             borderRadius: 4
//                         }
//                     }
//                 }
//             }
//         },
//         scales: {
//             y: {
//                 min: 0,
//                 max: 3,
//             },
//             x: {
//             grid: { display: false }
//             }
//         }
//     }
// });

let sessaousuario = sessionStorage.getItem("APPLETECH_USER");
let dadousuario = JSON.parse(sessaousuario);
let idEmpresa = dadousuario.empresaId;

 window.onload = () => {
    
        atualizarPeriodo('1')
        
    }

function atualizarPeriodo(periodo) {   
    console.log("oi")                               

    // confere a classe "active" ao botão ativo no momento e remove-a dos demais
    let btnGroup = document.querySelectorAll(".btn-group button");      
    for (let i = 0; i < btnGroup.length; i++) {
        btnGroup[i].classList.remove("active");
    }
    let activeBtn = document.querySelector(`.btn-group button[data-periodo="${periodo}"]`);
    activeBtn.classList.add("active");

    buscarranking(periodo)
    
}

function buscarranking(periodo) {
    console.log("foi")
    fetch(`/medidas/buscar-sensores-maior-pico/${idEmpresa}`).then((resposta) => {
        if(resposta.ok) {
            resposta.json().then((dados) => {
                let labelsbarras = dados.map((valor) => `${valor.nome_camara} (${valor.numero_sensor})`);
                let valoresbarras = dados.map((valor) => valor.nivel_etileno);
                let coresbarras = dados.map(valor => valor.nivel_etileno > 1.5 ? '#B83232' : '#7A9B55');

                plotarbarras(labelsbarras, valoresbarras, coresbarras);

                buscarhistorico(periodo);
            })
        }
    })
}
let chartbarras
function plotarbarras (labels, valores, cores){
    //  let columnChart = new Chart(columnChartDiv, {
    let ctx = document.getElementById('column-chart')
   
    if (chartbarras) {
        chartbarras.destroy();
    }

    chartbarras = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: labels,
datasets: [{
    label: "Nível de Etileno (ppm)",
    data: valores,
    backgroundColor: cores,
    borderColor: cores,
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

}

function buscarhistorico(periodo){
    fetch(`/medidas/buscar-etileno-registro/${idEmpresa}/${periodo}`).then((resposta) => {
        if(resposta.ok) {
            resposta.json().then((dados) => {
                plotarlinha(dados);
            })
        }
    }).catch((erro) =>{
        console.error("erro no grafico 2", erro);
    })
}

let chartlinhas;

function plotarlinha(dados){
    let ctx = document.getElementById('line-chart')
    let labelsx = [];
    let nomecamaras = [];
    

    if (chartlinhas) {
        chartlinhas.destroy();
    }

    for(let i = 0; i < dados.length; i++){
        let valor = dados[i]
    

        if(labelsx.indexOf(valor.data_formatada) == -1){
            labelsx.push(valor.data_formatada);
        }

        if(nomecamaras.indexOf(valor.apelido) == -1){
            nomecamaras.push(valor.apelido);
        }
    }

    let cores = ['#B83232', '#7A9B55', '#1A568F', '#1E3012', '#d18b00', '#6A5ACD', '#FF4500'];




chartlinhas = new Chart(ctx, {
     type: 'line',
    data: {
        labels: labelsx,
        datasets: nomecamaras.map((nome) => {

                let numerocamara = parseInt(nome.split('-')[1]) || 0;
                let cor = cores[(numerocamara - 1) % cores.length];
                
                return {
                    label: nome,
                    data: labelsx.map(tempo => {
                        
                        let registro = dados.find(d => d.apelido === nome && d.data_formatada === tempo);
                        return registro ? registro.etileno : null;
                    }),
                    borderColor: cor,
                    backgroundColor: cor,
                    tension: 0.4,
                    spanGaps: true,
                    pointRadius: 4
                };
            })
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
                            content: 'Limite',
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

}