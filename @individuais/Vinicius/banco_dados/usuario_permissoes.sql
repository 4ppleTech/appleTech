CREATE USER appletech_administrador IDENTIFIED BY '';

GRANT ALL PRIVILEGES ON appletech.* TO appletech_administrador;

CREATE USER appletech_user IDENTIFIED BY '';

GRANT select, index, update, insert, delete ON appletech.* TO appletech_user;

FLUSH PRIVILEGES;