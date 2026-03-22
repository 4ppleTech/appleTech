create database appletech;

use appletech;

create table endereco(
	id_endereco int primary key auto_increment,
	cep char(9) not null unique,
	numero int not null,
	complemento varchar(45),
	logradouro varchar(150) not null,
	bairro varchar(150) not null,
	cidade varchar(150) not null,
	estado char(2) not null,
	pais varchar(150) not null,
	data_criacao datetime default current_timestamp,
	data_atualizacao datetime on update current_timestamp
);

create table empresa(
	id_empresa int primary key auto_increment,
	razao_social varchar(150) not null unique,
	nome_fantasia varchar(150) not null,
	cnpj varchar(14) not null unique,
	endereco_id int, -- enderecoId seria uma foreign key que ligaria a empresa com a tabela endereço
	contato varchar(16),
	data_criacao datetime default current_timestamp,
	data_atualizacao datetime on update current_timestamp,
    constraint fk_endereco foreign key (endereco_id) references endereco (id_endereco)
) auto_increment = 1000;


create table usuario (
	id_usuario		int primary key auto_increment,
    nome			varchar(60) not null,
    email			varchar(64) not null unique,
    telefone		char(11) not null unique,
    id_empresa		int not null, 
    situacao		varchar(10) not null default 'Ativo',
	data_criacao 	datetime default current_timestamp,
	data_atualizacao datetime on update current_timestamp,
    constraint ck_cliente check(situacao in ('Ativo', 'Inativo'))
);

create table empresa_usuario (
	id int primary key auto_increment,
    usuario_id int not null,
    empresa_id int not null,
	data_criacao datetime default current_timestamp,
	data_atualizacao datetime on update current_timestamp,
	constraint fk_empresa foreign key (empresa_id) references empresa (id_empresa),
    constraint fk_cliente foreign key (usuario_id) references usuario (id_usuario)
);

create table local_instalacao (
	id int primary key auto_increment,
    nome varchar(100)
);

create table sensor (
	id		int primary key auto_increment,
	id_empresa	int not null,
	modelo	varchar(60) not null,
	num_serie	varchar(60) not null unique,
	local_instalacao	varchar(60) not null,
	situacao	varchar(10) not null default 'Ativo',
	data_instalacao		datetime not null,
	data_criacao datetime default current_timestamp,
	data_atualizacao datetime on update current_timestamp,
	constraint ck_sensor check(situacao in ('Ativo', 'Inativo'))
);

create index ix_sensor on sensor(num_serie, local_instalacao);

-- //////////////////////////////////////////////////////////////

create table leitor (
	id	int primary key auto_increment,
	id_sensor int not null,
	ppb	int,
	data_hora datetime default current_timestamp,
	data_criacao datetime default current_timestamp,
	data_atualizacao datetime on update current_timestamp
);
insert into leitor (id_sensor, ppb, data_hora) 
values (1, 9, '2024-05-10 10:00:00'),
(2, 9, '2024-05-10 10:01:00'),
(4, null, '2024-05-10 10:02:00'),
(3, 90, '2024-05-10 10:03:00'), 
(1, 8, '2024-05-10 10:05:00'),
(2, 11, '2024-05-10 10:06:00'),
(4, null, '2024-05-10 10:07:00'),
(3, 110, '2024-05-10 10:08:00'),
(1, 7, '2024-05-10 10:10:00'),
(2, 13, '2024-05-10 10:11:00'),
(4, null, '2024-05-10 10:12:00'),
(3, 115, '2024-05-10 10:13:00'), 
(1, 6, '2024-05-10 10:15:00'),
(2, 11, '2024-05-10 10:16:00'),
(4, null, '2024-05-10 10:17:00'),
(3, 97, '2024-05-10 10:18:00'),
(1, 7, '2024-05-10 10:20:00'),
(2, 9, '2024-05-10 10:21:00'),
(4, null, '2024-05-10 10:22:00'),
(3, 101, '2024-05-10 10:23:00'), 
(1, 9, '2024-05-10 10:25:00'),
(2, 10, '2024-05-10 10:26:00'),
(4, null, '2024-05-10 10:27:00'),
(3, 108, '2024-05-10 10:28:00'); 

create index ix_leitor on leitor(valor, data_hora);
