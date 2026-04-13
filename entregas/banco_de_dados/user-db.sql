create database if not exists appletech;
use appletech;

-- vamos procurar PADRONIZAR as senhas, NÃO as altere!
create user user_insert identified by "Sptech#2026";
create user user_crud identified by "Sptech#2026";

/*
Caso você não tenha criado as tabelas, os comandos nas linhas 16 e 17 podem falhar.
Para evitar isso, rode todo o script SQL do banco original,
disponível em: https://github.com/4ppleTech/appleTech/blob/main/entregas/banco_de_dados/appletech-bd.sql

depois de rodar o script, certifique-se de que as tabelas foram criadas e, só então, tente
rodar os comandos das linhas 16 e 17.
*/
grant INSERT on appletech.leitura to user_insert;
grant INSERT, SELECT, UPDATE, DELETE on appletech.* to user_crud;

show grants for user_insert;		-- deve aparecer algo como: 'GRANT INSERT ON `appletech`.`leitura` TO `user_insert`@`%`'
show grants for user_crud;			-- deve aparecer algo como: 'GRANT SELECT, INSERT, UPDATE, DELETE ON `appletech`.* TO `user_crud`@`%`'

flush privileges; -- atualiza os privilegios na hora