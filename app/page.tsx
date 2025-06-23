"use client";

import { ScrollRevealText } from './components/ScrollRevealText';
import { useState, useEffect, useCallback } from "react";

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
