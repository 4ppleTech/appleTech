
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

insert into camara (empresa_id, local_instalacao, observacao, situacao, volume, kg_macas, apelido) values
(1, 'Câmara 1 - Estoque', 'Produtos congelados', 'Ativo', 60 , 100, 'CO1'),
(1, 'Câmara 2 - Frios', null, 'Ativo', 39, 800, 'CO2'),
(2, 'Câmara RJ 1', 'Uso geral', 'Ativo', 72, 120, 'CO3'),
(3, 'Câmara MG 1', null, 'Inativo', 70, 90, 'CO4');

INSERT INTO sensor (camara_id, modelo, situacao, data_instalacao) VALUES
(1, 'MQ-2', 'Ativo', '2024-01-01'),
(1, 'MQ-2', 'Ativo', '2024-01-02'),
(2, 'MQ-2', 'Ativo', '2024-01-03'),
(3, 'MQ-2', 'Inativo', '2024-01-04');

insert into leitura (sensor_id, valor_leitura, data_hora) values 
(1, 1.4, '2024-05-10 10:00:00'),
(2, 1.5, '2024-05-10 10:01:00'),
(4, 0, '2024-05-10 10:02:00'),
(3, 1.6, '2024-05-10 10:03:00'), 
(1, 1.7, '2024-05-10 10:05:00'),
(2, 1.5, '2024-05-10 10:06:00'),
(4, 1.7, '2024-05-10 10:07:00'),
(3, 1.1, '2024-05-10 10:08:00');

INSERT INTO alerta (leitura_id, nivel, mensagem) VALUES
(1, 'Crítico', 'Nível de etileno está muito alto, passou de 1.5ppm'),
(2, 'Moderado', 'Nível de etileno está alcançando 1.5ppm'),
(3, 'Controlado', 'Nível de etileno longe do limite'),
(8, 'Crítico', 'Nível de etileno está muito alto, passou de 1.5ppm');