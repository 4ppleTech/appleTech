var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.get("/maior-etileno/:id_empresa", function (req, res) {
    medidaController.buscarMaiorPicoEtileno(req, res)
})

router.get("/buscar-kpis/:id_empresa", function (req, res) {
    medidaController.buscarKpisPrincipal(req, res)
})

router.get("/buscar-sensores-maior-pico/:id_empresa", function (req, res) {
    medidaController.buscarSensoresComMaiorPico(req, res)
})

router.get("/buscar-etileno-registro/:idEmpresa/:interval", function (req, res) {
    medidaController.buscarGraficoEtilenoRegistro(req, res)
})

router.get("/buscar-camara-individual/:id_camara/:interval", function (req, res) {
    medidaController.buscarCamaraIndividual(req, res)
})

router.get("/buscar-camara-risco/:id_camara", function (req, res) {
    medidaController.buscarCamaraEmRisco(req, res)
})

router.get("/buscar-detalhes-camaras/:id_camara", function (req, res) {
    medidaController.buscarDetalhesIndividuaisCamaras(req, res)
})

module.exports = router;