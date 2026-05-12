var database = require("../database/config");

// Aviso: no futuro, criar função update
function buscarCamarasPorEmpresa(empresaId) {

  var instrucaoSql = `SELECT * FROM camara WHERE empresa_id = ${empresaId}`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function cadastrar(empresaId, observacao, local_instalacao, apelido, volume, kg_macas) {
  var instrucaoSql = `INSERT INTO camara (empresa_id, local_instalacao, observacao, volume, kg_macas, apelido)  
  VALUES ('${empresaId}', '${local_instalacao}', '${observacao}', ${volume}, ${kg_macas}, '${apelido}')`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}


module.exports = {
  buscarCamarasPorEmpresa,
  cadastrar
}
