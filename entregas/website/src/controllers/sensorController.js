var sensorModel = require("../models/sensorModel")

function cadastrar(req, res) {
  var camaraId = req.body.camara_id;
  var modelo = req.body.modelo;
  var data_instalacao = req.body.data_instalacao;
  var numero_sensor = req.body.numero_sensor

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
        sensorModel.listarSensorPorCamara(camaraId)
          .then((sensores) => {
            res.status(201).json(sensores)
          }).catch((error) => {
            res.status(400).json(error.sqlMessage)
          })
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

function atualizarSensor(req, res) {
  var camara_id = req.params.id_camara
  var numero_sensor = req.body.numero_sensor
  var modelo = req.body.modelo
  var situacao = req.body.situacao
  var id_sensor = req.params.id_sensor

  if (numero_sensor == undefined) {
    res.status(400).send("numero_sensor está undefined!");
  } else if (modelo == undefined) {
    res.status(400).send("modelo está undefined!");
  } else if (situacao == undefined) {
    res.status(400).send("situacao está undefined!");
  } else if (id_sensor == undefined) {
    res.status(400).send("id_sensor está undefined")
  } else if (camara_id == undefined) {
    res.status(400).send("camara_id está undefined")
  } else {
    sensorModel.atualizarSensor(numero_sensor, modelo, situacao, id_sensor, camara_id)
      .then((resultado) => {
        sensorModel.listarSensorPorCamara(camara_id)
          .then((sensores) => {
            res.status(201).json(sensores)
          }).catch((error) => {
            res.status(400).json(error.sqlMessage)
          })
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

function listarSensorPorCamara(req, res) {
  var camara_id = req.params.id_camara;

  sensorModel.listarSensorPorCamara(camara_id).then((resultado) => {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).json([]);
    }
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao buscar as camaras: ", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}
module.exports = {
  cadastrar,
  atualizarSensor,
  listarSensorPorCamara
}