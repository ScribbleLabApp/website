"use client";

import { motion } from "framer-motion";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

import { ToastProvider } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";

import { Navbar } from "@/components/ui/navbar";

import { signUp, logIn } from "@/lib/models/auth"; // Verify Email

// +-------------------------------------------------------------------------------+
// |                                  Step 1 UI Comp                               |
// +-------------------------------------------------------------------------------+

export function Step1({ username, updateFormData, handleNext }: any) {
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    updateFormData('username', e.target.value);

  return (
    <motion.div
      className="w-full max-w-md text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="p-8 shadow-xl border rounded-xl bg-white/20 backdrop-blur-lg flex flex-col items-center justify-center space-y-4">        
        <h1 className="text-2xl text-white font-semibold mb-4">Choose Your Username</h1>
        <Input
          value={username}
          onChange={handleUsernameChange}
          placeholder="Enter a username"
          required
          className="w-full text-black p-4 rounded-md border border-gray-300 shadow-sm"
        />
        <Button onClick={handleNext} className="mt-4 w-full bg-orange-500 hover:bg-black text-white py-2 rounded-3xl font-semibold">
          Next
        </Button>
      </Card>
    </motion.div>
  );
}

// +-------------------------------------------------------------------------------+
// |                                  Step 2 UI Comp                               |
// +-------------------------------------------------------------------------------+

export function Step2({
  email,
  password,
  confirmPassword,
  acceptedTerms,
  updateFormData,
  handleNext,
}: any) {
  return (
    <motion.div
      className="w-full max-w-md text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-2xl mb-4">Email and Password</h1>
      <Input
        value={email}
        onChange={(e) => updateFormData('email', e.target.value)}
        placeholder="Email"
        required
      />
      <Input
        value={password}
        onChange={(e) => updateFormData('password', e.target.value)}
        placeholder="Password"
        type="password"
        required
      />
      <Input
        value={confirmPassword}
        onChange={(e) => updateFormData('confirmPassword', e.target.value)}
        placeholder="Confirm Password"
        type="password"
        required
      />
      <div className="mt-2">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={acceptedTerms}
            onChange={(e) => updateFormData('acceptedTerms', e.target.checked)}
          />
          <span className="ml-2">I accept the terms and conditions</span>
        </label>
      </div>
      <Button onClick={handleNext} className="mt-4 w-full">
        Next
      </Button>
    </motion.div>
  );
}

// +-------------------------------------------------------------------------------+
// |                                  Step 3 UI Comp                               |
// +-------------------------------------------------------------------------------+

export function Step3({ handleNext }: any) {
  return (
    <motion.div
      className="w-full max-w-md text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-2xl mb-4">Verify Your Email</h1>
      <p>We've sent a verification link to your email. Please verify it before continuing.</p>
      <Button onClick={handleNext} className="mt-4 w-full">
        I've Verified
      </Button>
    </motion.div>
  );
}

// +-------------------------------------------------------------------------------+
// |                                  Step 4 UI Comp                               |
// +-------------------------------------------------------------------------------+

export function Step4({ twoFactorEnabled, updateFormData, handleNext }: any) {
  return (
    <motion.div
      className="w-full max-w-md text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-2xl mb-4">Add Two-Factor Authentication</h1>
      <p className="mb-4">Enhance your account security by enabling 2FA. This is optional.</p>
      <label className="flex items-center justify-center">
        <input
          type="checkbox"
          checked={twoFactorEnabled}
          onChange={(e) => updateFormData('twoFactorEnabled', e.target.checked)}
        />
        <span className="ml-2">Enable 2FA</span>
      </label>
      <Button onClick={handleNext} className="mt-4 w-full">
        Next
      </Button>
    </motion.div>
  );
}

export function Step5({ avatar, updateFormData, handleFinish }: any) {
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    updateFormData('avatar', file);
  };

  return (
    <motion.div
      className="w-full max-w-md text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-2xl mb-4">Upload Your Avatar</h1>
      <Input type="file" accept="image/*" onChange={handleAvatarChange} />
      {avatar && <p className="mt-2">File uploaded: {avatar.name}</p>}
      <Button onClick={handleFinish} className="mt-4 w-full">
        Finish
      </Button>
    </motion.div>
  );
}

// +-------------------------------------------------------------------------------+
// |                                  OnboardingFlow                               |
// +-------------------------------------------------------------------------------+

export default function OnboardingFlow() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptedTerms: false,
    twoFactorEnabled: false,
    avatar: null as File | null,
  });

  const router = useRouter();
  const { toast } = useToast();

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = async () => {
    if (step === 2 && !formData.acceptedTerms) {
      toast({
        title: 'EULA Not Accepted',
        description: 'You must accept the terms and conditions to proceed.',
        variant: 'destructive',
      });
      return;
    }

    if (step === 3) {
      try {
        //await verifyEmail(formData.email);
        toast({ title: 'Verification Email Sent', description: 'Check your inbox.' });
      } catch (error) {
        toast({
          title: 'Error Sending Verification',
          description: (error as Error)?.message || 'Please try again.',
          variant: 'destructive',
        });
        return;
      }
    }

    setStep((prev) => prev + 1);
  };

  const handleFinish = async () => {
    try {
      const { email, password, username, avatar } = formData;
      const userCredential = await signUp(email, password);

      if (avatar) {}

      router.push('/');
    } catch (error) {
      toast({
        title: 'Signup Error',
        description: (error as Error)?.message || 'Please try again.',
        variant: 'destructive',
      });
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1: return (
          <Step1
            username={formData.username}
            updateFormData={updateFormData}
            handleNext={handleNext}
          />
        );
      case 2: return (
        <Step2
          email={formData.email}
          password={formData.password}
          confirmPassword={formData.confirmPassword}
          acceptedTerms={formData.acceptedTerms}
          updateFormData={updateFormData}
          handleNext={handleNext}
        />
      );
      case 3: return <Step3 handleNext={handleNext} />;
      case 4: return (
        <Step4
          twoFactorEnabled={formData.twoFactorEnabled}
          updateFormData={updateFormData}
          handleNext={handleNext}
        />
      );
      case 5: return (
        <Step5
          avatar={formData.avatar}
          updateFormData={updateFormData}
          handleFinish={handleFinish}
        />
      );
      default: return <p>Something went wrong!</p>;
    }
  };

  return (
    <ToastProvider>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 blur-3xl opacity-20"></div>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center p-4">
        {renderStep()}
      </div>
    </ToastProvider>
  );
}