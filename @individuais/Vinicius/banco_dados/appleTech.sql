create database appletech;

use appletech;

create table endereco(
	id_endereco int auto_increment,
    
	cep char(9) not null unique,
	numero int not null,
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
    id_matriz 		int,
    
	razao_social 	varchar(150) not null unique,
	nome_fantasia 	varchar(150) not null,
	cnpj varchar(14) not null unique,
	contato 		varchar(16),
    
	data_criacao 	datetime default current_timestamp,
	data_atualizacao datetime on update current_timestamp,
    
    primary key(id_empresa),
    constraint fk_endereco foreign key (endereco_id) references endereco (id_endereco),
    constraint fk_matriz foreign key (id_matriz) references empresa (id_empresa)
);


create table usuario (
	id_usuario		int auto_increment,
	id_empresa		int not null, 
    nome			varchar(60) not null,
    email			varchar(64) not null unique,
    telefone		char(11) not null unique,
    situacao		varchar(10) not null default 'Ativo',
    
	data_criacao 	datetime default current_timestamp,
	data_atualizacao datetime on update current_timestamp,
    
	primary key (id_usuario),
	constraint ck_cliente check(situacao in ('Ativo', 'Inativo'))
);


-- Uma empresa pode ter vários usuários e um usuário pode ter várias empresas
-- O que significa ?
-- Um analista pode verificar a empresa x e a y
-- A empresa x pode ter mais de um analista

create table empresa_usuario (
    usuario_id 			int not null,
    empresa_id 			int not null,
    
	data_criacao 		datetime default current_timestamp,
	data_atualizacao 	datetime on update current_timestamp,
	
    primary key (usuario_id, empresa_id),
	constraint fk_empresa foreign key (empresa_id) references empresa (id_empresa),
    constraint fk_cliente foreign key (usuario_id) references usuario (id_usuario)
);

create table camara (
	id_camara 			int auto_increment,
    empresa_id 			int not null,
    
    local_instalacao	varchar(100) not null, -- Camara número 1, camara ala leste
    oberservacao 		varchar(255),
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
	num_serie	varchar(60) not null unique,
	situacao	varchar(10) not null default 'Ativo',
	data_instalacao		date null,
    
	data_criacao datetime default current_timestamp,
	data_atualizacao datetime on update current_timestamp,
    
    
	primary key (id_sensor),
	constraint ck_sensor check(situacao in ('Ativo', 'Inativo')),
    constraint fk_camara_sensor foreign key (camara_id) references camara(id_camara)
);


-- //////////////////////////////////////////////////////////////

create table leitor (
	id	int primary key auto_increment,
	sensor_id int not null,
    
	porcentagem	float,
    valor_sensor float,
	data_hora datetime default current_timestamp,
    
	data_criacao datetime default current_timestamp,
	data_atualizacao datetime on update current_timestamp,
    
    constraint fk_sensor_leitor foreign key (sensor_id) references sensor(id_sensor)
);



-- Popular tabelas 
insert into endereco (cep, numero, complemento, logradouro, bairro, cidade, estado, pais) values
('01001-000', 100, null, 'Praça da Sé', 'Sé', 'São Paulo', 'SP', 'Brasil'),
('20040-020', 200, 'Sala 101', 'Rua da Assembleia', 'Centro', 'Rio de Janeiro', 'RJ', 'Brasil'),
('30130-110', 300, null, 'Av. Afonso Pena', 'Centro', 'Belo Horizonte', 'MG', 'Brasil');

SELECT * from endereco;

insert into empresa (endereco_id, id_matriz, razao_social, nome_fantasia, cnpj, contato) values
(1, null, 'Apple Tech Brasil LTDA', 'AppleTech', '12345678000101', '11999999999'),
(2, 1, 'Apple Tech RJ LTDA', 'AppleTech RJ', '12345678000102', '21999999999'),
(3, 1, 'Apple Tech MG LTDA', 'AppleTech MG', '12345678000103', '31999999999');



insert into usuario (id_empresa, nome, email, telefone, situacao) values
(1, 'João Silva', 'joao@apple.com', '11911111111', 'Ativo'),
(1, 'Maria Souza', 'maria@apple.com', '11922222222', 'Ativo'),
(2, 'Carlos Lima', 'carlos@apple.com', '21933333333', 'Ativo'),
(3, 'Ana Costa', 'ana@apple.com', '31944444444', 'Inativo');

insert into empresa_usuario (usuario_id, empresa_id) values
(1, 1),
(1, 2),
(2, 1),
(3, 2),
(4, 3);

insert into camara (empresa_id, local_instalacao, oberservacao, situacao) values
(1, 'Câmara 1 - Estoque', 'Produtos congelados', 'Ativo'),
(1, 'Câmara 2 - Frios', null, 'Ativo'),
(2, 'Câmara RJ 1', 'Uso geral', 'Ativo'),
(3, 'Câmara MG 1', null, 'Inativo');

INSERT INTO sensor (camara_id, modelo, num_serie, situacao, data_instalacao) VALUES
(1, 'MQ-2', 'SN001', 'Ativo', '2024-01-01'),
(1, 'MQ-2', 'SN002', 'Ativo', '2024-01-02'),
(2, 'MQ-2', 'SN003', 'Ativo', '2024-01-03'),
(3, 'MQ-2', 'SN004', 'Inativo', '2024-01-04');

insert into leitor (sensor_id, valor_sensor, data_hora) values 
(1, 90, '2024-05-10 10:00:00'),
(2, 90, '2024-05-10 10:01:00'),
(4, 0, '2024-05-10 10:02:00'),
(3, 90, '2024-05-10 10:03:00'), 
(1, 80, '2024-05-10 10:05:00'),
(2, 110, '2024-05-10 10:06:00'),
(4, 0, '2024-05-10 10:07:00'),
(3, 110, '2024-05-10 10:08:00');


-- Fazer joins