import {storage} from "./utils/storage.js";

export function carregarInfoSidebar() {
    const userData = storage.get("APPLETECH_USER");
    if(!userData) {
        console.warn("[load-sidebar] Aviso: Não foi possível carregar informações do usuário.");
        return;
    }

    document.getElementById("account-username").innerHTML = userData.nome;
    document.getElementById("account-role").innerHTML = userData.papel_usuario;
}