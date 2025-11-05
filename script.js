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

/**
 * Função para alternar entre as abas de código (HTML, CSS, Java).
 */
function configurarTrocaDeAbas() {
    // 1. Seleciona todos os botões de aba (HTML, CSS, Java)
    const abas = document.querySelectorAll('.aba-item');

    abas.forEach(aba => {
        aba.addEventListener('click', function() {
            // Pega o ID do painel de código que esta aba deve mostrar (ex: 'codigo-css-1')
            const targetId = this.getAttribute('data-tab'); 

            // 2. Encontra o contêiner PAI (o 'projeto-visual' específico)
            // Isso garante que o clique na aba CSS do Projeto 1 só afete os códigos do Projeto 1.
            const containerPai = this.closest('.projeto-visual');
            if (!containerPai) return; // Sai se não encontrar o pai (segurança)

            // 3. Remove a classe 'active' de TODAS as abas e CONTEÚDOS do projeto atual
            containerPai.querySelectorAll('.aba-item').forEach(item => {
                item.classList.remove('active');
            });

            containerPai.querySelectorAll('.codigo-conteudo').forEach(content => {
                content.classList.remove('active');
            });

            // 4. Adiciona a classe 'active' à aba clicada (para estilização)
            this.classList.add('active');

            // 5. Adiciona a classe 'active' ao contêiner de código alvo (para visibilidade)
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

// 6. Chama a função assim que a página for totalmente carregada
document.addEventListener('DOMContentLoaded', configurarTrocaDeAbas);