'use client';

import { FocusScope } from '@radix-ui/react-focus-scope';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Icon } from '@/components/icon';
import { useIsTablet } from '@/hooks/use-mobile';
import { useScrollY } from '@/hooks/use-scroll-y';
import { cn } from '@/lib/utils';
import { Button, buttonVariants } from '../ui/button';
import { Separator } from '../ui/separator';

function MenuContent() {
  return (
    <div className='bg-background fixed top-16 inset-x-0 bottom-0 overflow-y-auto overscroll-none'>
      <span className='sr-only'>Menu</span>
      <nav className='flex flex-col px-3'>
        <section className='py-3 mx-3 flex flex-col gap-4'>
          <Link
            href='/signup'
            className={buttonVariants({ variant: 'default', size: 'lg' })}
          >
            Jetzt loslegen
          </Link>
          <Link
            href='/login'
            className={buttonVariants({ variant: 'outline', size: 'lg' })}
          >
            Anmelden
          </Link>
          <Separator className='my-3' />
          <Link
            href='/contact'
            className={buttonVariants({ variant: 'outline', size: 'lg' })}
          >
            Kontakt
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const scrollY = useScrollY();
  const isTablet = useIsTablet();

  // Auto-close menu when switching to desktop view
  useEffect(() => {
    if (!isTablet && isMenuOpen) {
      setIsMenuOpen(false);
    }
  }, [isTablet, isMenuOpen]);

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
        'sticky top-0 w-full bg-background h-[calc(4rem+1px)] z-50 transform [transform:translate3d(0,0,999px)]',
        scrollY > 0 && 'border-b',
      )}
    >
      <div className='relative flex justify-between h-16 mx-auto lg:container lg:px-16 xl:px-20'>
        <div className='hidden lg:flex justify-between items-center flex-1 px-6 lg:px-0'>
          <Link href='/'>
            <Icon className='w-6 h-6' />
          </Link>
          <div className='flex items-center gap-2'>
            <Link
              href='/login'
              className={buttonVariants({ variant: 'outline', size: 'sm' })}
            >
              Anmelden
            </Link>
            <Link
              href='/contact'
              className={buttonVariants({ variant: 'outline', size: 'sm' })}
            >
              Kontakt
            </Link>
            <Link href='/signup' className={buttonVariants({ size: 'sm' })}>
              Jetzt loslegen
            </Link>
          </div>
        </div>
        <div className='flex-1 inset-y-0 flex items-center px-6 lg:hidden'>
          <FocusScope
            trapped={isMenuOpen}
            loop={isMenuOpen}
            className='w-full flex justify-between items-center'
          >
            <Link href='/' onClick={() => setIsMenuOpen(false)}>
              <Icon className='w-6 h-6' />
            </Link>
            <Button
              className='rounded-full relative aspect-square group'
              variant='outline'
              size='sm'
              aria-label={isMenuOpen ? 'Menü schließen' : 'Menü öffnen'}
              aria-expanded={isMenuOpen}
              data-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className='bg-foreground w-[14px] h-[1.5px] rounded-full absolute -translate-y-[3.5px] transition-transform duration-150 ease-in-out group-data-[expanded="true"]:translate-y-0 group-data-[expanded="true"]:rotate-45 group-data-[expanded="true"]:scale-110' />
              <div className='bg-foreground w-[14px] h-[1.5px] rounded-full absolute translate-y-[3.5px] transition-transform duration-150 ease-in-out group-data-[expanded="true"]:translate-y-0 group-data-[expanded="true"]:-rotate-45 group-data-[expanded="true"]:scale-110' />
            </Button>
            {isMenuOpen && <MenuContent />}
          </FocusScope>
        </div>
      </div>
    </header>
  );
}
