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

function buscarCamaraEmRisco(situacao, id_empresa) {
  var instrucaoSql =
  `SELECT * FROM vw_kpi_camaras_alerta`
}

function atualizarCamara(apelido, volume, kg_macas, situacao, idCamara){
    var instrucaoSql = `
    UPDATE camara
    SET apelido = '${apelido}',
	  volume = ${volume},
    kg_macas = ${kg_macas},
    situacao = '${situacao}'
    WHERE id_camara = ${idCamara}`
    return database.executar(instrucaoSql)
}


module.exports = {
  buscarCamarasPorEmpresa,
  cadastrar,
  buscarCamaraEmRisco,
  atualizarCamara
}
