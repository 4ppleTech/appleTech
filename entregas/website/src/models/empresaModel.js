var database = require("../database/config");

function buscarPorId(id) {
  var instrucaoSql = `SELECT * FROM empresa WHERE id_empresa = '${id}'`;

  return database.executar(instrucaoSql);
}

function listar() {
  var instrucaoSql = `SELECT id_empresa as empresaId, razao_social, nome_fantasia, cnpj, codigo_ativacao FROM empresa`;

  return database.executar(instrucaoSql);
}

function buscarPorCnpj(cnpj) {
  var instrucaoSql = `SELECT * FROM empresa WHERE cnpj = '${cnpj}'`;

  return database.executar(instrucaoSql);
}

function cadastrar(nome_fantasia, razao_social, codigo_ativacao, enderecoId, matrizId, telefone, email, cnpj) {
  var instrucaoSql = 
  `INSERT INTO empresa (nome_fantasia, razao_social, codigo_ativacao, endereco_id, matriz_id, telefone, email, cnpj) 
    VALUES ('${nome_fantasia}', '${razao_social}', '${codigo_ativacao}', ${enderecoId}, ${matrizId}, '${telefone}', '${email}', '${cnpj}')`;

  return database.executar(instrucaoSql);
}

module.exports = { buscarPorCnpj, buscarPorId, cadastrar, listar };
