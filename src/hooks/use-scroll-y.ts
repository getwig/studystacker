import * as React from 'react';

export function useScrollY() {
  const [scrollY, setScrollY] = React.useState<number | undefined>(undefined);

  React.useEffect(() => {
    const onScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', onScroll);
    setScrollY(window.scrollY);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return scrollY ?? 0;
}
