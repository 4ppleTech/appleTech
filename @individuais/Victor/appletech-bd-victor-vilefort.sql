create database appletech;
use appletech;

create table hipermercado(
    id int primary key auto_increment,
    nome varchar(60) not null,
    CNPJ char(14) unique,
    telefone varchar(20),
    email varchar(100)
);

create table usuarios(
    id int primary key auto_increment,
    fkhipermercado int,
    nome varchar(45),
    login varchar(100),
    senha varchar(100),
    foreign key (fkhipermercado) references hipermercado(id)
);

create table sensor(
    id int primary key auto_increment,
    fkhipermercado int,
    foreign key (fkhipermercado) references hipermercado(id)
);

create table leituraSensor(
    id int primary key auto_increment,
    fksensor int,
    fkhipermercado int,
    percentualGas float,
    momentoCaptacao timestamp default current_timestamp,
    foreign key (fksensor) references sensor(id),
    foreign key (fkhipermercado) references hipermercado(id)
);