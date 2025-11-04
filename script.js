// Localiza o botão e o corpo da página
const themeToggle = document.getElementById('theme-toggle'); 
const body = document.body;

// 1. Função para aplicar o tema salvo (mantém a escolha do usuário)
function applyTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
    } else {
        body.classList.remove('dark-mode');
    }
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
    });
}