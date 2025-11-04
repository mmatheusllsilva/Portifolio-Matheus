// Localiza o botão e o corpo da página
const themeToggle = document.getElementById('theme-toggle'); 
const body = document.body;

// Função para ATUALIZAR o ícone com base no tema atual
function updateThemeToggleIcon() {
    // ESSENCIAL: Verifica se o botão existe antes de tentar alterar o innerHTML
    if (themeToggle) { 
        if (body.classList.contains('dark-mode')) {
            // Se estiver no Dark Mode (Fundo Escuro), mostre o Sol (para alternar para o Claro)
            themeToggle.innerHTML = '☀️'; 
        } else {
            // Se estiver no Light Mode (Fundo Claro), mostre a Lua (para alternar para o Escuro)
            themeToggle.innerHTML = '🌙';
        }
    }
}

// 1. Função para aplicar o tema salvo (mantém a escolha do usuário)
function applyTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
    } else {
        body.classList.remove('dark-mode');
    }
    
    // Atualiza o ícone ao carregar a página
    updateThemeToggleIcon(); // Chamada aqui
}

// Aplica o tema imediatamente ao carregar
applyTheme();

// 2. Adiciona o evento de clique no botão
if (themeToggle) { 
    themeToggle.addEventListener('click', () => {
        // Alterna a classe 'dark-mode' no <body>
        body.classList.toggle('dark-mode');
        
        // Salva a preferência
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }

        // Atualiza o ícone APÓS a troca de tema
        updateThemeToggleIcon();
    });
}