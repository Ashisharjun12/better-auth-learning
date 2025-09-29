import React, { useState } from 'react';
import { signUp, useSession } from '../../../lib/auth-client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';   
import { Label } from '@/components/ui/label';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { data: session, isPending } = useSession();

  const handleEmailSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      setIsLoading(false);
      return;
    }

    try {
      const result = await signUp.email({
        email,
        password,
        name,
      });

      if (result.error) {
        setError(result.error.message);
      } else {
        // Redirect to login or dashboard
        window.location.href = '/login';
      }
    } catch (err) {
      setError('An error occurred during signup');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setIsLoading(true);
    setError('');

    try {
      await signUp.social({
        provider: 'google',
        callbackURL: '/dashboard'
      });
    } catch (err) {
      setError('An error occurred during Google signup');
      setIsLoading(false);
    }
  };

  const handleGithubSignup = async () => {
    setIsLoading(true);
    setError('');

    try {
      await signUp.social({
        provider: 'github',
        callbackURL: '/dashboard'
      });
    } catch (err) {
      setError('An error occurred during GitHub signup');
      setIsLoading(false);
    }
  };

  const handleLinkedInSignup = async () => {
    setIsLoading(true);
    setError('');

    try {
      await signUp.social({
        provider: 'linkedin',
        callbackURL: '/dashboard'
      });
    } catch (err) {
      setError('An error occurred during LinkedIn signup');
      setIsLoading(false);
    }
  };

  const handleTwitterSignup = async () => {
    setIsLoading(true);
    setError('');

    try {
      await signUp.social({
        provider: 'twitter',
        callbackURL: '/dashboard'
      });
    } catch (err) {
      setError('An error occurred during Twitter signup');
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
          <CardTitle>Create Account</CardTitle>
          <CardDescription>
            Enter your information to create a new account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
              {error}
            </div>
          )}
          
          <form onSubmit={handleEmailSignup} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            
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
                minLength={6}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Creating Account...' : 'Create Account'}
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
              onClick={handleGoogleSignup}
              disabled={isLoading}
            >
              Continue with Google
            </Button>
            
            <Button
              variant="outline"
              className="w-full"
              onClick={handleGithubSignup}
              disabled={isLoading}
            >
              Continue with GitHub
            </Button>
            
            <Button
              variant="outline"
              className="w-full"
              onClick={handleLinkedInSignup}
              disabled={isLoading}
            >
              Continue with LinkedIn
            </Button>
            
            <Button
              variant="outline"
              className="w-full"
              onClick={handleTwitterSignup}
              disabled={isLoading}
            >
              Continue with Twitter
            </Button>
          </div>
          
          <div className="text-center text-sm">
            Already have an account?{' '}
            <a href="/login" className="text-blue-600 hover:underline">
              Sign in
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
