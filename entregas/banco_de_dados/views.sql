use appletech;
-- TELA DASHBOARD INICIAL --
-- ------------------------------ --
-- VIEW DE TODOS OS KPIS --

CREATE OR REPLACE VIEW vw_kpis_totais AS
SELECT 
    e.id_empresa,
    -- subquery pro primeiro kpi, pegando quantas camaras em alerta e o total geral (deixei especificado as camaras em outra view)
    (SELECT COUNT(DISTINCT c1.id_camara)
     FROM camara c1
     JOIN sensor s1 ON s1.camara_id = c1.id_camara
     JOIN leitura l1 ON l1.sensor_id = s1.id_sensor
     JOIN alerta a1 ON a1.leitura_id = l1.id_leitura
     WHERE c1.empresa_id = e.id_empresa 
       AND a1.nivel IN ('Crítico', 'Moderado')
    ) AS qtd_camaras_em_risco,
-- subquery para total de camaras
    (SELECT COUNT(id_camara) 
     FROM camara 
     WHERE empresa_id = e.id_empresa
    ) AS total_camaras_cadastradas,

    -- subquery pra pico etileno, maior valor entre todas as camaras nas ultimas 24 horas (usei interval 1 day pra isso)
    (SELECT l2.valor_leitura
     FROM leitura l2
     JOIN sensor s2 ON l2.sensor_id = s2.id_sensor
     JOIN camara c2 ON s2.camara_id = c2.id_camara
     WHERE c2.empresa_id = e.id_empresa 
       AND l2.data_hora >= NOW() - INTERVAL 1 DAY
     ORDER BY l2.valor_leitura DESC LIMIT 1
    ) AS valor_pico_24h,

    -- subquery pra qual o horario desse pico em específico

    (SELECT DATE_FORMAT(l_pico.data_hora, '%H:%i')
     FROM leitura l_pico
     JOIN sensor s_pico ON l_pico.sensor_id = s_pico.id_sensor
     JOIN camara c_pico ON s_pico.camara_id = c_pico.id_camara
     WHERE c_pico.empresa_id = e.id_empresa 
       AND l_pico.data_hora >= NOW() - INTERVAL 1 DAY
     ORDER BY l_pico.valor_leitura DESC LIMIT 1 
    ) AS horario_pico_24h,

    --  subquery pra qual sensor e qual camara registrou esse pico de etileno
    (SELECT s3.numero_sensor
     FROM leitura l3
     JOIN sensor s3 ON l3.sensor_id = s3.id_sensor
     JOIN camara c3 ON s3.camara_id = c3.id_camara
     WHERE c3.empresa_id = e.id_empresa 
       AND l3.data_hora >= NOW() - INTERVAL 1 DAY
     ORDER BY l3.valor_leitura DESC LIMIT 1
    ) AS sensor_pico,
-- camara que registrou esse pico
    (SELECT IFNULL(c4.apelido, c4.local_instalacao)
     FROM leitura l4
     JOIN sensor s4 ON l4.sensor_id = s4.id_sensor
     JOIN camara c4 ON s4.camara_id = c4.id_camara
     WHERE c4.empresa_id = e.id_empresa 
       AND l4.data_hora >= NOW() - INTERVAL 1 DAY
     ORDER BY l4.valor_leitura DESC LIMIT 1
    ) AS camara_pico,

    -- subquery para kpi de estoque e receita em risco
    (SELECT IFNULL(SUM(c5.kg_macas), 0)
     FROM camara c5
     WHERE c5.id_camara IN (
         SELECT DISTINCT c6.id_camara
         FROM camara c6
         JOIN sensor s6 ON s6.camara_id = c6.id_camara
         JOIN leitura l6 ON l6.sensor_id = s6.id_sensor
         JOIN alerta a6 ON a6.leitura_id = l6.id_leitura
         WHERE c6.empresa_id = e.id_empresa AND a6.nivel IN ('Crítico', 'Moderado')
     )
    ) AS total_estoque_risco_kg,
-- receita em risco 
    (SELECT IFNULL(SUM(c7.kg_macas), 0) * 13.50
     FROM camara c7
     WHERE c7.id_camara IN (
         SELECT DISTINCT c8.id_camara
         FROM camara c8
         JOIN sensor s8 ON s8.camara_id = c8.id_camara
         JOIN leitura l8 ON l8.sensor_id = s8.id_sensor
         JOIN alerta a8 ON a8.leitura_id = l8.id_leitura
         WHERE c8.empresa_id = e.id_empresa AND a8.nivel IN ('Crítico', 'Moderado')
     )
    ) AS total_receita_risco_valor,

    -- estoque geral
    (SELECT SUM(kg_macas) FROM camara WHERE empresa_id = e.id_empresa) AS total_estoque_geral,
    

    -- subquery pra ultima leitura, pegando o tempo mais recente de leitura
    (SELECT DATE_FORMAT(l9.data_hora, '%H:%i')
     FROM leitura l9
     JOIN sensor s9 ON l9.sensor_id = s9.id_sensor
     JOIN camara c9 ON s9.camara_id = c9.id_camara
     WHERE c9.empresa_id = e.id_empresa
     ORDER BY l9.data_hora DESC LIMIT 1
    ) AS horario_ultima_leitura

