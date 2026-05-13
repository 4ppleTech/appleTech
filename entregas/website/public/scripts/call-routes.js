async function registerChambers() {
    let localInstalacaoVar = ipt-local-instalacao.value
    let oberservacaoVar = ipt-observacao.value
    let apelidoVar = ipt-apelido.value
    let volumeVar = ipt-volume.value
    let kgMacaVar = ipt-kg-maca.value

    let response = await fetch("./camaras/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            localInstalacaoServer: localInstalacaoVar,
            oberservacaoServer: oberservacaoVar,
            apelidoServer: apelidoVar,
            volumeServer: volumeVar,
            kgMacaServer: kgMacaVar,
            idEmpresaServer: sessionStorage.ID_EMPRESA
        }),
    })

    let json = await response.json()

    if (!json) {
        console.log("ERRO")
    }
}