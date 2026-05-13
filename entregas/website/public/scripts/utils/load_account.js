import { storage } from "./storage.js";

export function load_account() {
    const account_username = document.getElementById("account-username");
    const account_role = document.getElementById("account-role");

    const appletech_user = storage.get("APPLETECH_USER")
    account_username.innerText = appletech_user.nome;
    account_role.innerText = appletech_user.papel_usuario;
}

