"use client";

import { useState, useEffect } from "react";

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
      <style>{`
        .section {
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          text-align: center;
          gap: 1rem;
        }
        .first-section {
          position: relative;
          height: 100vh;
          background: black;
          color: white;
          padding-bottom: 150px; /* место для градиента */
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          text-align: center;
          gap: 1rem;
        }
        .first-section::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 150px;
          background: linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0), rgba(255,255,255,1));
          pointer-events: none;
          z-index: 10;
        }
        .second-section {
          background: white;
          color: black;
          min-height: 100vh;
          padding: 2rem;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          text-align: center;
          gap: 1rem;
          margin-top: -150px; /* чтобы секция подтянулась под градиент */
        }
        img.slider-photo {
          width: 400px;
          height: auto;
          border-radius: 8px;
          cursor: default;
          opacity: 1;
          transition: opacity 0.5s ease-in-out;
        }
        img.fade-out {
          opacity: 0;
        }
        .social-links {
          display: flex;
          gap: 2rem;
          margin-top: 1rem;
        }
        .social-links a img {
          width: 60px;
          height: 60px;
          cursor: pointer;
          transition: transform 0.3s ease;
          border-radius: 50%;
        }
        .social-links a img:hover {
          transform: scale(1.1);
        }
        .down-arrow {
          position: absolute;
          bottom: 10px;       /* чуть отступ снизу */
          left: 50%;
          transform: translateX(-50%);
          width: 40px;
          height: 40px;
          cursor: pointer;
          opacity: 0.7;
          transition: opacity 0.3s ease;
          z-index: 1000;        /* поверх всего */
        }
        .down-arrow:hover {
          opacity: 1;
        }
      `}</style>

      <main>
        {/* Первый экран */}
        <section className="section first-section">
          <img
            src={photos[index]}
            alt={`Фото ${index + 1}`}
            className={`slider-photo ${fade ? "" : "fade-out"}`}
          />
          <h1>Renat Abbasov</h1>
          <h2>123869</h2>

          <DownArrow />
        </section>

        {/* Второй экран */}
        <section className="section second-section">
          <h2>Мои соцсети</h2>
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
        </section>
      </main>
    </>
  );
}
