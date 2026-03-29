CREATE USER appletech_user IDENTIFIED BY '';

GRANT select, index, update, insert ON appletech.* TO appletech_user;

FLUSH PRIVILEGES;