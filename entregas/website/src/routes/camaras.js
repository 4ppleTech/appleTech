var express = require("express");
var router = express.Router();

var camaraController = require("../controllers/camaraController");

router.get("/:empresaId", function (req, res) {
  camaraController.buscarCamarasPorEmpresa(req, res);
});

router.post("/cadastrar", function (req, res) {
  camaraController.cadastrar(req, res)
})

router.get("/risco", function (req, res) {
  camaraController.buscarCamaraEmRisco(req, res)
})

module.exports = router;