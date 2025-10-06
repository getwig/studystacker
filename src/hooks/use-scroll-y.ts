import { useEffect, useState } from 'react';

export function useScrollY() {
  const [scrollY, setScrollY] = useState<number | undefined>(undefined);

  useEffect(() => {
    const onScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', onScroll);
    setScrollY(window.scrollY);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return scrollY ?? 0;
}
