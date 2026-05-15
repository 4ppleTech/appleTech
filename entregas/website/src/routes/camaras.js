var express = require("express");
var router = express.Router();

var camaraController = require("../controllers/camaraController");

router.get("/etileno-individual", function (req, res) {
  camaraController.mostrarPicoPorCamara(req, res)
})

router.post("/cadastrar", function (req, res) {
  camaraController.cadastrar(req, res)
})

router.put("/atualizar/:idCamara", function (req, res) {
  camaraController.atualizarCamara(req, res)
})

router.get("/:empresaId", function (req, res) {
  camaraController.buscarCamarasPorEmpresa(req, res);
});




module.exports = router;