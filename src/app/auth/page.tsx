'use client';

export const dynamic = "force-dynamic";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Navbar } from '@/components/ui/navbar';
import { ToastProvider } from '@/components/ui/toast';
import { useToast } from '@/hooks/use-toast';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Suspense } from 'react';
import type { NextRouter } from 'next/router';
import { FaApple, FaGoogle } from 'react-icons/fa';

import { signUp, logIn, getCurrentUser } from '@/lib/models/auth';
import { saveUserToFirestore } from '@/lib/models/user';

export default function AuthPage() {
  const router = useRouter();

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <AuthContent router={router} />
    </Suspense>
  );
}

type RouterType = ReturnType<typeof useRouter>;

interface AuthContentProps {
  router: RouterType;
}

function AuthContent({ router }: AuthContentProps) {
  const searchParams = useSearchParams();
  const option = searchParams.get('option') || 'login';

  const { toast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(
    null
  );

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [invalidFileType, setInvalidFileType] = useState(false);

  const validateEmail = (value: string) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    setEmailError(
      emailRegex.test(value) ? '' : 'Please enter a valid email address.'
    );
  };

  const validatePassword = (value: string) => {
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    setPasswordError(
      passwordRegex.test(value)
        ? ''
        : 'Password must be at least 8 characters, include an uppercase letter, a number, and a special character.'
    );
  };

  const validateConfirmPassword = (value: string) => {
    setConfirmPasswordError(
      value === password ? '' : 'Passwords do not match.'
    );
  };

  const validateUsername = (value: string) => {
    setUsernameError(
      value.length >= 3 ? '' : 'Username must be at least 3 characters long.'
    );
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    validateEmail(value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    validatePassword(value);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setConfirmPassword(value);
    validateConfirmPassword(value);
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUsername(value);
    validateUsername(value);
  };

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      const fileType = file.type;
      if (fileType === 'image/png' || fileType === 'image/jpeg') {
        setProfileImage(file);

        const reader = new FileReader();
        reader.onload = () => setProfileImagePreview(reader.result as string);
        reader.readAsDataURL(file);
      } else {
        setInvalidFileType(true);
      }
    } else {
      setProfileImage(null);
      setProfileImagePreview(null);
    }
  };

  const handleRemoveProfileImage = () => {
    setProfileImage(null);
    setProfileImagePreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    validateEmail(email);
    validatePassword(password);
    if (option === 'signup') validateConfirmPassword(confirmPassword);
    if (option === 'signup') validateUsername(username);

    if (emailError || passwordError || confirmPasswordError || usernameError) {
      toast({
        title: 'Validation Error',
        description: 'Please fix the errors in the form.',
        variant: 'destructive',
      });
      return;
    }

    try {
      let user;
      if (option === 'login') {
        const userCredential = await logIn(email, password);
        if (userCredential) {
          user = userCredential.user;
        }
      } else if (option === 'signup') {
        const userCredential = await signUp(email, password);
        if (userCredential) {
          user = userCredential.user;
        }
      }

      if (!user) {
        throw new Error('User authentication failed. Please try again.');
      }

      if (option === 'signup') {
        await saveUserToFirestore(user.uid, {
          email,
          username,
          profileImage: profileImagePreview || '',
        });
      }

      toast({
        title: `${option === 'login' ? 'Login' : 'Signup'} Successful`,
        description: `Welcome back, ${user.email || 'user'}!`,
      });
      router.push('/account');
    } catch (error) {
      console.error('Authentication error:', error);
      toast({
        title: 'Authentication Error',
        description: (error as Error)?.message || 'Something went wrong.',
        variant: 'destructive',
      });
    }
  };

  const navigateToOption = (newOption: string) => {
    router.push(`?option=${newOption}`);
  };

  return (
    <ToastProvider>
      <div>
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
          <Card className="mx-auto max-w-sm">
            <CardHeader>
              <CardTitle className="text-2xl">
                {option === 'login'
                  ? 'Login to ScribbleID'
                  : 'Sign Up for ScribbleID'}
              </CardTitle>
              <CardDescription>
                {option === 'login'
                  ? 'Access your account and start collaborating!'
                  : 'Create a new account to unlock all features.'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="grid gap-4">
                {option === 'signup' && (
                  <div className="grid gap-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      type="text"
                      placeholder="Enter your username"
                      value={username}
                      onChange={handleUsernameChange}
                      required
                    />
                    {usernameError && (
                      <p className="text-red-500 text-sm">{usernameError}</p>
                    )}
                  </div>
                )}
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    value={email}
                    onChange={handleEmailChange}
                    required
                  />
                  {emailError && (
                    <p className="text-red-500 text-sm">{emailError}</p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                  />
                  {passwordError && (
                    <p className="text-red-500 text-sm">{passwordError}</p>
                  )}
                </div>
                {option === 'signup' && (
                  <div className="grid gap-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      value={confirmPassword}
                      onChange={handleConfirmPasswordChange}
                      required
                    />
                    {confirmPasswordError && (
                      <p className="text-red-500 text-sm">
                        {confirmPasswordError}
                      </p>
                    )}
                  </div>
                )}
                {option === 'signup' && (
                  <div className="grid gap-2">
                    <Label htmlFor="profile-image">Profile Picture</Label>
                    <Input
                      type="file"
                      id="profile-image"
                      accept="image/png, image/jpeg"
                      onChange={handleProfileImageChange}
                    />
                    {profileImagePreview && (
                      <img
                        src={profileImagePreview}
                        alt="Profile Preview"
                        className="mt-2 h-20 w-20 rounded-full"
                      />
                    )}
                  </div>
                )}
                <Button type="submit" className="w-full">
                  {option === 'login' ? 'Login' : 'Sign Up'}
                </Button>
                {option === 'login' ? (
                  <>
                    <div className="mt-2 gap-1">
                      <Button className="w-full mb-2" variant="outline">
                        <FaApple />
                        Continue with Google
                      </Button>
                      <Button className="w-full" variant="outline">
                        <FaGoogle />
                        Continue with Apple
                      </Button>
                    </div>
                  </>
                ) : (
                  <></>
                )}
                <span
                  onClick={() =>
                    navigateToOption(option === 'login' ? 'signup' : 'login')
                  }
                  className="cursor-pointer hover:underline flex flex-col items-center justify-center text-sm"
                >
                  {option === 'login'
                    ? "Don't have a ScribbleID yet? Create one"
                    : 'Already have an account? Login'}
                </span>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </ToastProvider>
  );
}