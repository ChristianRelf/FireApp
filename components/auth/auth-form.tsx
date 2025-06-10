'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Github, Chrome, Loader2, AlertCircle } from 'lucide-react';
import {
  signInWithEmail,
  signUpWithEmail,
  signInWithGoogle,
  signInWithGithub,
  resetPassword,
} from '@/lib/auth';

const signInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const signUpSchema = signInSchema.extend({
  displayName: z.string().min(2, 'Display name must be at least 2 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type SignInFormData = z.infer<typeof signInSchema>;
type SignUpFormData = z.infer<typeof signUpSchema>;

interface AuthFormProps {
  mode: 'signin' | 'signup';
}

export default function AuthForm({ mode }: AuthFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const router = useRouter();

  const schema = mode === 'signin' ? signInSchema : signUpSchema;
  const { register, handleSubmit, formState: { errors }, getValues } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: SignInFormData | SignUpFormData) => {
    setLoading(true);
    setError(null);

    try {
      if (mode === 'signin') {
        await signInWithEmail(data.email, data.password);
      } else {
        const signUpData = data as SignUpFormData;
        await signUpWithEmail(data.email, data.password, signUpData.displayName);
      }
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignIn = async (provider: 'google' | 'github') => {
    setLoading(true);
    setError(null);

    try {
      if (provider === 'google') {
        await signInWithGoogle();
      } else {
        await signInWithGithub();
      }
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    const email = getValues('email');
    if (!email) {
      setError('Please enter your email address first');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await resetPassword(email);
      setShowResetPassword(false);
      setError(null);
      // Show success message
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send reset email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center">
          {mode === 'signin' ? 'Sign in to your account' : 'Create an account'}
        </CardTitle>
        <CardDescription className="text-center">
          {mode === 'signin' 
            ? 'Enter your email and password to sign in'
            : 'Enter your information to create your account'
          }
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {mode === 'signup' && (
            <div className="space-y-2">
              <Label htmlFor="displayName">Display Name</Label>
              <Input
                id="displayName"
                type="text"
                placeholder="John Doe"
                {...register('displayName')}
                disabled={loading}
              />
              {errors.displayName && (
                <p className="text-sm text-destructive">{errors.displayName.message}</p>
              )}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              {...register('email')}
              disabled={loading}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              {...register('password')}
              disabled={loading}
            />
            {errors.password && (
              <p className="text-sm text-destructive">{errors.password.message}</p>
            )}
          </div>

          {mode === 'signup' && (
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                {...register('confirmPassword')}
                disabled={loading}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>
              )}
            </div>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {mode === 'signin' ? 'Sign In' : 'Create Account'}
          </Button>
        </form>

        {mode === 'signin' && (
          <div className="text-center">
            <Button
              variant="link"
              className="text-sm"
              onClick={() => setShowResetPassword(!showResetPassword)}
            >
              Forgot your password?
            </Button>
            {showResetPassword && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleResetPassword}
                disabled={loading}
                className="ml-2"
              >
                Send Reset Email
              </Button>
            )}
          </div>
        )}

        <Separator />

        <div className="space-y-2">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => handleSocialSignIn('google')}
            disabled={loading}
          >
            <Chrome className="mr-2 h-4 w-4" />
            Continue with Google
          </Button>

          <Button
            variant="outline"
            className="w-full"
            onClick={() => handleSocialSignIn('github')}
            disabled={loading}
          >
            <Github className="mr-2 h-4 w-4" />
            Continue with GitHub
          </Button>
        </div>

        <div className="text-center text-sm">
          {mode === 'signin' ? (
            <>
              Don&apos;t have an account?{' '}
              <Button variant="link" className="p-0" asChild>
                <a href="/signup">Sign up</a>
              </Button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <Button variant="link" className="p-0" asChild>
                <a href="/login">Sign in</a>
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}