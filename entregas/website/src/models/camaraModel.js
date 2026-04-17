var database = require("../database/config");

function buscarCamarasPorEmpresa(empresaId) {

  var instrucaoSql = `SELECT * FROM camara WHERE empresa_id = ${empresaId}`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function cadastrar(empresaId, observacao, local_instalacao, apelido, comprimento, largura, profundidade, qtd_macas) {
  
  var instrucaoSql = `INSERT INTO (observacao, local_instalacao, apelido, comprimento, largura, profundidade, qtd_macas, empresa_id) camara 
  VALUES ('${observacao}', '${local_instalacao}', '${apelido}', ${comprimento}, ${largura}, ${profundidade}, ${qtd_macas}, ${empresaId})`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}


module.exports = {
  buscarCamarasPorEmpresa,
  cadastrar
}
