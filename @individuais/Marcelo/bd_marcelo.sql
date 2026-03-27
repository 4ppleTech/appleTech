create database AppleTech;
use AppleTech;

-- qual rede de hipermercado que é, exemplo: carrefour
create table rede_hipermercado( 
	id_rede int primary key auto_increment,
    nome_rede varchar(100),
    cnpj varchar(14) unique
);

create table unidade_hipermercado(
	id_unidade int primary key auto_increment,
    fk_rede int not null,
    cep varchar(8),
    logradouro varchar (100),
    id_unidade_pai int,
    constraint fk_rede foreign key (fk_rede) references rede_hipermercado (id_rede),
    constraint fk_unidade_pai  foreign key (id_unidade_pai) references unidade_hipermercado (id_unidade)
);

create table camaras (
	id_camara int primary key auto_increment,
    fk_loja int not null,
    setor varchar(50),
    constraint fk_loja foreign key (fk_loja) references unidade_hipermercado (id_unidade)
);

create table sensores (
	id_sensor int primary key auto_increment,
    fk_camara int not null,
    status_sensor varchar(50), 
    constraint status_sensor check (status_sensor in ("Ativo", "Inativo", "Manutenção")),
    constraint fk_camara foreign key (fk_camara) references camaras(id_camara),
    index idx_sensor (id_sensor)
);

create table leitura_etileno (
	id_leitura int primary key auto_increment,
    fk_sensor int not null,
    nivel_ppm int,
    data_hora datetime default current_timestamp,
    constraint fk_sensor foreign key (fk_sensor) references sensores (id_sensor),
    index idx_sensor (fk_sensor),
    index idx_tempo (data_hora)
);