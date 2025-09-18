import { Section } from './section';
import { CTAButtons } from './cta-buttons';

export function Hero() {
  return (
    <Section id='hero' className='-mt-[65px] pt-8 md:pt-16 lg:py-24'>
      <div className='mx-auto max-w-2xl text-center text-primary'>
        <div className='relative z-10 lg:h-auto pt-[90px] lg:pt-[90px] lg:min-h-[300px] flex flex-col items-center justify-center sm:mx-auto md:w-3/4 lg:mx-0 lg:w-full gap-4 lg:gap-8'>
          <div className='flex flex-col items-center'>
            <h1 className='font-semibold tracking-tight text-4xl sm:text-5xl sm:leading-none lg:text-7xl'>
              <span className='block'>Einmal einrichten</span>
              <span className='block'>Täglich Zeit sparen</span>
            </h1>
            <p className='pt-2 my-3 text-sm sm:mt-5 lg:mb-0 sm:text-base lg:text-lg text-balance'>
              Studystacker ist die führende Plattform für das zentralisierte
              Management von digitalen Schulbüchern. Füge deine Schulbücher in
              Sekundenschnelle hinzu, hinterlege deine Verlagszugänge und
              beginne noch heute.
            </p>
          </div>
          <CTAButtons buttonIds={['signup', 'login']} />
        </div>
      </div>
    </Section>
  );
}
