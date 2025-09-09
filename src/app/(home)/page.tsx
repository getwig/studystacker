import { Header } from '@/components/home/header';
import { Hero } from '@/components/home/hero';
import { Publishers } from '@/components/home/publishers';
import { BookImport } from '@/components/home/book-import';
import { Footer } from '@/components/home/footer';

export default function Home() {
  return (
    <>
      <Header />
      <main className='relative min-h-svh bg-background'>
        <Hero />
        <Publishers />
        <BookImport />
      </main>
      <Footer />
    </>
  );
}
