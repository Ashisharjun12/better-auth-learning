import React, { useState } from 'react';
import { signIn, useSession } from '../../../lib/auth-client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { data: session, isPending } = useSession();

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = await signIn.email({
        email,
        password,
      });

      if (result.error) {
        setError(result.error.message);
      }
    } catch (err) {
      setError('An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError('');

    try {
      await signIn.social({
        provider: 'google',
        callbackURL: 'http://localhost:5173/dashboard'
      });
    } catch (err) {
      setError('An error occurred during Google login');
      setIsLoading(false);
    }
  };

  const handleGithubLogin = async () => {
    setIsLoading(true);
    setError('');

    try {
      await signIn.social({
        provider: 'github',
        callbackURL: 'http://localhost:5173/dashboard'
      });
    } catch (err) {
      setError('An error occurred during GitHub login');
      setIsLoading(false);
    }
  };

  const handleLinkedInLogin = async () => {
    setIsLoading(true);
    setError('');

    try {
      await signIn.social({
        provider: 'linkedin',
        callbackURL: 'http://localhost:5173/dashboard'
      });
    } catch (err) {
      setError('An error occurred during LinkedIn login');
      setIsLoading(false);
    }
  };

  const handleTwitterLogin = async () => {
    setIsLoading(true);
    setError('');

    try {
      await signIn.social({
        provider: 'twitter',
        callbackURL: 'http://localhost:5173/dashboard'
      });
    } catch (err) {
      setError('An error occurred during Twitter login');
      setIsLoading(false);
    }
  };

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Already Logged In</CardTitle>
            <CardDescription>
              You are already logged in as {session.user.email}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => window.location.href = '/dashboard'} className="w-full">
              Go to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
              {error}
            </div>
          )}
          
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          
          <div className="space-y-2">
            <Button
              variant="outline"
              className="w-full"
              onClick={handleGoogleLogin}
              disabled={isLoading}
            >
              Continue with Google
            </Button>
            
            <Button
              variant="outline"
              className="w-full"
              onClick={handleGithubLogin}
              disabled={isLoading}
            >
              Continue with GitHub
            </Button>
            
            <Button
              variant="outline"
              className="w-full"
              onClick={handleLinkedInLogin}
              disabled={isLoading}
            >
              Continue with LinkedIn
            </Button>
            
            <Button
              variant="outline"
              className="w-full"
              onClick={handleTwitterLogin}
              disabled={isLoading}
            >
              Continue with Twitter
            </Button>
          </div>
          
          <div className="text-center text-sm">
            Don't have an account?{' '}
            <a href="/signup" className="text-blue-600 hover:underline">
              Sign up
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
