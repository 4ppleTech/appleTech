drop database if exists appletech;
create database if not exists appletech;

use appletech;

create table endereco(
	id_endereco int auto_increment,
    
	cep char(9) not null unique,
	numero varchar(20) not null,
	complemento varchar(45),
	logradouro varchar(150) not null, -- Rua, avenida, Estrada, travesa e etc
	bairro varchar(150) not null,
	cidade varchar(150) not null,
	estado char(2) not null,
	pais varchar(150) not null,
    
	data_criacao datetime default current_timestamp,
	data_atualizacao datetime default current_timestamp on update current_timestamp,
    
	primary key (id_endereco)
);

create table empresa(
	id_empresa 		int  auto_increment,
    endereco_id 	int, 
    matriz_id 		int,
    codigo_ativacao VARCHAR(15) NOT NULL UNIQUE,
    
	razao_social 	varchar(150) not null unique,
	nome_fantasia 	varchar(150) not null,
	cnpj varchar(14) not null unique,
	preco_kg		DECIMAL(10, 2) DEFAULT 13.5,
	
    
	data_criacao 	datetime default current_timestamp,
	data_atualizacao datetime default current_timestamp on update current_timestamp,
    
    primary key(id_empresa),
    constraint fk_endereco foreign key (endereco_id) references endereco (id_endereco),
    constraint fk_matriz foreign key (matriz_id) references empresa (id_empresa)
);


create table usuario (
	id_usuario		int auto_increment,
	empresa_id		int not null,
    nome			varchar(60) not null,
    email			varchar(255) not null unique,
    situacao		varchar(10) not null default 'Ativo',
    papel_usuario varchar(40) not null default 'analista',
    senha 			varchar(100) not null,
    
	data_criacao 	datetime default current_timestamp,
	data_atualizacao datetime default current_timestamp on update current_timestamp,
    
	primary key (id_usuario),
	constraint ck_cliente check(situacao in ('Ativo', 'Inativo')),
    constraint fk_empresa_usuario foreign key (empresa_id) references empresa (id_empresa),
	constraint ck_papel_usuario check (papel_usuario IN ('administrador', 'analista'))
);


-- Uma empresa pode ter vários usuários e um usuário pode ter várias empresas
-- O que significa ?
-- Um analista pode verificar a empresa x e a y
-- A empresa x pode ter mais de um analista
create table camara (
	id_camara 			int auto_increment,
    empresa_id 			int not null,
    
    local_instalacao	varchar(100) not null, -- Camara número 1, camara ala leste
    observacao	 		varchar(255),
    situacao			varchar(10) not null default 'Ativo',
    apelido 			varchar(100),
    
    -- calculos futuros
    volume decimal(10, 3),
    kg_macas			INT,
    
	data_criacao 		datetime default current_timestamp,
	data_atualizacao 	datetime default current_timestamp on update current_timestamp,
    
	primary key (id_camara),
	constraint ckc_situacao check (situacao in ('Ativo', 'Inativo')),
	constraint fk_empresa_camara foreign key (empresa_id) references empresa(id_empresa)
);

create table sensor (
	id_sensor	int auto_increment,
    numero_sensor varchar(255) unique,
	camara_id	int not null,
    
	modelo	varchar(60) not null,
	situacao	varchar(10) not null default 'Ativo',
	data_instalacao		date null,
    
	data_criacao datetime default current_timestamp,
	data_atualizacao datetime default current_timestamp on update current_timestamp,
    
    
	primary key (id_sensor),
	constraint ck_sensor check(situacao in ('Ativo', 'Inativo')),
    constraint fk_camara_sensor foreign key (camara_id) references camara(id_camara)
);


-- //////////////////////////////////////////////////////////////

create table leitura (
	id_leitura	int primary key auto_increment,
	sensor_id int not null,
    
    valor_leitura float,
	data_hora datetime default current_timestamp,
    
	data_criacao datetime default current_timestamp,
	data_atualizacao datetime default current_timestamp on update current_timestamp,
    
    constraint fk_sensor_leitor foreign key (sensor_id) references sensor(id_sensor)
);

