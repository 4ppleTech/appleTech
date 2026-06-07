var database = require("../database/config");

function buscarMaiorPicoEtileno(id_empresa) {
    var instrucaoSql = `
    SELECT 
        * 
    FROM 
        vw_maior_pico_geral 
    WHERE id_empresa = ${id_empresa}
    ORDER BY nivel_etileno DESC
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarGraficoEtilenoRegistro(interval, idEmpresa) {
    var instrucaoSql = `
    SELECT etileno, data_hora, apelido
    FROM vw_graficos_individuais_camaras 
    WHERE id_empresa = ${idEmpresa} 
    AND data_hora >= NOW() - INTERVAL ${interval} DAY
    ORDER BY data_hora;
    `

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarSensoresComMaiorPico(idEmpresa) {
    var instrucaoSql = `
    SELECT * FROM vw_maior_pico_geral WHERE id_empresa = ${idEmpresa} ORDER BY nivel_etileno DESC;
    `

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarKpisPrincipal(idEmpresa) {
    var instrucaoSql = `
    SELECT 
    qtd_camaras_em_risco AS qtd_alerta, 
    total_camaras_cadastradas AS total_camaras, 
    valor_pico_24h AS valor_pico, 
    camara_pico, 
    total_estoque_risco_kg AS estoque_risco, 
    horario_ultima_leitura AS momento,
    horario_pico_24h as momento_pico,
    total_estoque_geral as estoque_geral,
    preco_kg
    FROM vw_kpis_totais 
    WHERE id_empresa = ${idEmpresa};
    `

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarCamaraIndividual(interval, idCamara) {
    var instrucaoSql = `
    SELECT *
    FROM vw_graficos_individuais_camaras 
    WHERE id_camara = ${idCamara} 
    AND data_hora >= NOW() - INTERVAL ${interval} DAY
    ORDER BY data_hora;
    `

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarCamaraEmRisco(id_empresa) {
    var instrucaoSql =
        `SELECT * 
    FROM vw_lista_camaras_risco 
    WHERE empresa_id = ${id_empresa};`
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarDetalhesIndividuaisCamaras(id_camara) {
    var instrucaoSql = `
    SELECT
        *
    FROM
        vw_detalhes_individuais_camaras
    WHERE id_camara = ${id_camara}
    `

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarMaiorPicoEtileno,
    buscarGraficoEtilenoRegistro,
    buscarSensoresComMaiorPico,
    buscarKpisPrincipal,
    buscarCamaraIndividual,
    buscarCamaraEmRisco,
    buscarDetalhesIndividuaisCamaras
}
