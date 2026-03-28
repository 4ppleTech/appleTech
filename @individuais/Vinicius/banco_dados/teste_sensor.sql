CREATE DATABASE IF NOT EXISTS teste_sensor;

USE teste_sensor;

CREATE TABLE IF NOT EXISTS medida (
	id INT NOT NULL AUTO_INCREMENT,
    percentual_gas DECIMAL(3,2),
    valor_gas DECIMAL(3,2),
    
    PRIMARY KEY (id)
);