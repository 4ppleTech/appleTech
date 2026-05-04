-- Pico de etileno em uma camara
SELECT 
    e.razao_social,
    e.nome_fantasia,
	c.apelido 'Apelido',
    c.local_instalacao 'Local da câmara',
    l.valor_sensor 'Pico de etileno',
    l.data_hora 'Data e hora'
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
	data_hora LIKE current_timestamp
ORDER BY l.valor_sensor DESC
LIMIT 1;

-- Estoque em risco e receita em risco
SELECT 
    e.razao_social,
    e.nome_fantasia,
	c.apelido 'Apelido',
    c.local_instalacao 'Local da câmara',
    l.valor_sensor 'Etileno',
    CONCAT(ROUND(c.qtd_macas * (l.valor_sensor / 10), 2), 'kg') 'Estoque em risco',
    CONCAT('R$', ROUND(c.qtd_macas * (l.valor_sensor / 10), 2) * 13.50) 'Receita em risco',
    l.data_hora 'Data e hora'
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
	data_hora LIKE '2024-05-10%'
AND
	l.valor_sensor > 1.5
ORDER BY l.valor_sensor DESC;