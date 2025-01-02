import { useEffect, useState, useRef } from 'react';

export function useHeadsObserver() {
  const observer = useRef<IntersectionObserver | null>(null);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    observer.current = new IntersectionObserver(handleObserver, {
      rootMargin: "-20% 0% -35% 0px"
    });

    const elements = document.querySelectorAll<HTMLElement>("h2, h3, h4");
    elements.forEach((elem) => observer.current?.observe(elem));

    return () => observer.current?.disconnect();
  }, []);

  return { activeId };
}
