"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { login } from "@/app/actions/account";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

export default function LoginPage() {
  const [error, setError] = useState("");
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget);
    
    const response = await login(formData);

    if (response && response.error) {
      setError(response.error.message)
    } 

  }


  return (
    <form className="flex items-center justify-center h-screen w-full" onSubmit={handleSubmit}>
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2"><Link href={"/"}><ArrowLeft /></Link>Log In</CardTitle>
          <CardDescription>
            Enter your email and password to access your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="someone@example.com"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" placeholder="your password" required />
            {error && <div className="text-sm text-destructive font-bold">{error}</div>}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button className="w-full" type="submit">Log In</Button>
          <p className="self-start">Don&apos;t have an account? <Link href={"/signup"} className="font-bold text-primary ">Sign up here.</Link></p>
        </CardFooter>
      </Card>
    </form>
  );
}