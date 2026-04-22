// id_usuario, nome, email, empresa_id as empresaId, papel_usuario

const DADOS_CONTA_FICTICIA = {
    id: 1,
    empresa_id: 1,
    codigo_ativacao: "1234ABCD",
    nome: "batatinha",
    email: "batatinha@sptech.school",
    senha: "Sptech#2026",
    papel_usuario: "administrador",
    situacao: "Ativo"
}

document.addEventListener("DOMContentLoaded", () => {
    console.log(`mock-user.js: Carregando DADOS_CONTA_FICTICIA...`)
    const account_username = document.getElementById("account-username");
    const account_role = document.getElementById("account-role");

    account_username.innerText = DADOS_CONTA_FICTICIA.nome;
    account_role.innerText = DADOS_CONTA_FICTICIA.papel_usuario;

    console.log(`mock-user.js: Carregado DADOS_CONTA_FICTICIA`)
})