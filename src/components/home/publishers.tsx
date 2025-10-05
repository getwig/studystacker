'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import {
  CCBuchnerIcon,
  CornelsenIcon,
  HelblingIcon,
  KlettIcon,
  WestermannIcon,
} from './publisher-icons';
import { Section } from './section';

const publishers = [
  {
    name: 'C.C.Buchner',
    logo: CCBuchnerIcon,
  },
  {
    name: 'Cornelsen',
    logo: CornelsenIcon,
  },
  {
    name: 'Helbling',
    logo: HelblingIcon,
  },
  {
    name: 'Klett',
    logo: KlettIcon,
  },
  {
    name: 'Westermann',
    logo: WestermannIcon,
  },
];

export function Publishers() {
  const [hoveredPublisher, setHoveredPublisher] = useState<string | null>(null);

  useEffect(() => {
    const checkInitialHover = () => {
      // Simple check: see which element has :hover state
      publishers.forEach((publisher) => {
        const element = document.querySelector(
          `[data-publisher="${publisher.name}"]`,
        );
        if (element?.matches(':hover')) {
          setHoveredPublisher(publisher.name);
        }
      });
    };

    // Check immediately and after a small delay for DOM to be ready
    checkInitialHover();
  }, []);

  return (
    <Section id='publishers'>
      <div className='relative z-20 w-full max-w-6xl mx-auto h-full flex flex-col xl:flex-row gap-4 items-center justify-between'>
        <div className='!leading-tight text-center xl:text-left text-2xl md:text-4xl text-muted-foreground whitespace-nowrap'>
          Nutze Studystacker mit
          <div className='block relative h-[1.2em] overflow-hidden'>
            <AnimatePresence mode='popLayout'>
              <motion.span
                key={hoveredPublisher}
                className='inline-block text-primary'
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, ease: 'backOut' }}
              >
                {hoveredPublisher || 'jedem Verlag'}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>
        <div
          className='grid grid-cols-5'
          onMouseLeave={() => setHoveredPublisher(null)}
        >
          {publishers.map((publisher) => (
            <div
              key={publisher.name}
              data-publisher={publisher.name}
              className={cn(
                'm-1 sm:size-16 size-14 flex justify-center items-center rounded-lg text-muted-foreground transition-colors',
                hoveredPublisher === publisher.name
                  ? 'text-primary'
                  : hoveredPublisher && 'text-muted-foreground/50',
              )}
              onMouseEnter={() => setHoveredPublisher(publisher.name)}
            >
              <publisher.logo />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
