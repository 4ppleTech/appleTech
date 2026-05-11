
-- camaras em risco --

CREATE OR REPLACE VIEW vw_camaras_em_risco AS
SELECT 
    e.nome_fantasia AS 'nome fantasia',
    e.razao_social AS 'Razão social',
    c.apelido AS 'Apelido',
    c.local_instalacao AS 'Local da câmara',
    s.modelo AS 'Modelo do sensor',
    CASE 
        WHEN l.valor_leitura > 1.5 THEN 'Câmara em risco'
        ELSE 'Câmara em controle'
    END AS 'câmaras em risco',
    c.kg_macas AS 'Quantidade de maçãs',
    l.data_hora AS 'Data da leitura'
FROM
    empresa e
JOIN camara c ON e.id_empresa = c.empresa_id
JOIN sensor s ON c.id_camara = s.camara_id
JOIN leitura l ON s.id_sensor = l.sensor_id
WHERE
    s.situacao = 'Ativo'
AND
    e.razao_social = 'Apple Tech Brasil LTDA'
AND
    l.data_hora LIKE CONCAT('%','2024-05-10','%')
AND 
    l.valor_leitura > 1.5
ORDER BY l.data_hora;


-- pico do etileno no geral --
CREATE OR REPLACE VIEW vw_maior_pico_geral AS
SELECT 
    e.nome_fantasia AS 'nome fantasia',
    e.razao_social AS 'Razão social',
    c.apelido AS 'Apelido',
    c.local_instalacao AS 'Local da câmara',
    s.modelo AS 'Modelo do sensor',
    l.valor_leitura AS 'Pico Máximo Global',
    CASE 
        WHEN l.valor_leitura > 1.5 THEN 'Câmara em risco'
        ELSE 'Câmara em controle'
    END AS 'status_risco',
    c.kg_macas AS 'Quantidade de maçãs',
    l.data_hora AS 'Data da leitura'
FROM
    empresa e
JOIN camara c ON e.id_empresa = c.empresa_id
JOIN sensor s ON c.id_camara = s.camara_id
JOIN leitura l ON s.id_sensor = l.sensor_id
WHERE
    s.situacao = 'Ativo'
AND
    e.razao_social = 'Apple Tech Brasil LTDA'
AND
    l.data_hora LIKE CONCAT('%','2024-05-10','%')
ORDER BY 
    l.valor_leitura DESC
LIMIT 1;


-- pico etileno por camara --
CREATE OR REPLACE VIEW vw_pico_etileno_camaras AS
SELECT 
    e.nome_fantasia AS 'nome fantasia',
    e.razao_social AS 'Razão social',
    c.apelido AS 'Apelido',
    c.local_instalacao AS 'Local da câmara',
    s.modelo AS 'Modelo do sensor',
    MAX(l.valor_leitura) AS 'Pico de Etileno',
    CASE 
        WHEN MAX(l.valor_leitura) > 1.5 THEN 'Câmara em risco'
        ELSE 'Câmara em controle'
    END AS 'status_risco',
    c.kg_macas AS 'Quantidade de maçãs',
    MAX(l.data_hora) AS 'Data ultima leitura' 
FROM
    empresa e
JOIN camara c ON e.id_empresa = c.empresa_id
JOIN sensor s ON c.id_camara = s.camara_id
JOIN leitura l ON s.id_sensor = l.sensor_id
WHERE
    s.situacao = 'Ativo'
AND
    e.razao_social = 'Apple Tech Brasil LTDA'
AND
    l.data_hora LIKE CONCAT('%','2024-05-10','%')
GROUP BY 
    e.nome_fantasia, 
    e.razao_social, 
    c.apelido, 
    c.local_instalacao, 
    s.modelo, 
    c.kg_macas
HAVING 
    `Pico de Etileno` > 1.5
ORDER BY 
    `Data ultima leitura`;
    

-- estoque e receita em risco --
CREATE OR REPLACE VIEW vw_estoque_receita_risco AS
SELECT 
    e.razao_social,
    e.nome_fantasia,
    c.apelido AS 'Apelido',
    c.local_instalacao AS 'Local da câmara',
    l.valor_leitura AS 'Etileno',
    CONCAT(ROUND(c.kg_macas * (l.valor_leitura / 10), 2), 'kg') AS 'Estoque em risco',
    CONCAT('R$', ROUND((c.kg_macas * (l.valor_leitura / 10)) * 13.50, 2)) AS 'Receita em risco',
    l.data_hora AS 'Data e hora'
FROM
    empresa e
JOIN camara c ON e.id_empresa = c.empresa_id
JOIN sensor s ON c.id_camara = s.camara_id
JOIN leitura l ON s.id_sensor = l.sensor_id
WHERE
    s.situacao = 'Ativo'
