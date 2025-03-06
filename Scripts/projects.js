let cardAberto = null;

function mostrar_oculto_content(button) {
    const card = button.closest('.card');
    const ocultoContent = card.querySelector('.oculto-content');
    const oculto = card.querySelector('.oculto');
    const cardsContainer = document.querySelector('.cards');

    // Fecha o card anteriormente aberto (se existir)
    if (cardAberto !== null) {
        fechar_oculto_content(cardAberto.querySelector('.close-button'));
    }

    // Exibe o conteúdo oculto
    ocultoContent.style.display = 'flex';
    ocultoContent.style.zIndex = '10000'; // Garantir que o z-index da .oculto-content seja o maior
    oculto.style.zIndex = '9999'; // Coloca a .oculto à frente dos outros elementos
    card.classList.add('no-hover'); // Desativa o hover no card aberto
    cardAberto = card;

    // Desativa o hover de todos os cards
    cardsContainer.classList.add('no-hover-all'); // Adiciona a classe no-hover-all ao body

    // Desativa o zoom e muda o z-index de todos os outros cards
    document.querySelectorAll('.card').forEach(otherCard => {
        if (otherCard !== card) {
            otherCard.style.zIndex = '0'; // Muda o z-index para 0 para colocar atrás
            otherCard.classList.remove('no-hover'); // Restaura o hover nos outros cards
        }
    });

    // Centraliza a rolagem
    const cardsRect = cardsContainer.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const centerY = scrollTop + cardsRect.top + cardsRect.height / 2 - window.innerHeight / 2 - 30;

    window.scrollTo({
        top: centerY,
        behavior: 'smooth'
    });
}

function fechar_oculto_content(button) {
    const card = button.closest('.card');
    const ocultoContent = card.querySelector('.oculto-content');
    const oculto = card.querySelector('.oculto');
    const cardsContainer = document.querySelector('.cards');

    // Fecha o conteúdo oculto
    ocultoContent.style.display = 'none';
    ocultoContent.style.zIndex = '0'; // Restaura o z-index da .oculto-content
    oculto.style.zIndex = '9999'; // Restaura o z-index da .oculto para o valor padrão

    card.classList.remove('no-hover'); // Restaura o hover no card fechado

    // Restaura o z-index de todos os outros cards
    document.querySelectorAll('.card').forEach(otherCard => {
        otherCard.style.zIndex = '1'; // Restaura o z-index padrão
    });

    // Restaura o hover de todos os cards
    cardsContainer.classList.remove('no-hover-all'); // Remove a classe no-hover-all do body

    cardAberto = null;
}

// Adicionar hover para cards individuais
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        if (!cardAberto) {
            card.style.zIndex = '10'; // Coloca o card em frente quando ele está sendo hovered
            document.querySelectorAll('.card').forEach(otherCard => {
                if (otherCard !== card) {
                    otherCard.style.zIndex = '0'; // Coloca os outros cards atrás
                }
            });
        }
    });

    card.addEventListener('mouseleave', () => {
        if (!cardAberto) {
            card.style.zIndex = '1'; // Restaura o z-index original ao sair do hover
            document.querySelectorAll('.card').forEach(otherCard => {
                otherCard.style.zIndex = '1'; // Restaura os outros cards para o z-index original
            });
        }
    });
});
