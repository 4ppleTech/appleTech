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
          for(let i = 0; i < alertas.length; i++){
            let local_camara = alertas[i].local_camara
            let apelido = alertas[i].apelido
            let mensagem =  alertas[i].mensagem
            let valor_leitura = alertas[i].valor_leitura
            let data_alerta = alertas[i].data_alerta
            let horario_alerta = new Date(data_alerta)
            
            const corAlerta = 
            valor_leitura > 2.0 ? "serious" : "caution"

            lista.innerHTML += `<div class="alert alert--${corAlerta}">
            <p class="alert-content">A <a href="chambers.html">${local_camara} (${apelido})</a> ${mensagem}.</p>
            <span class="alert-footer">
            ${horario_alerta.toLocaleDateString()} 
            ${horario_alerta.getHours().toString().padStart(2, '0')}:${horario_alerta.getMinutes().toString().padStart(2, '0')}</span>
            </div>`
        }})
    }

    