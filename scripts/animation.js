gsap.registerPlugin(ScrollTrigger);

// Função para animação do GSAP com ScrollTrigger
function animateFromLeft(elementClass, duration = 1.5, ease = "power3.out") {
  gsap.to(elementClass, {
    x: 0,
    opacity: 1,
    duration: duration,
    ease: ease,
    scrollTrigger: {
      trigger: elementClass,
      start: "top center",
      end: "bottom top",
      toggleActions: "play none none reverse",
    },
  });
}

// Função para animação de fade-in
function animateFadeIn(elementClass, duration = 2, ease = "power2.out") {
  gsap.to(elementClass, {
    opacity: 1,
    duration: duration,
    ease: ease,
    scrollTrigger: {
      trigger: elementClass,
      start: "top center",
      end: "bottom top",
      toggleActions: "play none none reverse",
    },
  });
}

// Função para inicializar o efeito de digitação
function initTypingEffect(
  elementId,
  words,
  typingSpeed = 100,
  deleteSpeed = 40,
  pauseDuration = 2000
) {
  const animatedTextElement = document.getElementById(elementId);
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    const currentWord = words[wordIndex];

    // Lógica de digitação e apagamento
    if (isDeleting) {
      charIndex--;
    } else {
      charIndex++;
    }

    animatedTextElement.innerHTML = currentWord.slice(0, charIndex);

    // Transição entre escrever e apagar
    if (!isDeleting && charIndex === currentWord.length) {
      setTimeout(() => (isDeleting = true), pauseDuration); // Pausa antes de apagar
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length; // Próxima palavra
    }

    // Controle da velocidade
    const speed = isDeleting ? deleteSpeed : typingSpeed;
    setTimeout(typeEffect, speed);
  }

  typeEffect(); // Iniciar a animação
}

// Animações
document.addEventListener("DOMContentLoaded", () => {
  // Inicializar animações GSAP
  const elementsFromLeft = [
    ".from-left",
    ".from-left-2",
    ".from_left_project_1",
    ".from_left_project_2",
    ".from_left_project_3",
  ];

  elementsFromLeft.forEach((element) => animateFromLeft(element));

  // Fade-in
  animateFadeIn(".fade-in");

  // Efeito de digitação
  initTypingEffect("animated-text", [
    "Kerlon",
    "an Innovator",
    "an IoT Specialist",
    "the FODAO",
    "an Iot autistic",
  ]);
});
