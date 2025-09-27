import Link from 'next/link';

export function Footer() {
  return (
    <footer className='container mx-auto relative py-16 sm:py-18 md:py-24 px-6 lg:px-16 xl:px-20'>
      <h2 id='footerHeading' className='sr-only'>
        Footer
      </h2>
      <div className='border-default mt-32 flex justify-between border-t pt-8 text-[80%]'>
        <span>&copy; Studystacker UG (haftungsbeschränkt)</span>
        <span>
          Wir schützen deine Daten.{' '}
          <Link className='text-brand hover:underline' href='/security'>
            Mehr zu Sicherheit
          </Link>
        </span>
      </div>
    </footer>
  );
}
