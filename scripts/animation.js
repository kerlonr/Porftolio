gsap.registerPlugin(ScrollTrigger);

gsap.to(".from-left", {
  x: 0,
  opacity: 1,
  duration: 1.5,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".from-left",
    start: "top center",
    end: "bottom top",
    toggleActions: "play none none reverse",
  },
});

gsap.to(".from-left-2", {
  x: 0,
  opacity: 1,
  duration: 1.5,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".from-left-2",
    start: "top center",
    end: "bottom top",
    toggleActions: "play none none reverse",
  },
});

gsap.to(".from_left_project_1", {
  x: 0,
  opacity: 1,
  duration: 1.5,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".from_left_project_1",
    start: "top center",
    end: "bottom top",
    toggleActions: "play none none reverse",
  },
});

gsap.to(".from_left_project_2", {
  x: 0,
  opacity: 1,
  duration: 1.5,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".from_left_project_2",
    start: "top center",
    end: "bottom top",
    toggleActions: "play none none reverse",
  },
});

gsap.to(".from_left_project_3", {
  x: 0,
  opacity: 1,
  duration: 1.5,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".from_left_project_3",
    start: "top center",
    end: "bottom top",
    toggleActions: "play none none reverse",
  },
});

gsap.to(".fade-in", {
  opacity: 1,
  duration: 2,
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".fade-in",
    start: "top center",
    end: "bottom top",
    toggleActions: "play none none reverse",
  },
});
