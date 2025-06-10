import AuthForm from '@/components/auth/auth-form';

export const metadata = {
  title: 'Sign In - FireApp',
  description: 'Sign in to your FireApp account',
};

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-[80vh] w-full">
      <AuthForm mode="signin" />
    </div>
  );
}