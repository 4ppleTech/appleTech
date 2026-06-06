let sessaousuario = sessionStorage.getItem("APPLETECH_USER");
let dadousuario = JSON.parse(sessaousuario);
let idEmpresa = dadousuario.empresaId;

window.onload = () => {

    atualizarPeriodo('1')

}

function atualizarPeriodo(periodo) {

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
    fetch(`/medidas/buscar-sensores-maior-pico/${idEmpresa}`).then((resposta) => {
        if (resposta.ok) {
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


function plotarbarras(labels, valores, cores) {
    chartbarras.data.labels = labels

    chartbarras.data.datasets = [{
        label: "Nível de Etileno (ppm)",
        data: valores,
        backgroundColor: cores,
        borderColor: cores,
        borderWidth: 2
    }]
}

function buscarhistorico(periodo) {
    fetch(`/medidas/buscar-etileno-registro/${idEmpresa}/${periodo}`).then((resposta) => {
        if (resposta.ok) {
            resposta.json().then((dados) => {
                plotarlinha(dados);
            })
        }
    }).catch((erro) => {
        console.error("erro no grafico 2", erro);
    })

    chartbarras.update()
}


function plotarlinha(dados) {
    let labelsx = [];
    let nomecamaras = [];

    for (let i = 0; i < dados.length; i++) {
        let valor = dados[i]


        if (labelsx.indexOf(valor.data_formatada) == -1) {
            labelsx.push(valor.data_formatada);
        }

        if (nomecamaras.indexOf(valor.apelido) == -1) {
            nomecamaras.push(valor.apelido);
        }
    }

    let cores = ['#B83232', '#7A9B55', '#1A568F', '#1E3012', '#d18b00', '#6A5ACD', '#FF4500'];

    chartlinhas.data.labels = labelsx

    chartlinhas.data.datasets = []

    nomecamaras.forEach((nome) => {
        let numerocamara = parseInt(nome.split('-')[1]) || 0;

        let numero_cor = (numerocamara - 1) % cores.length
        let cor = cores[numero_cor];

        chartlinhas.data.datasets.push({
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
        })
    })

    chartlinhas.update()
}