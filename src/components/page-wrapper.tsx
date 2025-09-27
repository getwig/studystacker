import { cn } from '@/lib/utils';

export function PageWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn('container mx-auto min-h-svh bg-background p-6', className)}
    >
      {children}
    </div>
  );
}
