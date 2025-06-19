'use client';
import { useRef, useEffect, useState, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const ScrollRevealText = ({ children }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting); 
      },
      { threshold: 0.2 }
    );

    observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  return (
    <div ref={ref} className={`scroll-reveal ${isVisible ? 'visible' : ''}`}>
      {children}
    </div>
  );
};
