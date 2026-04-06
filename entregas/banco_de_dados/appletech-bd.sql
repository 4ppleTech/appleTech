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
	data_atualizacao datetime on update current_timestamp,
    
	primary key (id_endereco)
);

create table empresa(
	id_empresa 		int  auto_increment,
    endereco_id 	int, -- enderecoId seria uma foreign key que ligaria a empresa com a tabela endereço
    matriz_id 		int,
    
	razao_social 	varchar(150) not null unique,
	nome_fantasia 	varchar(150) not null,
	cnpj varchar(14) not null unique,
	telefone 		varchar(25),
    email 			varchar(255),
    
	data_criacao 	datetime default current_timestamp,
	data_atualizacao datetime on update current_timestamp,
    
    primary key(id_empresa),
    constraint fk_endereco foreign key (endereco_id) references endereco (id_endereco),
    constraint fk_matriz foreign key (matriz_id) references empresa (id_empresa)
);


create table usuario (
	id_usuario		int auto_increment,
	empresa_id		int not null, -- ?
    nome			varchar(60) not null,
    email			varchar(255) not null unique,
    telefone		varchar(25) not null unique,
    situacao		varchar(10) not null default 'Ativo',
    papel_usuario varchar(40) not null,
    
	data_criacao 	datetime default current_timestamp,
	data_atualizacao datetime on update current_timestamp,
    
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
    situacao			VARCHAR(10) not null default 'Ativo',
    
	data_criacao 		datetime default current_timestamp,
	data_atualizacao 	datetime on update current_timestamp,
    
	primary key (id_camara),
	constraint ckc_situacao check (situacao in ('Ativo', 'Inativo')),
	constraint fk_empresa_camara foreign key (empresa_id) references empresa(id_empresa)
);

create table sensor (
	id_sensor	int auto_increment,
	camara_id	int not null,
    
	modelo	varchar(60) not null,
	situacao	varchar(10) not null default 'Ativo',
	data_instalacao		date null,
    
	data_criacao datetime default current_timestamp,
	data_atualizacao datetime on update current_timestamp,
    
    
	primary key (id_sensor),
	constraint ck_sensor check(situacao in ('Ativo', 'Inativo')),
    constraint fk_camara_sensor foreign key (camara_id) references camara(id_camara)
);


-- //////////////////////////////////////////////////////////////

create table leitura (
	id	int primary key auto_increment,
	sensor_id int not null,
    
    valor_sensor float,
	data_hora datetime default current_timestamp,
    observacao varchar(255),
    
	data_criacao datetime default current_timestamp,
	data_atualizacao datetime on update current_timestamp,
    
    constraint fk_sensor_leitor foreign key (sensor_id) references sensor(id_sensor)
);

-- Popular tabelas 
insert into endereco (cep, numero, complemento, logradouro, bairro, cidade, estado, pais) values
('01001-000', '100', null, 'Praça da Sé', 'Sé', 'São Paulo', 'SP', 'Brasil'),
('20040-020', '200', 'Sala 101', 'Rua da Assembleia', 'Centro', 'Rio de Janeiro', 'RJ', 'Brasil'),
('30130-110', '300', null, 'Av. Afonso Pena', 'Centro', 'Belo Horizonte', 'MG', 'Brasil');

SELECT * from endereco;

insert into empresa (endereco_id, matriz_id, razao_social, nome_fantasia, cnpj, telefone, email) values
(1, null, 'Apple Tech Brasil LTDA', 'AppleTech', '12345678000101', '11999999999', 'contato@appletech.com'),
(2, 1, 'Apple Tech RJ LTDA', 'AppleTech RJ', '12345678000102', '21999999999', 'rj@appletech.com'),
(3, 1, 'Apple Tech MG LTDA', 'AppleTech MG', '12345678000103', '31999999999', 'mg@appletech.com');

insert into usuario (empresa_id, nome, email, telefone, situacao, papel_usuario) values
(1, 'João Silva', 'joao@apple.com', '11911111111', 'Ativo', 'administrador'),
(1, 'Maria Souza', 'maria@apple.com', '11922222222', 'Ativo', 'analista'),
(2, 'Carlos Lima', 'carlos@apple.com', '21933333333', 'Ativo', 'analista'),
(3, 'Ana Costa', 'ana@apple.com', '31944444444', 'Inativo', 'analista');

insert into camara (empresa_id, local_instalacao, observacao, situacao) values
(1, 'Câmara 1 - Estoque', 'Produtos congelados', 'Ativo'),
(1, 'Câmara 2 - Frios', null, 'Ativo'),
(2, 'Câmara RJ 1', 'Uso geral', 'Ativo'),
(3, 'Câmara MG 1', null, 'Inativo');

INSERT INTO sensor (camara_id, modelo, situacao, data_instalacao) VALUES
(1, 'MQ-2', 'Ativo', '2024-01-01'),
(1, 'MQ-2', 'Ativo', '2024-01-02'),
(2, 'MQ-2', 'Ativo', '2024-01-03'),
(3, 'MQ-2', 'Inativo', '2024-01-04');

insert into leitura (sensor_id, valor_sensor, data_hora) values 
(1, 90, '2024-05-10 10:00:00'),
(2, 90, '2024-05-10 10:01:00'),
(4, 0, '2024-05-10 10:02:00'),
(3, 90, '2024-05-10 10:03:00'), 
(1, 80, '2024-05-10 10:05:00'),
(2, 110, '2024-05-10 10:06:00'),
(4, 0, '2024-05-10 10:07:00'),
(3, 110, '2024-05-10 10:08:00');

-- Fazer joins

SELECT * from leitura;


-- Verificar a leitura dos sensores ativos da razão social Apple Tech Brasil LTDA, junto com a data da leitura e o local da câmara
SELECT 
	e.nome_fantasia 'nome fantasia',
    e.razao_social 'Razão social',
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
	valor_sensor,
    CASE
		WHEN ((valor_sensor - 100) / (900)) * 100 > 0 
			THEN CONCAT(ROUND(((valor_sensor - 100) / (900)) * 100, 2), '%')
		ELSE
			0
	END AS porcentagem
FROM
	leitura
ORDER BY data_hora;


-- Média etileno
SELECT 
	e.nome_fantasia 'nome fantasia',
    e.razao_social 'Razão social',
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
ORDER BY c.local_instalacao;


