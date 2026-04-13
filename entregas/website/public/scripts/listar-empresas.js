function listarEmpresas(lista) {
    fetch("/empresas/listar", {
        method: "GET",
    })
    .then(function (resposta) {
        resposta.json().then((empresas) => {
            console.log("Códigos Válidos:")
            empresas.forEach((empresa) => {
                lista.push(empresa);
                console.log(empresa.codigo_ativacao)
            });
        });
    })
    .catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });
} 