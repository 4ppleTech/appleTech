var sensorModel = require("../models/sensorModel")

function cadastrar(req, res) {
  var camaraId = req.body.camaraIdServer;
  var modelo = req.body.modeloServer;
  var data_instalacao = req.body.dataInstalacaoServer;
  var numero_sensor = req.body.numeroSensorServer
  
  if (camaraId == undefined) {
    res.status(400).send("camaraId está undefined!");
  } else if (modelo == undefined) {
    res.status(400).send("modelo está undefined!");
  } else if (data_instalacao == undefined) {
    res.status(400).send("data_instalacao está undefined!");
  } else if (numero_sensor == undefined) {
    res.status(400).send("numero_sensor está undefined!");
  } else {
    
    sensorModel.cadastrar(camaraId, modelo, data_instalacao, numero_sensor)
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

  function atualizarSensor(req,res){
  var numero_sensor = req.body.numero_sensor
  var modelo = req.body.modelo
  var situacao = req.body.situacao
  var id_sensor = req.body.id_sensor

   if (numero_sensor == undefined) {
    res.status(400).send("numero_sensor está undefined!");
  } else if (modelo == undefined) {
    res.status(400).send("modelo está undefined!");
  } else if (situacao == undefined) {
    res.status(400).send("situacao está undefined!");
  } else if(id_sensor == undefined){
    res.status(400).send("id_sensor está undefined")
  } else {
    sensorModel.atualizarSensor(numero_sensor, modelo, situacao, id_sensor)
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
module.exports = {
    cadastrar,
    atualizarSensor
}