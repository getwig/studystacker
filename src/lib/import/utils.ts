import { gateway } from '@ai-sdk/gateway';
import { generateText } from 'ai';
import type { Book, Grade, Publisher } from '@/lib/constants';
import { getRandomColor, type Simplify } from '@/lib/utils';

export type RawBook = Simplify<
  Omit<Book, 'color' | 'publisher' | 'grade'> & { grade: string }
>;

const extractionExamples = [
  { title: 'Englisch 5/6 für Anfänger', subject: 'Englisch', grade: '5/6' },
  {
    title: 'Französisch Oberstufe 2',
    subject: 'Französisch',
    grade: 'Oberstufe 2',
  },
  { title: 'Latein Mittelstufe 2', subject: 'Latein', grade: 'Mittelstufe 2' },
  { title: 'Mathematik für Klasse 1', subject: 'Mathematik', grade: '1' },
  { title: 'Englisch 2. Klasse', subject: 'Englisch', grade: '2' },
  { title: 'Biologie für das Gymnasium', subject: 'Biologie', grade: null },
  { title: 'Physik Sekundarstufe I', subject: 'Physik', grade: 'Sek. I' },
  { title: 'Chemie 11. Klasse', subject: 'Chemie', grade: '11' },
  { title: 'Geschichte 13. Klasse', subject: 'Geschichte', grade: '13' },
  {
    title: 'Mathematik Sekundarstufe II',
    subject: 'Mathematik',
    grade: 'Sek. II',
  },
  { title: 'Chemie für Abiturvorbereitung', subject: 'Chemie', grade: '12/13' },
  {
    title: 'Geografie Mittelstufe 2',
    subject: 'Geografie',
    grade: 'Mittelstufe 2',
  },
  { title: 'Englisch Oberstufe 1', subject: 'Englisch', grade: 'Oberstufe 1' },
  {
    title: 'Geschichte Mittelschule 2',
    subject: 'Geschichte',
    grade: 'Mittelschule 2',
  },
  { title: 'Deutsch 10. Klasse', subject: 'Deutsch', grade: '10' },
  { title: 'Biologie Sekundarstufe II', subject: 'Biologie', grade: 'Sek. II' },
  {
    title: 'Mathematik für die Realschule',
    subject: 'Mathematik',
    grade: null,
  },
  { title: 'Physik 7. Klasse', subject: 'Physik', grade: '7' },
  {
    title: 'Geschichte Sekundarstufe I',
    subject: 'Geschichte',
    grade: 'Sek. I',
  },
  { title: 'Mathematik Grundschule', subject: 'Mathematik', grade: null },
] as const;

// ============================================================================
// AI
// ============================================================================

async function askAI(prompt: string): Promise<string | null> {
  try {
    const result = await generateText({
      model: gateway('openai/gpt-5-nano'),
      prompt,
    });

    return result.text?.trim() || null;
  } catch (error) {
    console.error('Error asking AI:', error);
    return null;
  }
}
