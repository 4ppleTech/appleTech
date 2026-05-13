var express = require("express");
var router = express.Router();

var avisoController = require("../controllers/avisoController");

router.get("/listar/:idEmpresa", function (req, res) {
    avisoController.listar(req, res);
});

router.get("/listar-ultimos/:idEmpresa", function (req, res) {
    avisoController.listarUltimosAlertas(req, res)    
})

module.exports = router;