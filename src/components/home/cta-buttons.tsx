'use client';

import { buttonVariants } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import Link from 'next/link';

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
  const isMobile = useIsMobile();
  const size = isMobile ? 'default' : 'lg';

  return (
    <div className={cn('flex items-center gap-2', className)}>
      {buttonIds.map((buttonId) => {
        const button = buttons[buttonId];
        return (
          <Link
            key={buttonId}
            href={button.href}
            className={cn(
              buttonVariants({
                variant: button.variant as 'outline' | 'default',
                size: size as 'default' | 'sm' | 'lg' | 'icon',
              }),
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
