import { BookImport } from "@/components/home/book-import";
import { FinalCTA } from "@/components/home/final-cta";
import { Footer } from "@/components/home/footer";
import { Header } from "@/components/home/header";
import { Hero } from "@/components/home/hero";
import { Publishers } from "@/components/home/publishers";

export default function Home() {
  return (
    <>
      <Header />
      <main className="relative min-h-svh bg-background">
        <Hero />
        <Publishers />
        <BookImport />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
