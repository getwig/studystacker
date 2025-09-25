"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { FormInput } from "@/components/ui/form-input";
import { Separator } from "@/components/ui/separator";

function MicrosoftLogo() {
  return (
    <svg
      viewBox="0 0 256 256"
      xmlns="http://www.w3.org/2000/svg"
      width="256"
      height="256"
      preserveAspectRatio="xMidYMid"
    >
      <title>Microsoft Logo</title>
      <path fill="#F1511B" d="M121.666 121.666H0V0h121.666z" />
      <path fill="#80CC28" d="M256 121.666H134.335V0H256z" />
      <path fill="#00ADEF" d="M121.663 256.002H0V134.336h121.663z" />
      <path fill="#FBBC09" d="M256 256.002H134.335V134.336H256z" />
    </svg>
  );
}

const emailFormSchema = z.object({
  email: z.email({ message: "Ungültige E-Mail-Adresse" }),
  password: z
    .string()
    .min(8, { message: "Passwort muss mindestens 8 Zeichen lang sein" }),
});

type EmailFormSchema = z.infer<typeof emailFormSchema>;

function EmailForm() {
  const form = useForm<EmailFormSchema>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: EmailFormSchema) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <FormInput
                  placeholder="E-Mail Adresse"
                  type="email"
                  size="xl"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <FormInput
                  placeholder="Passwort"
                  type="password"
                  size="xl"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full"
          size="xl"
          loading={form.formState.isSubmitting}
        >
          Mit E-Mail fortfahren
        </Button>
      </form>
    </Form>
  );
}

export function LoginForm() {
  return (
    <div className="flex flex-col gap-6">
      <EmailForm />
      <Separator />
      <Button variant="outline" className="w-full" size="xl">
        <MicrosoftLogo />
        Mit Microsoft fortfahren
      </Button>
    </div>
  );
}
