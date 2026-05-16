var express = require("express");
var router = express.Router();

var sensorController = require("../controllers/sensorController");

router.post("/cadastrar", function (req, res) {
  sensorController.cadastrar(req, res)
})

router.put("/atualizar/:id_sensor/:id_camara", function (req,res){
  sensorController.atualizarSensor(req,res)
})

router.get("/listar/:id_camara", function (req, res) {
  sensorController.listarSensorPorCamara(req, res) 
})

module.exports = router;