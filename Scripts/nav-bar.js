function nav_bar() {
    const navBar = document.querySelector('.nav-bar-hidden');
    const body = document.querySelector('body');
    const menuIcon = document.querySelector('.contein .center i');
    
    // Alterna entre exibir e ocultar a nav-bar
    if (navBar.style.display === 'flex') {
        close_nav(); // Se a nav-bar estiver visível, fecha
    } else {
        navBar.style.display = 'flex'; // Exibe a nav-bar
        body.style.overflow = 'hidden'; // Desativa a rolagem

        // Altera o ícone de hamburguer para "X"
        menuIcon.classList.remove('fa-bars');
        menuIcon.classList.add('fa-x');
    }
}

// Função para fechar a nav-bar clicando no ícone "X"
function close_nav() {
    const navBar = document.querySelector('.nav-bar-hidden');
    const body = document.querySelector('body');
    const menuIcon = document.querySelector('.contein .center i');

    navBar.style.display = 'none'; // Fecha o menu
    body.style.overflow = 'auto'; // Restaura a rolagem

    // Restaura o ícone de hamburguer
    menuIcon.classList.remove('fa-x');
    menuIcon.classList.add('fa-bars');
}

// Fechar a nav-bar ao clicar em um link do menu
const menuLinks = document.querySelectorAll('.nav-bar-hidden a');
menuLinks.forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault(); // Impede o comportamento padrão de navegação
        
        const targetId = this.getAttribute('href').substring(1); // Obtém o ID do link (removendo o #)
        const targetElement = document.getElementById(targetId); // Seleciona o elemento pelo ID
        
        // Rolagem suave para o elemento
        window.scrollTo({
            top: targetElement.offsetTop - 80, // Desloca 50px antes do ID
            behavior: 'smooth' // Adiciona efeito de rolagem suave
        });
        
        // Fechar o menu de navegação
        close_nav();
    });
});
