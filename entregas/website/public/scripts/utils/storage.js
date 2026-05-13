export const storage = {
    set: (key, value) => {
        const stringifiedValue = JSON.stringify(value);
        sessionStorage.setItem(key, stringifiedValue);
    },
    get: (key) => {
        const value = sessionStorage.getItem(key);
        if(value === null || value === undefined) return null;

        return JSON.parse(value);
    },
    remove: (key) => {
        sessionStorage.removeItem(key);
    },
    clear: () => {
        sessionStorage.clear();
    },
};

// USUÁRIO MOCKADOS (DEIXAR DESCOMENTAR PARA TESTES):
storage.set("APPLETECH_USER", {
    id: 1,
    empresaId: 1,
    codigo_ativacao: "1234ABCD",
    nome: "batatinha",
    email: "batatinha@sptech.school",
    senha: "Sptech#2026",
    papel_usuario: "administrador",
    situacao: "Ativo",
    camaras: [
        {
            id_camara: 1,
            empresa_id: 1,
            local_instalacao: 'asdasdasdasdasdasd',
            observacao: "asdasdasd",
            situacao: "Ativo",
            apelido: "C-01",
            volume: 45,
            kg_macas: 500
        }
    ]
});
