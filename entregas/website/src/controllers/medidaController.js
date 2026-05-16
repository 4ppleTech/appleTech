var medidaModel = require("../models/medidaModel");

function buscarMaiorPicoEtileno(req, res) {
    var id_empresa = req.params.id_empresa

    if (id_empresa == undefined) {
        res.status(400).send("empresaId está undefined!");
    } else {
        medidaModel.buscarMaiorPicoEtileno(id_empresa)
            .then((resultado) => {
                res.status(201).json(resultado);
            }
            ).catch((erro) => {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o cadastro! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function buscarGraficoEtilenoRegistro(req, res) {
    var id_sensor = req.params.id_sensor
    var interval = req.params.interval

    if (id_sensor == undefined) {
        res.status(400).send("empresaId está undefined!");
    } else if (interval == undefined) {
        res.status(400).send("intervalo está undefined!");
    } {
        medidaModel.buscarGraficoEtilenoRegistro(interval, id_sensor)
            .then((resultado) => {
                res.status(201).json(resultado);
            }
            ).catch((erro) => {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o cadastro! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            });
    }
}


function buscarSensoresComMaiorPico(req, res) {
    var id_empresa = req.params.id_empresa

    if (id_empresa == undefined) {
        res.status(400).send("empresaId está undefined!");
    } else {
        medidaModel.buscarSensoresComMaiorPico(id_empresa)
            .then((resultado) => {
                res.status(201).json(resultado);
            }
            ).catch((erro) => {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o cadastro! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            });
    }
}


function buscarKpisPrincipal(req, res) {
    var id_empresa = req.params.id_empresa

    if (id_empresa == undefined) {
        res.status(400).send("empresaId está undefined!");
    } else {
        medidaModel.buscarKpisPrincipal(id_empresa)
            .then((resultado) => {
                res.status(201).json(resultado);
            }
            ).catch((erro) => {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o cadastro! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function buscarCamaraIndividual(req, res) {
    var id_camara = req.params.id_camara
    var interval = req.params.interval

    if (id_camara == undefined) {
        res.status(400).send("id camara está undefined!");
    } else if (interval == undefined) {
        res.status(400).send("interval está undefined!")
    } else {
        medidaModel.buscarCamaraIndividual(interval, id_camara)
            .then((resultado) => {
                res.status(201).json(resultado);
            }
            ).catch((erro) => {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o cadastro! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function buscarCamaraEmRisco(req, res) {
    var id_camara = req.params.id_camara

    if (id_camara == undefined) {
        res.status(400).send("id camara está undefined!");
    } else {
        medidaModel.buscarCamaraEmRisco(id_camara)
            .then((resultado) => {
                res.status(201).json(resultado);
            }
            ).catch((erro) => {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o cadastro! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function buscarDetalhesIndividuaisCamaras(req, res) {
    var id_camara = req.params.id_camara

    if (id_camara == undefined) {
        res.status(400).send("id camara está undefined!");
    }  else {
        medidaModel.buscarDetalhesIndividuaisCamaras(id_camara)
            .then((resultado) => {
                res.status(201).json(resultado[0]);
            }
            ).catch((erro) => {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o cadastro! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            });
    }
}

module.exports = {
    buscarMaiorPicoEtileno,
    buscarKpisPrincipal,
    buscarSensoresComMaiorPico,
    buscarGraficoEtilenoRegistro,
    buscarCamaraIndividual,
    buscarCamaraEmRisco,
    buscarDetalhesIndividuaisCamaras
}