import { cn } from '@/lib/utils';

export function Section({
  id,
  children,
  className,
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      id={id}
      className={cn(
        'container mx-auto relative py-16 sm:py-18 md:py-24 px-6 lg:px-16 xl:px-20',
        className,
      )}
    >
      {children}
    </div>
  );
}
