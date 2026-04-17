const DADOS_CONTA_FICTICIA = {
    pfp: "../../assets/imgs/avatar-pfp.png",
    username: "John Doe",
    role: "Administrador"
}

document.addEventListener("DOMContentLoaded", () => {
    console.log(`mock-user.js: Carregando DADOS_CONTA_FICTICIA...`)
    const account_pfp = document.getElementById("account-pfp");
    const account_username = document.getElementById("account-username");
    const account_role = document.getElementById("account-role");

    account_pfp.src = DADOS_CONTA_FICTICIA.pfp;
    account_username.innerText = DADOS_CONTA_FICTICIA.username;
    account_role.innerText = DADOS_CONTA_FICTICIA.role;

    console.log(`mock-user.js: Carregado DADOS_CONTA_FICTICIA`)
})