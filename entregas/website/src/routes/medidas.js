var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.get("/maior-etileno/:idEmpresa", function (req, res) {
    medidaController.buscarMaiorPicoEtileno(req, res)
})

router.get("/buscar-kpis/:idEmpresa", function (req, res) {
    medidaController.buscarKpisPrincipal(req, res)
})

router.get("/buscar-sensores-maior-pico/:idEmpresa", function (req, res) {
    medidaController.buscarSensoresComMaiorPico(req, res)
})

router.get("/buscar-etileno-registro/:idSensor/:interval", function (req, res) {
    medidaController.buscarGraficoEtilenoRegistro(req, res)
})

router.get("/buscar-camara-individual/:idCamara/:interval", function (req, res) {
    medidaController.buscarCamaraIndividual(req, res)
})

router.get("/buscar-camara-risco/:idCamara", function (req, res) {
    medidaController.buscarCamaraEmRisco(req, res)
})

module.exports = router;