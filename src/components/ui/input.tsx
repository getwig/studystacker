import { forwardRef, type ComponentProps } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const inputVariants = cva(
  'flex w-full min-w-0 rounded-md border border-input bg-transparent outline-none transition-[color,box-shadow] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 file:inline-flex file:border-0 file:bg-transparent file:font-medium file:text-foreground',
  {
    variants: {
      size: {
        sm: 'h-8 px-2 py-1 text-sm file:h-6 file:text-xs',
        default: 'h-9 px-2 py-1 text-base file:h-7 file:text-sm md:text-sm',
        lg: 'h-10 px-3 py-2 text-base file:h-8 file:text-sm',
        xl: 'h-12 px-4 py-2 text-base file:h-9 file:text-sm rounded-lg',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
);

const Input = forwardRef<
  HTMLInputElement,
  Omit<ComponentProps<'input'>, 'size'> & VariantProps<typeof inputVariants>
>(({ className, type, size, ...props }, ref) => {
  return (
    <input
      type={type}
      data-slot='input'
      className={cn(
        inputVariants({ size, className }),
        'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
        'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
      )}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = 'Input';

export { Input, inputVariants };
