// Validar EMAIL
function emailValido(email){
    // verifica se o email é valido
    const regex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
    return regex.test(email) ? true : false;
}

// Validar NOME DE USUÁRIO
function usernameValido(username){
    // verifica se o nome possui ao menos 3 caracteres
    console.log(username.length)
    return String(username).length >= 3 ? true : false;
}

// Validar SENHA
function senhaValido(senha){
    /* verifica se a senha possui ao menos 
        - 6 caracteres;
        - 1 caracter MAIÚSCULO; 
        - 1 caracter MINÚSCULO; 
        - 1 caracter ESPECIAL; 
    */ 
    const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[^\w\s]).{6,}$/;
    return regex.test(senha) ? true : false;
}

// Validar CONFIRMAR SENHA
function confirmarSenhaValido(senha, confirmarSenha){
    // verifica se "senha" e "confirmarSenha" coincidem
    return senha === confirmarSenha ? true : false;
}

// Validar CADASTRO
function cadastroValido(codEmpresa, username, email, senha, senhaConfirmar){
    let erros = [];
    if(!codEmpresa || !username || !email | !senha | !senhaConfirmar) {
        erros.push("Preencha todos os campos antes de continuar.");
    }

    if(!usernameValido(username)) {
        erros.push("Nome de Usuário deve possuir ao menos 3 caracteres.");
    }

    if(!emailValido(email)) {
        erros.push("O e-mail inserido não é válido.");
    }

    if(!senhaValido(senha) || !senhaValido(senhaConfirmar)) {
        erros.push("Senha deve possuir no mínimo 6 caracteres; \n1 maiúsculo; \n1 minúsculo; \n1 especial;");
    }
    
    if(!confirmarSenhaValido(senha, senhaConfirmar)) {
        erros.push("As senhas digitadas não coincidem.");
    }

    // retorna vetor [true/false, erros/null] para validar e exibir na tela
    if(erros.length > 0) {
        return [false, erros];        
    }

    return [true, null];
}

// Validar LOGIN
function loginValido(email, senha){
    let erros = [];

    if(!emailValido(email)) {
        erros.push("O e-mail inserido não é válido.");
    }

    if(!senhaValido(senha)) {
        erros.push("Senha deve possuir no mínimo 6 caracteres; \n1 maiúsculo; \n1 minúsculo; \n1 especial;");
    }

    if(erros.length > 0) {
        return [false, erros];        
    }

    return [true, null];
}