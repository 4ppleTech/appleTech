var database = require("../database/config");

function cadastrar(camara_id, modelo, data_instalacao, numero_sensor) {
  var instrucaoSql = 
  `INSERT INTO sensor (camara_id, modelo, data_instalacao, numero_sensor) 
    VALUES (${camara_id}, '${modelo}', '${data_instalacao}', '${numero_sensor}')`;

  return database.executar(instrucaoSql);
}

function atualizarSensor(numero_sensor, modelo, situacao, id_sensor){
    var instrucaoSql = `UPDATE sensor
    SET numero_sensor = '${numero_sensor}',
    modelo = '${modelo}',
    situacao = '${situacao}'  
    WHERE id_sensor = ${id_sensor}`
  
    return database.executar(instrucaoSql);
}

module.exports = {
  cadastrar,
  atualizarSensor
}