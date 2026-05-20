 import { storage } from "./utils/storage.js"

export function exibirAlerta(){  
    const appletech_user = storage.get("APPLETECH_USER")
    console.log(appletech_user)
    let empresaId = appletech_user.empresaId
    fetch(`/avisos/listar/${empresaId}`)
    .then((res)=>{
        if(res.ok){
            return res.json()
        } else {
            console.error("Não foi possível acessar os dados dos alertas")
        }
    }).then((alertas) => {
          let lista = document.querySelector(".alert-list")
          lista.innerHTML = ""
          console.log(alertas)
          for(let i = 0; i < alertas.length; i++){
            let local_camara = alertas[i].local_camara
            let apelido = alertas[i].apelido
            let mensagem =  alertas[i].mensagem
            let valor_leitura = alertas[i].valor_leitura

            const corAlerta = 
            valor_leitura > 2.0 ? "serious" : 
            valor_leitura >= 1.5 ? "caution" : "common"

            lista.innerHTML += `<div class="alert alert--${corAlerta}">
            <p class="alert-content">A <a href="chambers.html">${local_camara} (${apelido})</a> ${mensagem}.</p>
            <span class="alert-footer">há 1 minuto</span>
            </div>`
        }})
    }

    
