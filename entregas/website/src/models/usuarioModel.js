var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `
        SELECT 
            id_usuario, 
            nome, 
            email, 
            empresa_id as empresaId,
            papel_usuario,
            situacao 
        FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrar(nome, email, senha, empresaId) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha, empresaId);

    var instrucaoSql = `
        INSERT INTO usuario (nome, email, senha, empresa_id) VALUES ('${nome}', '${email}', '${senha}', ${empresaId});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarEmpresaPorUsuario(id_empresa) {
    var instrucaoSql = `
    SELECT 
	u.nome,
    u.papel_usuario,
    u.email
    FROM 
        usuario u
    JOIN empresa e ON u.empresa_id = e.id_empresa
    WHERE e.id_empresa = ${id_empresa};
    `

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function atualizarPapelUsuario(id_usuario, papel_usuario) {
    var instrucaoSql = `
    UPDATE usuario
    SET papel_usuario = '${papel_usuario}'
    WHERE id_usuario = ${id_usuario};
    `

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarUsuarioPorId(id_usuario) {
    var instrucaoSql = `
    SELECT nome, papel_usuario 
    FROM usuario
    WHERE id_usuario = ${id_usuario};
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    autenticar,
    cadastrar,
    buscarEmpresaPorUsuario,
    atualizarPapelUsuario,
    listarUsuarioPorId
};