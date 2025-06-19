"use client";

import { ScrollRevealText } from './components/ScrollRevealText';
import { useState, useEffect, useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import type { Engine } from "tsparticles-engine";  // <-- импорт типа Engine


const particlesOptions = {
  fpsLimit: 60,
  interactivity: {
    events: {
      onClick: { enable: true, mode: "push" },
      onHover: { enable: true, mode: "repulse" },
      resize: true,
    },
    modes: {
      push: { quantity: 4 },
      repulse: { distance: 100, duration: 0.4 },
    },
  },
  particles: {
    color: { value: "#ffffff" },
    links: {
      color: "#ffffff",
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1,
    },
    collisions: { enable: false },
    move: {
      directions: "none",
      enable: true,
      outModes: "bounce",
      random: false,
      speed: 2,
      straight: false,
    },
    number: { density: { enable: true, area: 800 }, value: 50 },
    opacity: { value: 0.5 },
    shape: { type: "circle" },
    size: { value: { min: 1, max: 3 } },
  },
  detectRetina: true,
};

const photos = [
  "/teaj.png",
  "/team.png",
  "/teaj.png",
  "/teab.png",
  "/teag.png",
  "/tear.png",
];

// Ссылки на соцсети
const socialLinks = [
  { href: "https://github.com/TeaGamer", img: "/git.png", alt: "GitHub" },
  { href: "https://www.instagram.com/renat_abbasov1/", img: "/inst.png", alt: "Instagram" },
];

export default function Home() {
  const particlesInit = useCallback(async (engine: Engine) => {  // <-- тип Engine здесь
    await loadFull(engine);
  }, []);

  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setFade(false); // Починаємо зникати

      setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + 1) % photos.length);
        setFade(true); // Появляємось з новим фото
      }, 500); // Тривалість зникання/появи
    }, 5000); // Інтервал зміни фото

    return () => clearInterval(intervalId);
  }, []);

  function DownArrow() {
    const handleClick = () => {
      const secondSection = document.querySelector(".second-section");
      if (secondSection) {
        secondSection.scrollIntoView({ behavior: "smooth" });
      }
    };

    return (
      <svg 
        className="down-arrow"
        fill="none"
        viewBox="0 0 24 24"
        stroke="white"
        strokeWidth={2}
        onClick={handleClick}
        role="button"
        aria-label="Scroll down"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    );
  }

  return (
    <>

      <main>
        {/* Перший экран */}
        <section className="section first-section" style={{ position: "relative", overflow: "hidden" }}>
          <Particles
            id="tsparticles"
            init={particlesInit}
            options={particlesOptions}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: 0,
            }}
          />

          <img
            src={photos[index]}
            alt={`Фото ${index + 1}`}
            className={`slider-photo ${fade ? "" : "fade-out"}`}
            style={{ position: "relative", zIndex: 1 }}
          />

          <h1 style={{ position: "relative", zIndex: 1 }}>Renat Abbasov</h1>
          <h2 style={{ position: "relative", zIndex: 1 }}>123869</h2>

          <DownArrow />
        </section>

        {/* Другий экран */}
  <section className="section second-section">
    <ScrollRevealText>  
    <h2>Мої соцмережі</h2>
    <div className="social-links">
      {socialLinks.map(({ href, img, alt }) => (
        <a
          key={href}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={alt}
        >
          <img src={img} alt={alt} />
        </a>
      ))}
    </div>
    </ScrollRevealText>
  </section>
      </main>
    </>
  );
}
