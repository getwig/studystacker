import Link from "next/link";
import { AuthPageWrapper } from "@/components/auth/auth-page-wrapper";
import { SignupForm } from "@/components/auth/signup-form";

export default function SignupPage() {
  return (
    <AuthPageWrapper page="signup">
      <div className="w-80 max-w-full flex flex-col gap-6">
        <h1 className="text-center text-3xl font-bold tracking-tight">
          Einladung einlösen
        </h1>
        <SignupForm />
        <div className="flex flex-col gap-2">
          <p className="text-center text-base text-primary">
            Noch keine Einladung?{" "}
            <Link
              href="/contact"
              className="hover:underline underline-offset-3 text-blue-400"
            >
              Kontakt
            </Link>
          </p>
        </div>
      </div>
    </AuthPageWrapper>
  );
}
