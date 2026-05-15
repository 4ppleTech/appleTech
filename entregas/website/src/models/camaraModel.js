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

function atualizarCamara(apelido, volume, kg_macas, situacao, idCamara) {
  var instrucaoSql = `
    UPDATE camara
    SET apelido = '${apelido}',
	  volume = ${volume},
    kg_macas = ${kg_macas},
    situacao = '${situacao}'
    WHERE id_camara = ${idCamara}`
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql)

}

function mostrarPicoPorCamara() {
  var instrucaoSql = `
  SELECT 
  * 
  FROM vw_pico_etileno_camaras`
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql)
}

module.exports = {
  buscarCamarasPorEmpresa,
  cadastrar,
  atualizarCamara,
  mostrarPicoPorCamara
}
