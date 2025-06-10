import AuthForm from '@/components/auth/auth-form';

export const metadata = {
  title: 'Sign Up - FireApp',
  description: 'Create a new FireApp account',
};

export default function SignUpPage() {
  return (
    <div className="flex items-center justify-center min-h-[80vh] w-full">
      <AuthForm mode="signup" />
    </div>
  );
}