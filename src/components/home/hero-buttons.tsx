'use client';

import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import Link from 'next/link';

export function HeroButtons() {
  const isMobile = useIsMobile();

  return (
    <div className='flex items-center gap-2'>
      <Link href='/signup'>
        <Button className='rounded-full' size={isMobile ? 'default' : 'lg'}>
          Jetzt loslegen
        </Button>
      </Link>
      <Link href='/login'>
        <Button
          className='rounded-full'
          variant='outline'
          size={isMobile ? 'default' : 'lg'}
        >
          Anmelden
        </Button>
      </Link>
    </div>
  );
}
