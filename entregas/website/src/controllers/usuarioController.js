var usuarioModel = require("../models/usuarioModel");
var camaraModel = require("../models/camaraModel");

function autenticar(req, res) {
    console.log(req)
    var email = req.body.email;
    var senha = req.body.senha;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);

                        camaraModel.buscarCamarasPorEmpresa(resultadoAutenticar[0].empresaId)
                            .then((resultadoCamaras) => {
                                if (resultadoCamaras.length > 0) {
                                    res.json({
                                        id: resultadoAutenticar[0].empresaId,
                                        email: resultadoAutenticar[0].email,
                                        nome: resultadoAutenticar[0].nome,
                                        senha: resultadoAutenticar[0].senha,
                                        camaras: resultadoCamaras,
                                        papel_usuario: resultadoAutenticar[0].papel_usuario,
                                        situacao: resultadoAutenticar[0].situacao,
                                        empresaId: resultadoAutenticar[0].empresaId
                                    });
                                } else {
                                    res.status(204).json({ camaras: [] });
                                }
                            })
                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    var nome = req.body.nome;
    var email = req.body.email;
    var senha = req.body.senha;
    var empresaId = req.body.id_empresa;

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (empresaId == undefined) {
        res.status(400).send("Sua empresa a vincular está undefined!");
    } else {

        usuarioModel.cadastrar(nome, email, senha, empresaId)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function buscarEmpresaPorUsuario(req, res) {
    var id_empresa = req.params.id_empresa;

    if (id_empresa == undefined) {
        res.status(400).send("Empresa id não encontrado");
    } else {
        usuarioModel.buscarEmpresaPorUsuario(id_empresa)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao buscar por empresa! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function atualizarPapelUsuario(req, res) {
    var id_usuario = req.params.id_usuario
    var papel_usuario = req.body.papel_usuario


    if (id_usuario == undefined) {
        res.status(400).send("Id do usuário está undefined!");
    } else if (papel_usuario == undefined) {
        res.status(400).send("Papel do usuário está undefined!");
    } else {
        usuarioModel.atualizarPapelUsuario(id_usuario, papel_usuario)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao buscar por empresa! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    autenticar,
    cadastrar,
    buscarEmpresaPorUsuario,
    atualizarPapelUsuario
}