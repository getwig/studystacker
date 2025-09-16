import { LoginForm } from '@/components/auth/login-form';
import Link from 'next/link';
import { AuthPageWrapper } from '@/components/auth/auth-page-wrapper';

export default function LoginPage() {
  return (
    <AuthPageWrapper page='login'>
      <div className='w-80 max-w-full flex flex-col gap-6'>
        <h1 className='text-center text-3xl font-bold tracking-tight'>
          Anmelden
        </h1>
        <LoginForm />
        <p className='text-center text-base text-primary'>
          Noch kein Account?{' '}
          <Link
            href='/signup'
            className='hover:underline underline-offset-3 text-blue-400'
          >
            Jetzt loslegen
          </Link>
        </p>
      </div>
    </AuthPageWrapper>
  );
}