create table alerta (
    id_alerta int auto_increment primary key,
    leitura_id int not null,
    
    nivel varchar(20) not null, 
    mensagem varchar(255),
    
    data_alerta datetime default current_timestamp,
    
	data_criacao datetime default current_timestamp,
	data_atualizacao datetime default current_timestamp on update current_timestamp,
    
    constraint ckc_nivel check (nivel in ('Crítico', 'Moderado', 'Controlado')),
    constraint fk_alerta_leitura foreign key (leitura_id) references leitura(id_leitura)
);

-- Popular tabelas 
insert into endereco (cep, numero, complemento, logradouro, bairro, cidade, estado, pais) values
('01001-000', '100', null, 'Praça da Sé', 'Sé', 'São Paulo', 'SP', 'Brasil'),
('20040-020', '200', 'Sala 101', 'Rua da Assembleia', 'Centro', 'Rio de Janeiro', 'RJ', 'Brasil'),
('30130-110', '300', null, 'Av. Afonso Pena', 'Centro', 'Belo Horizonte', 'MG', 'Brasil');

SELECT * from endereco;

insert into empresa (endereco_id, matriz_id, codigo_ativacao, razao_social, nome_fantasia, cnpj) values
(1, null, 'A1B2C3', 'Apple Tech Brasil LTDA', 'AppleTech', '12345678000101'),
(2, 1, 'ED145B', 'Apple Tech RJ LTDA', 'AppleTech RJ', '12345678000102'),
(3, 1, 'AZ235D', 'Apple Tech MG LTDA', 'AppleTech MG', '12345678000103');

insert into usuario (empresa_id, nome, email, situacao, papel_usuario, senha) values
(1, 'João Silva', 'joao@apple.com', 'Ativo', 'administrador', '123456'),
(1, 'Maria Souza', 'maria@apple.com', 'Ativo', 'analista', '123456'),
(2, 'Carlos Lima', 'carlos@apple.com', 'Ativo', 'analista', '123456'),
(3, 'Ana Costa', 'ana@apple.com', 'Inativo', 'analista', '123456');

INSERT INTO camara (id_camara, empresa_id, local_instalacao, situacao, volume, kg_macas, apelido) VALUES
(1, 1, 'Câmara ao lado do frigorífico.', 'Ativo', 48, 500, 'C-01'),
(2, 1, 'Câmara recém-instalada', 'Ativo', 48, 500, 'C-02'),
(3, 1, 'Câmara ala Leste', 'Ativo', 48, 54, 'C-03'), 
(4, 1, 'Câmara ao lado do frigorífico', 'Ativo', 48, 200, 'C-04'),
(5, 1, 'Câmara ala Oeste', 'Ativo', 48, 100, 'C-05');

INSERT INTO sensor (id_sensor, camara_id, numero_sensor, modelo, situacao, data_instalacao) VALUES
(1, 1, 'SN-001', 'MQ-2', 'Ativo', '2024-01-01'),
(2, 2, 'SN-002', 'MQ-2', 'Ativo', '2024-01-01'),
(3, 3, 'SN-003', 'MQ-2', 'Ativo', '2024-01-01'),
(4, 4, 'SN-004', 'MQ-2', 'Ativo', '2024-01-01'),
(5, 5, 'SN-005', 'MQ-2', 'Ativo', '2024-01-01');

INSERT INTO leitura (id_leitura, sensor_id, valor_leitura, data_hora) VALUES
(1, 5, 1.5, NOW() - INTERVAL 30 DAY),
(2, 5, 1.7, NOW() - INTERVAL 7 DAY),
(3, 5, 1.8, NOW() - INTERVAL 5 HOUR),
(4, 5, 2.0, NOW() - INTERVAL 1 HOUR); 

INSERT INTO leitura (id_leitura, sensor_id, valor_leitura, data_hora) VALUES
(5, 3, 1.2, NOW() - INTERVAL 7 DAY),
(6, 3, 1.5, NOW() - INTERVAL 2 HOUR),
(7, 3, 1.7, NOW() - INTERVAL 30 MINUTE);


INSERT INTO leitura (id_leitura, sensor_id, valor_leitura, data_hora) VALUES
(8, 1, 1.0, NOW() - INTERVAL 10 MINUTE),
(9, 2, 0.9, NOW() - INTERVAL 15 MINUTE),
(10, 4, 1.1, NOW() - INTERVAL 20 MINUTE);