AND
    e.razao_social = 'Apple Tech Brasil LTDA'
AND
    l.data_hora LIKE CONCAT('%', '2024-05-10', '%')
AND
    l.valor_leitura > 1.5
ORDER BY l.valor_leitura DESC;



-- view para tela das camaras individuais
CREATE OR REPLACE VIEW vw_dashboard_camaras AS
SELECT 
    c.apelido AS 'Câmara',
    s.situacao AS 'Status',
    CASE 
        WHEN l.valor_leitura > 1.5 THEN 'Em risco'
        ELSE 'Sob controle'
    END AS 'Situação',
    -- abaixo fiz a logica de diferença de tempo pra mostrar a ultima leitura de forma adequada 
    CASE 
        WHEN TIMESTAMPDIFF(MINUTE, l.data_hora, NOW()) < 60 THEN CONCAT(TIMESTAMPDIFF(MINUTE, l.data_hora, NOW()), ' min atrás')
        WHEN TIMESTAMPDIFF(HOUR, l.data_hora, NOW()) < 24 THEN CONCAT(TIMESTAMPDIFF(HOUR, l.data_hora, NOW()), ' horas atrás')
        ELSE DATE_FORMAT(l.data_hora, '%d/%m %H:%i')
        -- o caso do else teria passado um dia inteiro
    END AS 'Última leitura',
    CONCAT(l.valor_leitura, ' ppm') AS 'Etileno atual',
    CONCAT(c.volume, ' m³') AS 'Volume câmara',
    CONCAT(c.kg_macas, 'kg') AS 'Estoque total', 
    CASE 
        WHEN l.valor_leitura > 1.5 THEN CONCAT(ROUND(c.kg_macas * (l.valor_leitura / 10), 2), 'kg')
        ELSE '0kg'
    END AS 'Estoque em risco',
    CASE 
        WHEN l.valor_leitura > 1.5 THEN CONCAT('R$', ROUND((c.kg_macas * (l.valor_leitura / 10)) * 13.50, 2))
        ELSE 'R$0,00'
    END AS 'Perda potencial'
FROM camara c
JOIN sensor s ON c.id_camara = s.camara_id
JOIN (
    SELECT sensor_id, valor_leitura, data_hora
    FROM leitura
    WHERE (sensor_id, data_hora) IN (
        SELECT sensor_id, MAX(data_hora)
        FROM leitura
        GROUP BY sensor_id
    )
) l ON s.id_sensor = l.sensor_id
WHERE s.situacao = 'Ativo'
ORDER BY c.apelido;

select * from vw_camaras_em_risco;


-- kpi camaras em risco igual o site
CREATE OR REPLACE VIEW vw_kpi_camaras_alerta AS
SELECT 
    CONCAT(
        SUM(
        CASE WHEN l.valor_leitura > 1.5
        THEN 1 
        ELSE 0 END), 
        ' de ', 
        COUNT(DISTINCT c.id_camara)
    ) AS 'Câmaras em alerta'
FROM camara c
JOIN sensor s ON c.id_camara = s.camara_id
JOIN (
    -- Subquery seguindo a mesma logica
    SELECT sensor_id, valor_leitura, data_hora
    FROM leitura
    WHERE (sensor_id, data_hora) IN (
        SELECT sensor_id, MAX(data_hora)
        FROM leitura
        GROUP BY sensor_id
    )
) l ON s.id_sensor = l.sensor_id
WHERE s.situacao = 'Ativo'
AND c.situacao = 'Ativo';

-- grafico dash falando etileno atual
CREATE OR REPLACE VIEW vw_grafico_etileno_atual AS
SELECT 
    c.apelido,
    l.valor_leitura as etileno_ppm
FROM camara c
JOIN sensor s ON c.id_camara = s.camara_id
JOIN (
    SELECT sensor_id, valor_leitura, data_hora
    FROM leitura
    WHERE (sensor_id, data_hora) IN (
        SELECT sensor_id, MAX(data_hora)
        FROM leitura
        GROUP BY sensor_id
    )
) l ON s.id_sensor = l.sensor_id
WHERE s.situacao = 'Ativo';

-- pico etileno por sensor
CREATE OR REPLACE VIEW vw_pico_etileno_sensor AS
SELECT 
    s.numero_sensor AS 'Sensor',
    c.apelido AS 'Câmara',
    MAX(l.valor_leitura) AS 'Pico 24h'
FROM sensor s
JOIN camara c ON s.camara_id = c.id_camara
JOIN leitura l ON s.id_sensor = l.sensor_id
-- filtra as ultimas 24 horas
WHERE TIMESTAMPDIFF(HOUR, l.data_hora, NOW()) <= 24
GROUP BY s.id_sensor;