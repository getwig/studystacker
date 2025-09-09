import { cn } from '@/lib/utils';

export function ContentWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn('p-4 bg-background', className)}>{children}</div>;
}