FROM empresa e;

select * FROM vw_kpis_totais;





-- outra view para especificar quais as camaras em risco
CREATE OR REPLACE VIEW vw_lista_camaras_risco AS
SELECT DISTINCT
    c.empresa_id,
    IFNULL(c.apelido, c.local_instalacao) AS nome_camara_risco
FROM camara c
JOIN sensor s ON s.camara_id = c.id_camara
JOIN leitura l ON l.sensor_id = s.id_sensor
JOIN alerta a ON a.leitura_id = l.id_leitura
WHERE a.nivel IN ('Crítico', 'Moderado');

select * from vw_lista_camaras_risco;


-- VIEW DOS GRÁFICOS --
CREATE OR REPLACE VIEW vw_grafico_etileno_sensor AS
SELECT 
    s.id_sensor, 
    e.id_empresa,
    s.numero_sensor,
    IFNULL(c.apelido, c.local_instalacao) AS nome_camara,
    l.valor_leitura AS nivel_etileno,
    DATE_FORMAT(l.data_hora, '%d/%m/%Y %H:%i:%s') AS momento_registro
FROM leitura l
JOIN sensor s ON l.sensor_id = s.id_sensor
JOIN camara c ON s.camara_id = c.id_camara
JOIN empresa e ON c.empresa_id = e.id_empresa
WHERE l.data_hora >= NOW() - INTERVAL 1 DAY
ORDER BY l.valor_leitura DESC, l.data_hora DESC
LIMIT 10;

select * from vw_grafico_etileno_sensor;

-- TELA CAMARAS INDIVIDUAIS --
-- -------------------------- --

-- camara individual --
CREATE OR REPLACE VIEW vw_detalhes_individuais_camaras AS
SELECT 
    e.id_empresa,
    c.id_camara,
    -- aqui se o apelido for nulo ele coloca o local de instalacao
    IFNULL(c.apelido, c.local_instalacao) AS nome_camara,
    c.volume AS volume_m3,
    c.kg_macas AS estoque_total_kg,
    
    -- subquery para etileno atual, usando limit 1 para isso
    (SELECT l.valor_leitura 
     FROM leitura l 
     JOIN sensor s ON l.sensor_id = s.id_sensor 
     WHERE s.camara_id = c.id_camara 
     ORDER BY l.data_hora DESC LIMIT 1
    ) AS etileno_atual,

    -- subquery para estoque em risco, se nao tiver um alerta nao tem nada em risco
    (SELECT CASE 
        WHEN a.nivel IN ('Crítico', 'Moderado') THEN c.kg_macas 
        ELSE 0 
     END
     FROM alerta a
     JOIN leitura l ON a.leitura_id = l.id_leitura
     JOIN sensor s ON l.sensor_id = s.id_sensor
     WHERE s.camara_id = c.id_camara
     ORDER BY l.data_hora DESC LIMIT 1
    ) AS estoque_em_risco_kg,
    
    -- subquery para ultima leitura, mudei o formato da data para melhorar o entendimento
    (SELECT DATE_FORMAT(MAX(data_hora), '%d/%m %H:%i') 
     FROM leitura l2 
     JOIN sensor s2 ON l2.sensor_id = s2.id_sensor 
     WHERE s2.camara_id = c.id_camara
    ) AS ultima_leitura

FROM camara c
JOIN empresa e ON c.empresa_id = e.id_empresa;

select * from vw_detalhes_individuais_camaras;


-- grafico camara individual --
 
    CREATE OR REPLACE VIEW vw_graficos_individuais_camaras AS
SELECT 
    e.id_empresa,
    c.id_camara,
    c.apelido,
    s.id_sensor,
    s.numero_sensor, 
    l.valor_leitura AS etileno,
    l.data_hora, 
    DATE_FORMAT(l.data_hora, '%d/%m %H:%i') AS data_formatada 
FROM leitura l
JOIN sensor s ON l.sensor_id = s.id_sensor
JOIN camara c ON s.camara_id = c.id_camara
JOIN empresa e ON c.empresa_id = e.id_empresa;

select * from vw_graficos_individuais_camaras;

-- SELECT etileno, data_formatada 
-- FROM vw_grafico_etileno 
-- WHERE id_sensor = ? 
-- AND data_hora >= NOW() - INTERVAL 1 ou 7 ou 30 DAY
-- ORDER BY data_hora ASC;

select * from vw_graficos_individuais_camaras where id_sensor = 1;

   -- todos os alertas
    CREATE OR REPLACE VIEW vw_alertas_geral AS
    SELECT 
		e.id_empresa,
        e.nome_fantasia 'nome_fantasia',
        e.razao_social 'razao_social',
        c.apelido 'apelido',
        c.local_instalacao 'local_camara',
        l.valor_leitura,
        a.nivel,
        a.mensagem
    FROM
        empresa e
    JOIN camara c ON e.id_empresa = c.empresa_id
    JOIN sensor s ON c.id_camara = s.camara_id
    JOIN leitura l ON s.id_sensor = l.sensor_id
    JOIN alerta a ON l.id_leitura = a.leitura_id
    WHERE
        s.situacao = 'Ativo'
    AND
        e.razao_social = 'Apple Tech Brasil LTDA'
    ORDER BY l.data_hora;
