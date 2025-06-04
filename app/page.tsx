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
          height: 100vh; /* высота экрана */
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          text-align: center;
          gap: 1rem;
        }
        .first-section {
          background:rgb(0, 0, 0);
        }
        .second-section {
          background: #ddd;
          color: black;
          padding: 2rem;
        }
        img {
          width: 400px;
          height: auto;
          border-radius: 8px;
        }
      `}</style>

      <main>
        {/* Первый экран */}
        <section className="section first-section">
          <img src={photos[index]} alt="Фото" />
          <h1>Renat Abbasov</h1>
          <h2>123869</h2>
        </section>

        {/* Второй экран */}
        <section className="section second-section">
          <h2>Мої соц.сети</h2>
          <a href="https://github.com/TeaGamer" target="_blank" rel="noopener noreferrer">
          <img src='/git.png' />
          </a>

          <p>https://github.com/TeaGamer</p>
          <p>Он будет виден только после прокрутки вниз.</p>
        </section>
      </main>
    </>
  );
}
