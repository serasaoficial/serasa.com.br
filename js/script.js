var sideBar = document.querySelector('.sideBar');
var menuLateral = document.querySelector('.menuLateral');

function abrirMenu() {
    // Garante que a sideBar está visível antes de animar
    sideBar.style.display = "flex";
    menuLateral.style.transform = "translateX(0)";
}

function fecharMenu() {
    // Anima primeiro e esconde depois
    menuLateral.style.transform = "translateX(-100%)";
    // Espera a animação terminar antes de esconder completamente
    setTimeout(() => {
        sideBar.style.display = "none";
    }, 300); // Tempo da transição no CSS (0.3s = 300ms)
}
