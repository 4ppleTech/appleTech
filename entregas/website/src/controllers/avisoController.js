var avisoModel = require("../models/avisoModel");

function listar(req, res) {
    var id_empresa = req.params.id_empresa

    if (id_empresa == undefined) {
        console.log("id_empresa está undefined")
    } else {
        avisoModel.listar(id_empresa).then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
    }
}

function listarUltimosAlertas(req, res) {
    var id_empresa = req.params.id_empresa

    if (id_empresa == undefined) {
        console.log("id_empresa está undefined")
    } else {
        avisoModel.listarUltimosAlertas(id_empresa).then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
    }
}



module.exports = {
    listar,
    listarUltimosAlertas
}