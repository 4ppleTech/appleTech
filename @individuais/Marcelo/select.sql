-- selects para dashboard home pro model --
-- --------------------------------------- --

-- KPIS --
-- 
SELECT 
qtd_camaras_em_risco AS qtd_alerta, 
total_camaras_cadastradas AS total_camaras, 
valor_pico_24h AS valor_pico, 
camara_pico, 
total_estoque_risco_kg AS estoque_risco, 
horario_ultima_leitura AS momento,
total_estoque_geral as estoque_geral
FROM vw_kpis_totais 
WHERE id_empresa = ${idEmpresa (aqui vai pegar do parametro)};

-- GRAFICO 1 --
SELECT 
id_sensor,
numero_sensor, 
nome_camara, 
nivel_etileno 
FROM vw_grafico_etileno_sensor 
WHERE id_empresa = ${idEmpresa}
LIMIT 10;

-- GRAFICO 2 --
SELECT etileno, data_formatada 
FROM vw_graficos_individuais_camaras 
WHERE id_sensor = ${idSensor} 
AND data_hora >= NOW() - INTERVAL ${intervalo(aqui vai ser o resultado de uma função para retornar o intervalo 24 horas 7 dias ou 30 dias)}
ORDER BY data_hora ASC;