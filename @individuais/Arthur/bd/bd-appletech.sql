CREATE DATABASE IF NOT EXISTS appletech;
USE appletech;

CREATE TABLE IF NOT EXISTS Endereco(
	id			INT 	NOT NULL AUTO_INCREMENT,
	cep			CHAR(8) NOT NULL,
    numero		INT 	NOT NULL,
    complemento VARCHAR(100),
        
    createdAt	DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt	DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
	PRIMARY KEY 	(id),
    INDEX idx_cep 	(cep)
);

CREATE TABLE IF NOT EXISTS Empresa(									-- debater a troca de 'Empresa' para 'Hipermercado'
	id				INT NOT NULL AUTO_INCREMENT,
    id_filial		INT,								-- garante hierarquia Matriz -> Filial
    id_endereco		INT NOT NULL,						-- relação N:1
    
    cnpj			CHAR(14) NOT NULL,					-- debater se é 'unique'
    razao_social	VARCHAR(100),
    nome_fantasia	VARCHAR(50),
    
    
		
    createdAt	DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt	DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
	PRIMARY KEY (id),
    CONSTRAINT fk_empresa_empresa FOREIGN KEY (id_filial) REFERENCES Empresa(id),
    CONSTRAINT fk_empresa_endereco FOREIGN KEY (id_endereco) REFERENCES Endereco(id)
);

CREATE TABLE IF NOT EXISTS Usuario(									-- debater a criação de uma coluna 'cargo'
	id				INT NOT NULL AUTO_INCREMENT,
    id_empresa		INT NOT NULL,						-- relação N:1
    
    nome			VARCHAR(60)		NOT NULL,
    email			VARCHAR(100) 	NOT NULL UNIQUE,
    senha			VARCHAR(100)	NOT NULL,
    telefone		CHAR(11)	 	NOT NULL UNIQUE, 
    
    createdAt	DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt	DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
	PRIMARY KEY (id),
    CONSTRAINT fk_usuario_empresa FOREIGN KEY (id_empresa) REFERENCES Empresa(id)
);

CREATE TABLE IF NOT EXISTS Camara(
	id 			INT 	NOT NULL AUTO_INCREMENT,
    status 		TINYINT NOT NULL DEFAULT 1,					-- 1 = 'Ativo' | 0 = 'Inativo'
    observacao 	VARCHAR(120),								-- Caso haja alguma observação a ser feita
    
	createdAt	DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt	DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS Sensor(										-- debater a criação de uma coluna dt_instalacao
	id 			INT NOT NULL AUTO_INCREMENT,
    id_camara 	INT NOT NULL,								 -- relação N:1 
    
	status 		TINYINT NOT NULL DEFAULT 1,					-- 1 = 'Ativo' | 0 = 'Inativo'
    
	createdAt	DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt	DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    PRIMARY KEY (id),
    CONSTRAINT fk_sensor_camara FOREIGN KEY (id_camara) REFERENCES Camara(id)
);

CREATE TABLE IF NOT EXISTS Leitura(
	id 			INT NOT NULL AUTO_INCREMENT,
    id_sensor 	INT NOT NULL,								-- relação N:1
    
    ppb			DECIMAL(10, 3) NOT NULL,
    observacao	VARCHAR(120),
    tipo		VARCHAR(7),
    
    createdAt	DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    PRIMARY KEY (id),
    CONSTRAINT fk_leitura_sensor FOREIGN KEY (id_sensor) REFERENCES Sensor(id),
    CONSTRAINT chk_leitura_tipo CHECK(tipo in('Leitura', 'Alerta'))
);

-- CREATE TABLE IF NOT EXISTS Alerta(
-- 	id 			INT NOT NULL AUTO_INCREMENT,
--     id_leitura 	INT NOT NULL,
--     
--     valor		DECIMAL(10,3) NOT NULL,
--     observacao 	VARCHAR(120) NOT NULL,
-- 	createdAt	DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
--     
--     PRIMARY KEY (id),
--     CONSTRAINT fk_alerta_leitura FOREIGN KEY (id_leitura) REFERENCES Leitura(id)
-- );