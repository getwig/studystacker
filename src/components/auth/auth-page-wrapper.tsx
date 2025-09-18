import Link from 'next/link';
import { buttonVariants } from '../ui/button';
import { Icon } from '@/components/icon';

export function AuthPageWrapper({
  children,
  page,
}: {
  children: React.ReactNode;
  page: 'login' | 'signup';
}) {
  return (
    <div className='flex flex-col min-h-svh'>
      <header className='w-full h-16 flex justify-between items-center mx-auto lg:container px-6 lg:px-16 xl:px-20'>
        <Link href='/'>
          <Icon className='w-6 h-6' />
        </Link>
        <Link
          href={page === 'login' ? '/signup' : '/login'}
          className={buttonVariants({
            variant: 'outline',
            size: 'sm',
          })}
        >
          {page === 'login' ? 'Jetzt loslegen' : 'Anmelden'}
        </Link>
      </header>
      <main className='flex justify-center items-center flex-1 p-6'>
        {children}
      </main>
      <footer className='w-full p-6 flex justify-center gap-4 flex-wrap'>
        <Link href='/imprint' className='text-xs text-muted-foreground'>
          Impressum
        </Link>
        <Link href='/privacy' className='text-xs text-muted-foreground'>
          Datenschutz
        </Link>
        <Link href='/terms' className='text-xs text-muted-foreground'>
          AGB
        </Link>
        <Link href='/cancellation' className='text-xs text-muted-foreground'>
          Widerrufsbelehrung
        </Link>
      </footer>
    </div>
  );
}
