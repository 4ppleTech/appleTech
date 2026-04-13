function alternarVisibilidadeCamara(chamberId) {
    const chamber = document.querySelector(`.chamber[data-chamber-id=${chamberId}]`);
    const chevronIcon = document.querySelector(`.chamber[data-chamber-id=${chamberId}] .chamber-toggler i`);

    const id = chamber.dataset.chamberId;
    const chamberStatus = chamber.dataset.chamberCard;

    if(chamberStatus === "open") {
        chamber.dataset.chamberCard = "closed";

        chevronIcon.classList.replace("fa-chevron-up", "fa-chevron-down")
    } else {
        chamber.dataset.chamberCard = "open";
        chevronIcon.classList.replace("fa-chevron-down", "fa-chevron-up")
    }
}