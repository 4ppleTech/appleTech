create database Appletech;
use Appletech;

create table empresa (
id int primary key auto_increment,
nome varchar(50) not null,
CNPJ char(14) not null unique,
email varchar(30) not null
);

create table usuario (
id	int primary key auto_increment,
nome varchar(50) not null,
email varchar(50) not null unique,
senha varchar(30) not null,
fk_empresa int,
	constraint fkEmpresa foreign key (fk_empresa)
		references empresa (id)
);

create table sensor (
id	int primary key auto_increment,
fk_sensor_empresa int,
	constraint fkSensorEmpresa foreign key (fk_sensor_empresa)
		references empresa (id)
);

create table leituraSensor (
id	int primary key auto_increment,
fk_sensor int,
	constraint fkSensor foreign key (fk_sensor)
		references sensor (id),
fk_leitura_empresa int, 
	constraint fkLeituraEmpresa foreign key (fk_leitura_empresa)
		references empresa (id),
leitura_gas float,
hora_captura timestamp default current_timestamp
);