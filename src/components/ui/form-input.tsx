import * as React from 'react';
import { cn } from '@/lib/utils';
import { Input, inputVariants } from './input';
import { type VariantProps } from 'class-variance-authority';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './tooltip';
import { AlertCircle, Eye, EyeOff } from 'lucide-react';
import { useFormField } from './form';

// Type definitions
export type FormInputProps = Omit<React.ComponentProps<'input'>, 'size'> &
  VariantProps<typeof inputVariants>;

type InputSize = 'sm' | 'lg' | 'xl' | undefined;

interface SizeConfig {
  icon: string;
  eyeY: string;
  eyeRight: string;
  eyeRightError: string;
  errorRight: string;
  padPassword: string;
  padPasswordError: string;
  padError: string;
}

// Configuration constants
const SIZE_CONFIGS: Record<string, SizeConfig> = {
  sm: {
    icon: 'h-3 w-3',
    eyeY: 'inset-y-1.5',
    eyeRight: 'right-1',
    eyeRightError: 'right-6',
    errorRight: 'pr-2',
    padPassword: 'pr-7',
    padPasswordError: 'pr-12',
    padError: 'pr-7',
  },
  lg: {
    icon: 'h-4 w-4',
    eyeY: 'inset-y-2',
    eyeRight: 'right-2',
    eyeRightError: 'right-8',
    errorRight: 'pr-3',
    padPassword: 'pr-10',
    padPasswordError: 'pr-16',
    padError: 'pr-10',
  },
  xl: {
    icon: 'h-5 w-5',
    eyeY: 'inset-y-2.5',
    eyeRight: 'right-3',
    eyeRightError: 'right-10',
    errorRight: 'pr-4',
    padPassword: 'pr-13',
    padPasswordError: 'pr-20',
    padError: 'pr-13',
  },
  default: {
    icon: 'h-4 w-4',
    eyeY: 'inset-y-1.5',
    eyeRight: 'right-1',
    eyeRightError: 'right-7',
    errorRight: 'pr-2',
    padPassword: 'pr-8',
    padPasswordError: 'pr-14',
    padError: 'pr-8',
  },
};

// Helper functions
const getSizeConfig = (size: InputSize): SizeConfig =>
  SIZE_CONFIGS[size || 'default'] || SIZE_CONFIGS.default;

const getInputPadding = (
  config: SizeConfig,
  isPassword: boolean,
  hasError: boolean,
): string => {
  if (isPassword && hasError) return config.padPasswordError;
  if (isPassword) return config.padPassword;
  if (hasError) return config.padError;
  return '';
};

// Sub-components
const PasswordToggle: React.FC<{
  show: boolean;
  onToggle: () => void;
  config: SizeConfig;
  hasError: boolean;
}> = ({ show, onToggle, config, hasError }) => (
  <button
    type='button'
    className={cn(
      'absolute flex items-center justify-center p-1',
      'text-muted-foreground hover:text-foreground',
      'transition-colors cursor-pointer',
      config.eyeY,
      hasError ? config.eyeRightError : config.eyeRight,
    )}
    onClick={onToggle}
    tabIndex={-1}
    aria-label={show ? 'Hide password' : 'Show password'}
  >
    {show ? (
      <EyeOff className={config.icon} />
    ) : (
      <Eye className={config.icon} />
    )}
  </button>
);

const ErrorIndicator: React.FC<{
  error: { message?: string } | undefined;
  config: SizeConfig;
}> = ({ error, config }) => {
  if (!error) return null;

  return (
    <div
      className={cn(
        'absolute inset-y-0 right-0 flex items-center pointer-events-none',
        config.errorRight,
      )}
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className='pointer-events-auto'>
              <AlertCircle
                className={cn(config.icon, 'text-destructive cursor-help')}
                aria-label='Error'
              />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{error.message}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

// Main component
const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ className, type, size, ...props }, ref) => {
    const { error, formItemId, formDescriptionId, formMessageId } =
      useFormField();
    const [showPassword, setShowPassword] = React.useState(false);

    const isPassword = type === 'password';
    const inputType = isPassword && showPassword ? 'text' : type;
    const config = getSizeConfig(size as InputSize);
    const padding = getInputPadding(config, isPassword, !!error);

    const ariaDescribedBy = React.useMemo(() => {
      if (!error) return formDescriptionId;
      return `${formDescriptionId} ${formMessageId}`;
    }, [error, formDescriptionId, formMessageId]);

    return (
      <div className='relative'>
        <Input
          ref={ref}
          id={formItemId}
          type={inputType}
          size={size}
          className={cn(
            error && 'border-destructive focus-visible:ring-destructive',
            padding,
            className,
          )}
          aria-describedby={ariaDescribedBy}
          aria-invalid={!!error}
          {...props}
        />

        {isPassword && (
          <PasswordToggle
            show={showPassword}
            onToggle={() => setShowPassword((prev) => !prev)}
            config={config}
            hasError={!!error}
          />
        )}

        <ErrorIndicator error={error} config={config} />
      </div>
    );
  },
);

FormInput.displayName = 'FormInput';

export { FormInput };
