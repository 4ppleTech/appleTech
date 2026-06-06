// importa os bibliotecas necessários
const serialport = require('serialport');
const express = require('express');
const mysql = require('mysql2');
const path = require("path");

// constantes para configurações
const SERIAL_BAUD_RATE = 9600;
const SERVIDOR_PORTA = 3300;

// habilita ou desabilita a inserção de dados no banco de dados
const HABILITAR_OPERACAO_INSERIR = true;

// função para comunicação serial
const serial = async (
    // valoresPercentualGas,
    valoresValorGas,
) => {

    // conexão com o banco de dados MySQL
    let poolBancoDados = mysql.createPool(
        {
            host: '10.18.32.13',
            user: 'user_insert',
            password: 'Sptech#2026',
            database: 'appletech',
            port: 3307
        }
    ).promise();

    // lista as portas seriais disponíveis e procura pelo Arduino
    const portas = await serialport.SerialPort.list();
    const portaArduino = portas.find((porta) => porta.vendorId == 2341 && porta.productId == 43);
    if (!portaArduino) {
        throw new Error('O arduino não foi encontrado em nenhuma porta serial');
    }

    // configura a porta serial com o baud rate especificado
    const arduino = new serialport.SerialPort(
        {
            path: portaArduino.path,
            baudRate: SERIAL_BAUD_RATE
        }
    );

    // evento quando a porta serial é aberta
    arduino.on('open', () => {
        console.log(`A leitura do arduino foi iniciada na porta ${portaArduino.path} utilizando Baud Rate de ${SERIAL_BAUD_RATE}`);
    });

    // processa os dados recebidos do Arduino
    arduino.pipe(new serialport.ReadlineParser({ delimiter: '\r\n' })).on('data', async (data) => {
        console.log(data);
        const valorGas = parseFloat(data);

        // armazena os valores dos sensores nos arrays correspondentes
        valoresValorGas.push(valorGas);

        // insere os dados no banco de dados (se habilitado)
        if (HABILITAR_OPERACAO_INSERIR) {
            await Promise.all([
                // 1° Câmara Sensores
                inserirValor(gerarVariacao(valorGas, 0.2), 1),
                inserirValor(gerarVariacao(valorGas, -0.2), 6),
                inserirValor(gerarVariacao(valorGas, 0.4), 7),
                inserirValor(gerarVariacao(valorGas, 0.5), 8),
                inserirValor(gerarVariacao(valorGas, -0.2), 9),
                
                // 2° Câmara Sensores
                inserirValor(gerarVariacao(valorGas, 0.2), 2),
                inserirValor(gerarVariacao(valorGas, 0.6), 10),

                // 3° Câmara Sensores
                // inserirValor(gerarVariacao(valorGas, 0.2), 3),

                // 4° Câmara Sensores
                // inserirValor(gerarVariacao(valorGas, 0.2), 4),

                // 5° Câmara Sensores
                // inserirValor(gerarVariacao(valorGas, 0.2), 5)
            ]);
        }
    });

    // evento para lidar com erros na comunicação serial
    arduino.on('error', (mensagem) => {
        console.error(`Erro no arduino (Mensagem: ${mensagem}`)
    });

    const inserirValor = async (valor, sensorId) => {
        const [rows] = await poolBancoDados.execute('INSERT INTO leitura(valor_leitura, sensor_id) VALUES (?, ?)', [valor, sensorId]);

        if(valor >= 1.5) {
            const id = rows.insertId;
            const alertLevel = valor >= 1.8 
                ? "Crítico" 
                : "Moderado";

            const message = valor >= 1.8 
                ? "Nível de etileno está maior ou igual a 1.8ppm" 
                : "Nível de etileno está maior ou igual a 1.5ppm";

            await poolBancoDados.execute('INSERT INTO alerta(leitura_id, nivel, mensagem) VALUES (?, ?, ?)', [id, alertLevel, message]);
        }
    }
}

// função para criar e configurar o servidor web
const servidor = (
    valoresValorGas
) => {
    const app = express();
    app.use(express.static(path.join(__dirname, "public")));

    // configurações de requisição e resposta
    app.use((request, response, next) => {
        response.header('Access-Control-Allow-Origin', '*');
        response.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
        next();
    });

    // inicia o servidor na porta especificada
    app.listen(SERVIDOR_PORTA, () => {
        console.log(`API executada com sucesso na porta ${SERVIDOR_PORTA}`);
    });

    // define os endpoints da API para cada tipo de sensor
    app.get('/sensores/valor', (_, response) => {
        return response.json(valoresValorGas);
    });
}

// função principal assíncrona para iniciar a comunicação serial e o servidor web
(async () => {
    // arrays para armazenar os valores dos sensores
    const valoresValorGas = [];

    // inicia a comunicação serial
    await serial(
        valoresValorGas
    );

    // inicia o servidor web
    servidor(
        valoresValorGas
    );
})();

function gerarVariacao(valorGas, intensidade) {
    let valorGasFinal = valorGas;

    // Permite gerar oscilações negativas (50% de chance)
    let negativar = Math.random() >= 0.5;

    valorGasFinal += Math.random() * intensidade * (negativar ? -1 : 1);

    // Garante valor no intervalo 0.0 - 2.0
    valorGasFinal = Math.max(0, Math.min(2, valorGasFinal));
    return Number(valorGasFinal.toFixed(2));
}