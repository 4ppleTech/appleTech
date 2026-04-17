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
  var empresaId = req.body.empresaId;
  var observacao = req.body.observacao;
  var local_instalacao = req.body.local_instalacao;
  var apelido = req.body.apelido;
  var comprimento = req.body.comprimento;
  var largura = req.body.largura;
  var profundidade = req.body.profundidade;
  var qtd_macas = req.body.qtd_macas;
  
  if (empresaId == undefined) {
    res.status(400).send("empresaId está undefined!");
  } else if (observacao == undefined) {
    res.status(400).send("observacao está undefined!");
  } else if (local_instalacao == undefined) {
    res.status(400).send("local_instalacao está undefined!");
  } else if (apelido == undefined) {
    res.status(400).send("apelido está undefined!");
  } else if (comprimento == undefined) {
    res.status(400).send("comprimento está undefined!");
  } else if (largura == undefined) {
    res.status(400).send("largura está undefined!");
  } else if (profundidade == undefined) {
    res.status(400).send("profundidade está undefined!");
  } else if (qtd_macas == undefined) {
    res.status(400).send("qtd_macas está undefined!");
  } else {
    
    camaraModel.cadastrar(empresaId, observacao, local_instalacao, apelido, comprimento, largura, profundidade, qtd_macas)
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
  buscarCamarasPorEmpresa,
  cadastrar
}