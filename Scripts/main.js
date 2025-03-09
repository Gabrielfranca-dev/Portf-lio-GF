document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('toggle');
    document.body.classList.add('light-mode'); // Ativa o modo light por padrão
    toggle.checked = true; // Define o estado do toggle como ativado
    
    toggle.addEventListener('change', (e) => {
        document.body.classList.toggle('light-mode', e.target.checked);
    });
});

let growing = true;
const pulses = document.querySelectorAll('.pulse'); // Seleciona todos os elementos com a classe .pulse

// Configuração para pulsar a imagem
const interval = setInterval(() => {
    pulses.forEach(img => {  // Itera sobre todos os elementos .pulse
        img.style.transform = growing ? 'scale(1.2)' : 'scale(1)';
    });
    growing = !growing;
}, 1000);

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

let cardAberto = null;

// Função para mostrar o conteúdo oculto do card com lazy loading
function mostrar_oculto_content(button) {
    const card = button.closest('.card');
    const ocultoContent = card.querySelector('.oculto-content');
    const oculto = card.querySelector('.oculto');
    const cardsContainer = document.querySelector('.cards');

    // Fecha o card aberto anteriormente, se houver
    if (cardAberto !== null) {
        fechar_oculto_content(cardAberto.querySelector('.close-button'));
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

    // Adiciona evento para fechar ao clicar fora do card
    setTimeout(() => {
        document.addEventListener('click', fecharForaDoCard);
    }, 10);
}

// Função para fechar o conteúdo oculto
function fechar_oculto_content(button) {
    if (!cardAberto) return;

    const card = cardAberto;
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

    // Pausar o vídeo do iframe
    const iframe = card.querySelector('iframe');
    if (iframe) {
        const iframeSrc = iframe.src;
        iframe.src = ''; // Remove o src para parar o vídeo
        iframe.src = iframeSrc; // Restaura o src para recomeçar o vídeo, se necessário
    }

    cardAberto = null;

    // Remove o evento de clique fora do card
    document.removeEventListener('click', fecharForaDoCard);
}

// Função para fechar o card ao clicar fora dele
function fecharForaDoCard(event) {
    if (!cardAberto) return;

    const ocultoContent = cardAberto.querySelector('.oculto-content');

    // Verifica se o clique foi fora da área do card
    if (!ocultoContent.contains(event.target)) {
        fechar_oculto_content();
    }
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
                    entry.target.classList.add("active");
                    if (entry.target.dataset.src) {
                        entry.target.src = entry.target.dataset.src;
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

window.onload = function () {
    const image = document.getElementById("slideImage");

    const images = [
        "imgs/Team/slide/1.jpg",
        "imgs/Team/slide/2.jpg",
        "imgs/Team/slide/3.jpg",
        "imgs/Team/slide/4.jpg",
        "imgs/Team/slide/5.jpg",
        "imgs/Team/slide/6.jpg",
        "imgs/Team/slide/7.jpg",
    ];

    let currentIndex = 0;

    function updateImage() {
        image.src = images[currentIndex];
    }

    function nextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        updateImage();
    }

    function prevImage() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateImage();
    }

    // Troca a imagem automaticamente a cada 3 segundos
    setInterval(nextImage, 15000);

    // Adiciona evento de clique na imagem para navegação manual
    image.addEventListener("click", function (event) {
        const clickX = event.clientX;
        const imageWidth = image.clientWidth;

        if (clickX < imageWidth / 2) {
            prevImage(); // Clique na esquerda -> Volta imagem
        } else {
            nextImage(); // Clique na direita -> Avança imagem
        }
    });
};
