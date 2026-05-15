var camaraModel = require("../models/camaraModel");

function buscarCamarasPorEmpresa(req, res) {
  var empresaId = req.params.empresaId;

  camaraModel.buscarCamarasPorEmpresa(empresaId).then((resultado) => {
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


function cadastrar(req, res) {
  var empresaId = req.body.id_empresa;
  var observacao = req.body.observacao;
  var local_instalacao = req.body.local_instalacao;
  var apelido = req.body.apelido;
  var volume = req.body.volume;
  var kg_macas = req.body.kg_macas;

  if (empresaId == undefined) {
    res.status(400).send("empresaId está undefined!");
  } else if (observacao == undefined) {
    res.status(400).send("observacao está undefined!");
  } else if (local_instalacao == undefined) {
    res.status(400).send("local_instalacao está undefined!");
  } else if (apelido == undefined) {
    res.status(400).send("apelido está undefined!");
  } else if (volume == undefined) {
    res.status(400).send("profundidade está undefined!");
  } else if (kg_macas == undefined) {
    res.status(400).send("kg_macas está undefined!");
  } else {

    camaraModel.cadastrar(empresaId, observacao, local_instalacao, apelido, volume, kg_macas)
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

}

function atualizarCamara(req, res) {
  var apelido = req.body.apelido
  var volume = req.body.volume
  var kg_macas = req.body.kg_macas
  var situacao = req.body.situacao
  var idCamara = req.params.id_camara
  var observacao = req.body.observacao
  var local_instalacao = req.body.local_instalacao

  if (apelido == undefined) {
    res.status(400).send("apelido está undefined!");
  } else if (volume == undefined) {
    res.status(400).send("volume está undefined!");
  } else if (kg_macas == undefined) {
    res.status(400).send("kg_macas está undefined!")
  } else if (situacao == undefined) {
    res.status(400).send("situacao está undefined!")
  } else if (observacao == undefined) {
    res.status(400).send("observação está undefined!")
  } else if (local_instalacao == undefined) {
    res.status(400).send("local instalação está undefined!")
  } else if (idCamara == undefined) {
    res.status(400).send("id camara está undefined!")
  }

  camaraModel.atualizarCamara(apelido, volume, kg_macas, situacao, idCamara, local_instalacao, observacao)
    .then(
      function (resultado) {
        res.json(resultado);
      }
    ).catch(
      function (erro) {
        console.log(erro);
        console.log(
          "\nHouve um erro ao buscar por camara! Erro: ",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      }
    );
}


function mostrarPicoPorCamara(req, res) {
  camaraModel.mostrarPicoPorCamara()
    .then((resultado) => {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(204).json([]);
      }
    })
    .catch((erro) => {
      console.log("Houve um erro ao buscar os picos por camaras: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
  buscarCamarasPorEmpresa,
  cadastrar,
  buscarCamaraEmRisco,
  atualizarCamara,
  mostrarPicoPorCamara
}