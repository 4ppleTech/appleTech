create database if not exists appletechdb;
use appletechdb;

create table rede(
    id int auto_increment primary key,
    nome varchar(100) not null,
    cnpj char(14) unique
);

create table unidade(
    id int auto_increment primary key,
    id_rede int not null,
    id_matriz int null,
    nome varchar(45),
    cep char(8),
    rua varchar(100),
    numero int,
    bairro varchar(45),
    cidade varchar(45),
    estado char(2),
    constraint fk_unidade_rede foreign key (id_rede) references rede(id),
    constraint fk_unidade_matriz foreign key (id_matriz) references unidade(id)
);

create table usuario(
    id int auto_increment primary key,
    id_unidade int not null,
    nome varchar(45) not null,
    email varchar(45) not null unique,
    senha varchar(45) not null,
    telefone char(11) unique,
    constraint fk_usuario_unidade foreign key (id_unidade) references unidade(id)
);

create table camara(
    id int auto_increment primary key,
    id_unidade int not null,
    local varchar(45),
    observacao varchar(45),
    status varchar(10) default 'Ativo',
    constraint fk_camara_unidade foreign key (id_unidade) references unidade(id)
);

create table sensor(
    id int auto_increment primary key,
    id_camara int not null,
    modelo varchar(45),
    num_serie varchar(45) unique,
    status varchar(10) default 'Ativo',
    constraint fk_sensor_camara foreign key (id_camara) references camara(id)
);

create table leitura(
    id int auto_increment primary key,
    id_sensor int not null,
    valor decimal(10,2) not null,
    data_hora datetime default current_timestamp,
    constraint fk_leitura_sensor foreign key (id_sensor) references sensor(id)
);

