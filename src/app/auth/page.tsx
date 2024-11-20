"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Navbar } from "@/components/ui/navbar";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import clsx from "clsx";

export default function AuthPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const option = searchParams.get("option") || "login";

  // State for Login and Signup
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(null);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [invalidFileType, setInvalidFileType] = useState(false);

  // Validation Functions
  const validateEmail = (value: string) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!value || !emailRegex.test(value)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  const validatePassword = (value: string) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!value || !passwordRegex.test(value)) {
      setPasswordError(
        "Password must be at least 8 characters long, include an uppercase letter, a number, and a special character."
      );
    } else {
      setPasswordError("");
    }
  };

  const validateConfirmPassword = (value: string) => {
    if (value !== password) {
      setConfirmPasswordError("Passwords do not match.");
    } else {
      setConfirmPasswordError("");
    }
  };

  const validateUsername = (value: string) => {
    if (!value || value.length < 3) {
      setUsernameError("Username must be at least 3 characters long.");
    } else {
      setUsernameError("");
    }
  };

  // Handlers
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

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    setProfileImage(file);
    setInvalidFileType(false);

    if (file) {
      const fileType = file.type;
      if (fileType === "image/png" || fileType === "image/jpeg") {
        const reader = new FileReader();
        reader.onload = () => {
          setProfileImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        setInvalidFileType(true); // Set invalid file type state if file is not PNG or JPG
        setProfileImagePreview(null);
      }
    } else {
      setProfileImagePreview(null);
    }
  };

  const handleRemoveProfileImage = () => {
    setProfileImage(null);
    setProfileImagePreview(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    validateEmail(email);
    validatePassword(password);
    validateConfirmPassword(confirmPassword);
    validateUsername(username);

    if (!emailError && !passwordError && !confirmPasswordError && !usernameError) {
      console.log("Form submitted with", { email, password, username, profileImage });
    }
  };

  const navigateToOption = (newOption: string) => {
    router.push(`?option=${newOption}`);
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        {option === "login" ? (
          <Card className="mx-auto max-w-sm">
            {/* Login Form */}
            <CardHeader>
              <CardTitle className="text-2xl">Login with ScribbleID</CardTitle>
              <CardDescription>Login to access files and collaborate with your team using your Scribble ID.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    value={email || ""}
                    onChange={handleEmailChange}
                    required
                  />
                  {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password || ""}
                    onChange={handlePasswordChange}
                    required
                  />
                  {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
                </div>
                <Button type="submit" className="w-full">
                  Login
                </Button>
                <div className="mt-4 text-center text-sm">
                  Don't have an account?{" "}
                  <a href="?option=signup" className="underline">
                    Sign Up
                  </a>
                </div>
              </form>
            </CardContent>
          </Card>
        ) : (
          <Card className="mx-auto max-w-sm">
            {/* Signup Form */}
            <CardHeader>
              <CardTitle className="text-2xl">Sign Up for ScribbleID</CardTitle>
              <CardDescription>Create an account to access ScribbleLab features and collaborate with your team.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    value={username || ""}
                    onChange={handleUsernameChange}
                    required
                  />
                  {usernameError && <p className="text-red-500 text-sm">{usernameError}</p>}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    value={email || ""}
                    onChange={handleEmailChange}
                    required
                  />
                  {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password || ""}
                    onChange={handlePasswordChange}
                    required
                  />
                  {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword || ""}
                    onChange={handleConfirmPasswordChange}
                    required
                  />
                  {confirmPasswordError && <p className="text-red-500 text-sm">{confirmPasswordError}</p>}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="profile-image">Profile Image</Label>
                  <Input
                    id="profile-image"
                    type="file"
                    onChange={handleProfileImageChange}
                    accept="image/png, image/jpeg"
                  />
                  {invalidFileType && (
                    <p className="text-red-500 text-sm">Invalid file type. Please upload a PNG or JPEG image.</p>
                  )}
                  {profileImagePreview && (
                    <div className="relative">
                      <img
                        src={profileImagePreview}
                        alt="Profile"
                        className="w-24 h-24 rounded-full object-cover"
                      />
                      <button
                        type="button"
                        className="absolute top-0 right-0 text-white bg-black rounded-full p-1"
                        onClick={handleRemoveProfileImage}
                      >
                        &#x2715;
                      </button>
                    </div>
                  )}
                </div>
                <Button type="submit" className="w-full">
                  Sign Up
                </Button>
                <div className="mt-4 text-center text-sm">
                  Already have an account?{" "}
                  <a href="?option=login" className="underline">
                    Login
                  </a>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}