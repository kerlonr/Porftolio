gsap.registerPlugin(ScrollTrigger);

// Função para animação do GSAP com ScrollTrigger
function animateFromLeft(elementClass) {
  gsap.to(elementClass, {
    x: 0,
    opacity: 1,
    duration: 1.5,
    ease: "power3.out",
    scrollTrigger: {
      trigger: elementClass,
      start: "top center",
      end: "bottom top",
      toggleActions: "play none none reverse",
    },
  });
}

// Função para animação de fade-in
function animateFadeIn(elementClass) {
  gsap.to(elementClass, {
    opacity: 1,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: elementClass,
      start: "top center",
      end: "bottom top",
      toggleActions: "play none none reverse",
    },
    scale: 1, 
  });
}

function animateScaleIncrease(elementClass) {
  gsap.to(elementClass, {
    scale: 1,
    opacity: 1,
    ease: "power3.out",
    duration: 3,
    startScale: 0.1,
    scrollTrigger: {
      trigger: elementClass,
      start: "top center",
      end: "bottom top",
      toggleActions: "play none none reverse",
    }
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

  //Escalona o Home
  animateScaleIncrease(".scale-element");

  // Efeito de digitação
  initTypingEffect("animated-text", [
    "Kerlon",
    "an Innovator",
    "an IoT Trainee",
    "a 3D Maker",
  ]);
});
