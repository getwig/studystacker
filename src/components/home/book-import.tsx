import { Section } from './section';
import { ImportTabs } from './import-tabs';

export function BookImport() {
  return (
    <Section id='book-import'>
      <h2 className='mb-8 text-2xl md:text-4xl text-center'>
        <span className='text-primary'>Importiere deine Bücher</span>
        <br />{' '}
        <span className='text-muted-foreground'>ohne großen Aufwand</span>
      </h2>
      <ImportTabs />
    </Section>
  );
}
