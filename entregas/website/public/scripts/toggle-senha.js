function alternarVisibilidadeSenha(inputId, iconId) {
    const ipt = document.getElementById(inputId);
    const icon = document.getElementById(iconId);

    if(ipt.type === "password") {
        ipt.type = "text";
        icon.classList.replace("fa-eye", "fa-eye-slash");
    } else {
        ipt.type = "password";
        icon.classList.replace("fa-eye-slash", "fa-eye");
    }
}