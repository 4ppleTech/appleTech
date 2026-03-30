CREATE USER appletech_analista IDENTIFIED BY '';

GRANT select ON appletech.* TO appletech_user;

CREATE USER appletech_administrador IDENTIFIED BY '';

GRANT select, index, update, insert, delete ON appletech.* TO appletech_user;

FLUSH PRIVILEGES;