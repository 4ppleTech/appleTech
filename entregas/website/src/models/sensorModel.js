var database = require("../database/config");

function cadastrar(camara_id, modelo, data_instalacao, numero_sensor) {
  var instrucaoSql = 
  `INSERT INTO sensor (camara_id, modelo, data_instalacao, numero_sensor) 
    VALUES (${camara_id}, '${modelo}', '${data_instalacao}', '${numero_sensor}')`;

  return database.executar(instrucaoSql);
}

module.exports = {
  cadastrar
}