"use client";

import { useState, useEffect, useRef } from "react";

const photos = [
  "/teaj.png",
  "/team.png",
  "/teaj.png",
  "/teab.png",
  "/teag.png",
  "/tear.png",
];

const socialLinks = [
  { href: "https://github.com/TeaGamer", img: "/git.png", alt: "GitHub" },
  { href: "https://www.instagram.com/renat_abbasov1/", img: "/inst.png", alt: "Instagram" },
];

export default function Home() {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true); // true — видимое фото, false — исчезает
  const timeoutRef = useRef(null);

  useEffect(() => {
    function startFadeCycle() {
      // Начинаем исчезать
      setFade(false);

      // Через 500мс меняем фото и запускаем появление
      timeoutRef.current = setTimeout(() => {
        setIndex((prev) => (prev + 1) % photos.length);
        setFade(true);

        // Через 4500мс запускаем следующий цикл
        timeoutRef.current = setTimeout(startFadeCycle, 4500);
      }, 500);
    }

    // Запускаем первый цикл через 4500мс чтобы фото сначала показалось подольше
    timeoutRef.current = setTimeout(startFadeCycle, 4500);

    return () => {
      clearTimeout(timeoutRef.current);
    };
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
          padding-bottom: 150px;
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
          margin-top: -150px;
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
          bottom: 10px;
          left: 50%;
          transform: translateX(-50%);
          width: 40px;
          height: 40px;
          cursor: pointer;
          opacity: 0.7;
          transition: opacity 0.3s ease;
          z-index: 1000;
        }
        .down-arrow:hover {
          opacity: 1;
        }
      `}</style>

      <main>
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
