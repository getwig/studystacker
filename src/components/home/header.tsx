'use client';

import { cn } from '@/lib/utils';
import { useScrollY } from '@/hooks/use-scroll-y';
import { Icon } from '@/components/icon';
import Link from 'next/link';
import { Button } from '../ui/button';
import { useState, useEffect } from 'react';
import { Separator } from '../ui/separator';

function MenuContent() {
  return (
    <div className='bg-background fixed top-16 inset-x-0 bottom-0 overflow-y-auto overscroll-none'>
      <span className='sr-only'>Menu</span>
      <nav className='flex flex-col px-3'>
        <section className='py-3 mx-3 flex flex-col gap-4'>
          <Link href='/signup'>
            <Button size='lg' className='w-full'>
              Jetzt loslegen
            </Button>
          </Link>
          <Link href='/login'>
            <Button variant='outline' size='lg' className='w-full'>
              Anmelden
            </Button>
          </Link>
          <Separator className='my-3' />
          <Link href='/contact'>
            <Button variant='outline' size='lg' className='w-full'>
              Kontakt
            </Button>
          </Link>
        </section>
        {/*<section className='py-3'>
          <ul>
            <li>
              <Link
                href='/contact'
                className='px-3 h-12 transition-colors text-muted-foreground hover:text-primary hover:bg-muted rounded-md flex items-center'
              >
                Kontakt
              </Link>
            </li>
          </ul>
        </section>*/}
      </nav>
    </div>
  );
}

export function Header() {
  const scrollY = useScrollY();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    // Cleanup function to restore scrolling when component unmounts
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <header
      className={cn(
        'sticky top-0 w-full bg-background h-[calc(4rem+1px)] border-b border-border/0 transition-colors z-50 transform [transform:translate3d(0,0,999px)]',
        scrollY !== 0 && 'border-border',
      )}
    >
      <div className='relative flex justify-between h-16 mx-auto lg:container lg:px-16 xl:px-20'>
        <div className='flex justify-between items-center flex-1 px-6 lg:px-0'>
          <Link href='/'>
            <Icon className='w-6 h-6' />
          </Link>
          <div className='hidden lg:flex items-center gap-2'>
            <Link href='/login'>
              <Button variant='outline' size='sm'>
                Anmelden
              </Button>
            </Link>
            <Link href='/contact'>
              <Button variant='outline' size='sm'>
                Kontakt
              </Button>
            </Link>
            <Link href='/signup'>
              <Button size='sm'>Jetzt loslegen</Button>
            </Link>
          </div>
        </div>
        <div className='inset-y-0 flex mr-2 items-center px-4 lg:hidden'>
          <Button
            className='rounded-full relative aspect-square group'
            variant='outline'
            size='sm'
            aria-label={isMenuOpen ? 'Menü schließen' : 'Menü öffnen'}
            data-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className='bg-primary w-[14px] h-[1.5px] rounded-full absolute -translate-y-[3.5px] transition-transform duration-150 ease-in-out group-data-[expanded="true"]:translate-y-0 group-data-[expanded="true"]:rotate-45 group-data-[expanded="true"]:scale-110' />
            <div className='bg-primary w-[14px] h-[1.5px] rounded-full absolute translate-y-[3.5px] transition-transform duration-150 ease-in-out group-data-[expanded="true"]:translate-y-0 group-data-[expanded="true"]:-rotate-45 group-data-[expanded="true"]:scale-110' />
          </Button>
          {isMenuOpen && <MenuContent />}
        </div>
      </div>
    </header>
  );
}
