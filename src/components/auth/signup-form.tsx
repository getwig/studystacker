'use client';

import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField, FormItem, FormControl } from '@/components/ui/form';
import { FormInput } from '@/components/ui/form-input';

const signupFormSchema = z.object({
  invite: z.string({ message: 'Ungültige Einladung' }),
});

type SignupFormSchema = z.infer<typeof signupFormSchema>;

export function SignupForm() {
  const form = useForm<SignupFormSchema>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      invite: '',
    },
  });

  async function onSubmit(values: SignupFormSchema) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
        <FormField
          control={form.control}
          name='invite'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <FormInput
                  placeholder='Einladungslink'
                  type='text'
                  size='xl'
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          type='submit'
          className='w-full'
          size='xl'
          loading={form.formState.isSubmitting}
        >
          Einladung einlösen
        </Button>
      </form>
    </Form>
  );
}
