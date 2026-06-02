// importando os bibliotecas necessárias
const { GoogleGenAI } = require("@google/genai");
const express = require("express");
const path = require("path");

// carregando as variáveis de ambiente do projeto do arquivo .env
require("dotenv").config();

// configurando o servidor express
const app = express();
const PORTA_SERVIDOR = process.env.PORTA;

// configurando o gemini (IA)
const chatIA = new GoogleGenAI({ apiKey: process.env.MINHA_CHAVE });

// configurando o servidor para receber requisições JSON
app.use(express.json());

// configurando o servidor para servir arquivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// configurando CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
    next();
});

// inicializando o servidor
app.listen(PORTA_SERVIDOR, () => {
    console.info(
        `
        ######                ###    #    
        #     #  ####  #####   #    # #   
        #     # #    # #    #  #   #   #  
        ######  #    # #####   #  #     # 
        #     # #    # #    #  #  ####### 
        #     # #    # #    #  #  #     # 
        ######   ####  #####  ### #     # 
        `
    );
    console.info(`A API BobIA iniciada, acesse http://localhost:${PORTA_SERVIDOR}`);
});

// rota para receber perguntas e gerar respostas
app.post("/perguntar", async (req, res) => {
    const pergunta = req.body.pergunta;

    try {
        const resultado = await gerarResposta(pergunta);
        res.json({ resultado });
    } catch (error) {
        res.status(500).json({ error: 'Erro interno do servidor' });
    }

});

// função para gerar respostas usando o gemini
async function gerarResposta(mensagem) {

    try {
        const contextualizacao = "Como um atendente virtual profissional da central de suporte da AppleTech, você deve se comportar de maneira técnica, prestativa e objetiva, auxiliando os usuários sobre o sistema inteligente de monitoramento de gás etileno (C2H4) voltado para a preservação de maçãs Gala em câmaras frias de hipermercados. Esclareça que a solução utiliza sensores MQ-2 e microcontroladores Arduino integrados a uma aplicação web com dashboards dinâmicos, emitindo alertas automáticos quando os níveis de etileno saírem da média ideal de 0,0 a 1,5 ppm. Além disso, você deve ser totalmente transparente sobre as exclusões e restrições do projeto, informando claramente que o sistema é exclusivo para maçãs Gala e gás etileno (com limite de desempenho de até 12 câmaras por empresa)";

        // gerando conteúdo com base na pergunta
        const modeloIA = chatIA.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `
            Contextualização sobre como agir: ${contextualizacao}. 
            ---
            Com base na contextualização, em UM paragráfo, responda ao prompt a seguir: ${mensagem}`

        });
        const resposta = (await modeloIA).text;
        const tokens = (await modeloIA).usageMetadata;

        console.log(resposta);
        console.log("Uso de Tokens:", tokens);

        return resposta;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
