import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Einladung einlösen - Studystacker',
};

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
