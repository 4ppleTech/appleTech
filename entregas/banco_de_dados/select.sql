-- Fazer joins

-- Verificar a leitura dos sensores ativos da razão social Apple Tech Brasil LTDA, junto com a data da leitura e o local da câmara
SELECT 
	e.nome_fantasia 'nome fantasia',
    e.razao_social 'Razão social',
	c.apelido 'Apelido',
    c.local_instalacao 'Local da câmara',
    s.modelo 'Modelo do sensor',
    l.valor_sensor 'Valor captado',
    l.data_hora 'Data da leitura'
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
	l.data_hora LIKE '%2024-05-10%'
ORDER BY l.data_hora;
    
    
-- Verificar empresa matriz
SELECT
	e.nome_fantasia filial_nome,
    e.razao_social filial_razao,
    IFNULL(m.razao_social, 'Essa é a empresa matriz') matriz_razao
FROM
	empresa e
LEFT JOIN empresa m ON m.id_empresa = e.matriz_id;


-- Mostrar endereço das empresas 
SELECT
	en.cep,
    en.numero,
    en.logradouro,
    en.bairro,
    en.cidade,
    en.estado,
    en.pais,
    em.nome_fantasia,
    em.razao_social,
    em.cnpj
FROM
	endereco en
JOIN empresa em ON em.endereco_id = en.id_endereco;


-- porcentagem da leitura
SELECT 
	e.nome_fantasia 'nome fantasia',
    e.razao_social 'Razão social',
	c.apelido 'Apelido',
    c.local_instalacao 'Local da câmara',
    s.modelo 'Modelo do sensor',
    l.valor_sensor 'Valor captado',
        CASE
		WHEN ((l.valor_sensor - 100) / (1000)) * 100 > 0 
			THEN CONCAT(ROUND(((l.valor_sensor - 100) / (1000)) * 100, 2), '%')
		ELSE
			0
	END AS porcentagem,
    l.data_hora 'Data da leitura'
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
	l.data_hora LIKE '%2024-05-10%'
ORDER BY l.data_hora;

-- Média etileno
SELECT 
    e.razao_social,
    e.nome_fantasia,
	AVG(l.valor_sensor) media
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
	data_hora LIKE CONCAT('%','2024-05-10','%')
ORDER BY c.local_instalacao;

-- Status geral
SELECT 
    e.razao_social,
    e.nome_fantasia,
	CASE 
		WHEN AVG(l.valor_sensor) > 1.5 && AVG(l.valor_sensor) < 2.0 
			THEN 'Observação'
		WHEN AVG(l.valor_sensor) > 2.0 
			THEN 'Risco'
		ELSE 'Sob Controle'
	END AS 'Status Geral'
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
	YEAR(data_hora) = 2024
AND
	MONTH(data_hora) = 05
AND
	DAY(data_hora) = 10
ORDER BY c.local_instalacao;





-- SELECTS PARA AS KPI ABAIXO




-- Câmaras em risco
SELECT 
	e.nome_fantasia 'nome fantasia',
    e.razao_social 'Razão social',
	c.apelido 'Apelido',
    c.local_instalacao 'Local da câmara',
    s.modelo 'Modelo do sensor',
    CASE 
		WHEN l.valor_sensor > 1.5 THEN 'Câmara em risco'
        ELSE 'Câmara em controle'
    END AS 'câmaras em risco',
    c.qtd_macas 'Quantidade de maçãs',
    l.data_hora 'Data da leitura'
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
	l.valor_sensor > 1.5
ORDER BY l.data_hora;



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
	data_hora LIKE CONCAT('%','2024-05-10','%')
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
	data_hora LIKE CONCAT('%','2024-05-10','%')
AND
	l.valor_sensor > 1.5
ORDER BY l.valor_sensor DESC;



-- Sensor ativo
SELECT 
	e.nome_fantasia 'nome fantasia',
    e.razao_social 'Razão social',
    c.apelido 'Apelido',
    c.local_instalacao 'Local da câmara',
    s.modelo 'Modelo do sensor',
    s.situacao 'Situação'
FROM
	empresa e
JOIN camara c ON e.id_empresa = c.empresa_id
JOIN sensor s ON c.id_camara = s.camara_id
WHERE
	s.situacao = 'Ativo'
ORDER BY c.apelido;





-- Sensor inativo
SELECT 
	e.nome_fantasia 'nome fantasia',
    e.razao_social 'Razão social',
    c.apelido 'Apelido',
    c.local_instalacao 'Local da câmara',
    s.modelo 'Modelo do sensor',
    s.situacao 'Situação'
FROM
	empresa e
JOIN camara c ON e.id_empresa = c.empresa_id
JOIN sensor s ON c.id_camara = s.camara_id
WHERE
	s.situacao = 'Inativo'
ORDER BY c.apelido;




-- Todos alertas
SELECT 
	e.nome_fantasia 'nome fantasia',
    e.razao_social 'Razão social',
	c.apelido 'Apelido',
    c.local_instalacao 'Local da câmara',
    l.valor_sensor,
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


-- Últimos alertas
SELECT 
	e.nome_fantasia 'nome fantasia',
    e.razao_social 'Razão social',
	c.apelido 'Apelido',
    c.local_instalacao 'Local da câmara',
    l.valor_sensor,
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
ORDER BY a.data_criacao
LIMIT 3;
