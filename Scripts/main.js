document.getElementById('toggle').addEventListener('change', (e) => {
    document.body.classList.toggle('light-mode', e.target.checked);
});

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

const menuLinks = document.querySelectorAll('.nav-bar-hidden a');
menuLinks.forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();

        const targetId = this.getAttribute('href').substring(1); // Obtém o ID do link
        const targetElement = document.getElementById(targetId);

        // Rolagem suave para o elemento
        window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
        });

        close_nav();
    });
});

// Variável para armazenar o card aberto
let cardAberto = null;

// Função para mostrar o conteúdo oculto do card com lazy loading
function mostrar_oculto_content(button) {
    const card = button.closest('.card');
    const ocultoContent = card.querySelector('.oculto-content');
    const oculto = card.querySelector('.oculto');
    const cardsContainer = document.querySelector('.cards');

    // Fecha o card aberto anteriormente
    if (cardAberto !== null) {
        fechar_oculto_content(cardAberto.querySelector('.close-button'));
    }

    // Verifica se o conteúdo oculto ainda não foi carregado
    if (!ocultoContent.dataset.loaded) {
        carregarConteudoOculto(ocultoContent); // Carrega o conteúdo se necessário
        ocultoContent.dataset.loaded = 'true'; // Marca como carregado
    }

    // Exibe o conteúdo oculto
    ocultoContent.style.display = 'flex';
    ocultoContent.style.zIndex = '10000';
    oculto.style.zIndex = '9999';
    card.classList.add('no-hover');
    cardAberto = card;

    cardsContainer.classList.add('no-hover-all');

    document.querySelectorAll('.card').forEach(otherCard => {
        if (otherCard !== card) {
            otherCard.style.zIndex = '0';
            otherCard.classList.remove('no-hover');
        }
    });

    const cardsRect = cardsContainer.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const centerY = scrollTop + cardsRect.top + cardsRect.height / 2 - window.innerHeight / 2 - 30;

    window.scrollTo({
        top: centerY,
        behavior: 'smooth'
    });
}

// Função para carregar o conteúdo oculto do card
function carregarConteudoOculto(ocultoContent) {
    // Aqui, você pode carregar dinamicamente conteúdo como imagens, texto, etc.
    // Por exemplo, usando fetch() para carregar o conteúdo ou outras estratégias.
    const img = ocultoContent.querySelector('img'); // Supondo que o conteúdo seja uma imagem
    if (img) {
        img.src = img.dataset.src; // Carrega a imagem quando for visível
    }
}

// Função para fechar o conteúdo oculto
function fechar_oculto_content(button) {
    const card = button.closest('.card');
    const ocultoContent = card.querySelector('.oculto-content');
    const oculto = card.querySelector('.oculto');
    const cardsContainer = document.querySelector('.cards');

    ocultoContent.style.display = 'none';
    ocultoContent.style.zIndex = '0';
    oculto.style.zIndex = '9999';
    card.classList.remove('no-hover');

    document.querySelectorAll('.card').forEach(otherCard => {
        otherCard.style.zIndex = '1';
    });

    cardsContainer.classList.remove('no-hover-all');

    cardAberto = null;
}

// Adicionar hover para cards individuais
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        if (!cardAberto) {
            card.style.zIndex = '10';
            document.querySelectorAll('.card').forEach(otherCard => {
                if (otherCard !== card) {
                    otherCard.style.zIndex = '0';
                }
            });
        }
    });

    card.addEventListener('mouseleave', () => {
        if (!cardAberto) {
            card.style.zIndex = '1';
            document.querySelectorAll('.card').forEach(otherCard => {
                otherCard.style.zIndex = '1';
            });
        }
    });
});

// Configuração do Intersection Observer para animação de entrada e lazy loading
document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll(".slide-in");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active"); // Adiciona a classe para ativar o efeito
                    if (entry.target.dataset.src) {
                        entry.target.src = entry.target.dataset.src; // Lazy load para imagens
                    }
                } else {
                    entry.target.classList.remove("active");
                }
            });
        },
        { threshold: 0.1 }
    );

    elements.forEach((el) => observer.observe(el));
});
