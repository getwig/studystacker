import Link from 'next/link';
import { cn } from '@/lib/utils';

const buttons = {
  login: {
    label: 'Anmelden',
    href: '/login',
    variant: 'outline',
  },
  contact: {
    label: 'Kontakt',
    href: '/contact',
    variant: 'outline',
  },
  signup: {
    label: 'Jetzt loslegen',
    href: '/signup',
    variant: 'default',
  },
};

type ButtonKey = keyof typeof buttons;

type TwoButtons = {
  [A in ButtonKey]: {
    [B in Exclude<ButtonKey, A>]: [A, B];
  }[Exclude<ButtonKey, A>];
}[ButtonKey];

export function CTAButtons({
  buttonIds,
  className,
  buttonClassName,
}: {
  buttonIds: TwoButtons;
  className?: string;
  buttonClassName?: string;
}) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      {buttonIds.map((buttonId) => {
        const button = buttons[buttonId];

        return (
          <Link
            key={buttonId}
            href={button.href}
            className={cn(
              // Base button styles
              "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive select-none cursor-pointer",
              // Variant styles
              button.variant === 'default'
                ? 'bg-primary text-primary-foreground shadow-xs hover:bg-primary/90'
                : 'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
              // Responsive size styles - default on mobile, lg on desktop
              'h-9 px-4 py-2 has-[>svg]:px-3', // default size (mobile)
              'md:h-10 md:px-6 md:has-[>svg]:px-4', // lg size (desktop)
              // Additional styling
              'rounded-full',
              buttonClassName,
            )}
          >
            {button.label}
          </Link>
        );
      })}
    </div>
  );
}
