document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll(".slide-in");
  
    // Configuração do Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active"); // Adiciona a classe para ativar o efeito
          } else {
            entry.target.classList.remove("active"); // Remove a classe para repetir o efeito
          }
        });
      },
      { threshold: 0.1 } // Quando 10% do elemento estiver visível
    );
  
    elements.forEach((el) => observer.observe(el)); // Observa todos os elementos com a classe "slide-in"
  });
  