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
  { href: "https://github.com/TeaGamer", img: "/git.png", alt: "" },
  { href: "https://www.instagram.com/renat_abbasov1/", img: "/inst.png", alt: "" },
];

export default function Home() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % photos.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

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
          background: black;
          color: white;
        }
        .second-section {
          background: white;
          color: black;
          padding: 2rem;
        }
        img.slider-photo {
          width: 400px;
          height: auto;
          border-radius: 8px;
          cursor: default;
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
      `}</style>

      <main>
        {/* Первый экран */}
        <section className="section first-section">
          <img
            src={photos[index]}
            alt={`Фото ${index + 1}`}
            className="slider-photo"
          />
          <h1>Renat Abbasov</h1>
          <h2>123869</h2>
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
