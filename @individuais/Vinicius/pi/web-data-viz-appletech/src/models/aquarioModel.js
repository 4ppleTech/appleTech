var database = require("../database/config");

function buscarAquariosPorEmpresa(empresaId) {

  var instrucaoSql = `SELECT * FROM camara a WHERE empresa_id = ${empresaId}`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function cadastrar(empresaId, observacao) {
  
  var instrucaoSql = `INSERT INTO (observacao, empresa_id) camara VALUES (${observacao}, ${empresaId})`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}


module.exports = {
  buscarAquariosPorEmpresa,
  cadastrar
}