INSERT INTO alerta (leitura_id, nivel, mensagem) VALUES
(4, 'Crítico', 'Nível de etileno atingiu 2.0ppm na ala Oeste'),
(7, 'Moderado', 'Nível de etileno em 1.7ppm na ala Leste'),
(8, 'Controlado', 'Nível normal'),
(9, 'Controlado', 'Nível normal'),
(10, 'Controlado', 'Nível normal');

use appletech;
-- TELA DASHBOARD INICIAL --
-- ------------------------------ --
-- VIEW DE TODOS OS KPIS --

CREATE OR REPLACE VIEW vw_kpis_totais AS
SELECT 
    e.id_empresa,
    e.preco_kg,
    -- subquery pro primeiro kpi, pegando quantas camaras em alerta e o total geral (deixei especificado as camaras em outra view)
      (SELECT COUNT(DISTINCT c1.id_camara)
     FROM camara c1
     JOIN sensor s1 ON s1.camara_id = c1.id_camara
     JOIN leitura l1 ON l1.sensor_id = s1.id_sensor
     WHERE c1.empresa_id = e.id_empresa 
       AND l1.valor_leitura > 1.5
       AND l1.id_leitura = (
           SELECT MAX(id_leitura) 
           FROM leitura 
           WHERE sensor_id = s1.id_sensor
       )
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
         WHERE c6.empresa_id = e.id_empresa
         AND (select l7.valor_leitura from leitura l7 where l7.sensor_id = s6.id_sensor order by l7.data_hora desc limit 1) > 1.5
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
JOIN leitura l ON l.id_leitura = (
    SELECT MAX(id_leitura) 
    FROM leitura 
    WHERE sensor_id = s.id_sensor
)
WHERE l.valor_leitura > 1.5;

select * from vw_lista_camaras_risco;


-- VIEW DOS GRÁFICOS --
 CREATE OR REPLACE VIEW vw_grafico_etileno_sensor AS
    SELECT 
    e.id_empresa,
    c.apelido as nome_camara,
    s.numero_sensor ,
    l.valor_leitura as nivel_etileno,
    l.data_hora
    FROM empresa e
    JOIN camara c ON e.id_empresa = c.empresa_id
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
    ORDER BY l.valor_leitura DESC;

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
    e.preco_kg AS preco_kg,

    -- subquery para etileno atual, usando limit 1 para isso
    (SELECT l.valor_leitura 
     FROM leitura l 
     JOIN sensor s ON l.sensor_id = s.id_sensor 
     WHERE s.camara_id = c.id_camara 
     ORDER BY l.data_hora DESC LIMIT 1
    ) AS etileno_atual,

    -- subquery para estoque em risco, se nao tiver um alerta nao tem nada em risco
    (SELECT CASE 
        WHEN a.nivel IN ('Crítico', 'Moderado') THEN TRUNCATE(c.kg_macas * (etileno_atual/10), 0) 
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
    e.nome_fantasia,
    e.razao_social,
    c.apelido,
    c.local_instalacao,
    l.valor_leitura,
    a.nivel,
    a.mensagem,
    a.data_alerta
FROM
    empresa e
JOIN camara c ON e.id_empresa = c.empresa_id
JOIN sensor s ON c.id_camara = s.camara_id
JOIN leitura l ON s.id_sensor = l.sensor_id
JOIN alerta a ON l.id_leitura = a.leitura_id
WHERE 
    a.id_alerta IN (
        SELECT MIN(a2.id_alerta)
        FROM alerta a2
        JOIN leitura l2 ON a2.leitura_id = l2.id_leitura
        JOIN sensor s2 ON l2.sensor_id = s2.id_sensor
        GROUP BY s2.camara_id, a2.nivel, DATE(a2.data_alerta), HOUR(a2.data_alerta)
    )
ORDER BY l.data_hora;


CREATE OR REPLACE VIEW vw_maior_pico_geral AS
SELECT 
	s.numero_sensor AS 'numero_sensor',
	c.apelido AS 'nome_camara',
	MAX(l.valor_leitura) AS 'nivel_etileno',
	e.id_empresa
FROM
	empresa e
JOIN camara c ON e.id_empresa = c.empresa_id
JOIN sensor s ON c.id_camara = s.camara_id
JOIN leitura l ON l.sensor_id = s.id_sensor
WHERE
	DATE(l.data_hora) = DATE(NOW())
GROUP BY 
	c.apelido, s.numero_sensor, id_empresa;