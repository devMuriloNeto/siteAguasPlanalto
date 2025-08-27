// Função para rolar suavemente para as seções
function scrollToSection(sectionId) {
    const section = document.querySelector(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth'
        });
    }
}

// Adicionar evento de clique para todos os links de navegação
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        scrollToSection(targetId);
    });
});

// Validação do formulário de contato
document.getElementById('form-contato').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Pegar os valores dos campos
    const nome = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const telefone = this.querySelector('input[type="tel"]').value;
    const mensagem = this.querySelector('textarea').value;
    
    // Validação simples
    if (!nome || !email || !mensagem) {
        alert('Por favor, preencha todos os campos obrigatórios (nome, email e mensagem)');
        return;
    }
    
    if (!email.includes('@') || !email.includes('.')) {
        alert('Por favor, digite um email válido');
        return;
    }
    
    // Simular envio do formulário
    alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
    
    // Limpar o formulário
    this.reset();
});

// Menu responsivo simples
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('show');
}

// Adicionar botão de menu mobile para telas pequenas
function setupMobileMenu() {
    if (window.innerWidth <= 768) {
        const navContainer = document.querySelector('.nav-container');
        const menuButton = document.createElement('button');
        menuButton.innerHTML = '☰';
        menuButton.className = 'menu-button';
        menuButton.onclick = toggleMenu;
        
        // Inserir o botão antes dos links de navegação
        navContainer.insertBefore(menuButton, navContainer.querySelector('.nav-links'));
        
        // Adicionar estilo para o menu mobile
        const style = document.createElement('style');
        style.textContent = `
            .menu-button {
                background: none;
                border: none;
                font-size: 24px;
                cursor: pointer;
                color: #0077be;
            }
            
            .nav-links {
                display: none;
                flex-direction: column;
                position: absolute;
                top: 70px;
                left: 0;
                right: 0;
                background: white;
                padding: 20px;
                box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            }
            
            .nav-links.show {
                display: flex;
            }
            
            .nav-links a {
                margin: 10px 0;
                padding: 10px;
                border-bottom: 1px solid #eee;
            }
        `;
        document.head.appendChild(style);
    }
}

// Executar quando a página carregar
window.addEventListener('load', function() {
    setupMobileMenu();
});

// Atualizar quando a janela for redimensionada
window.addEventListener('resize', setupMobileMenu);
