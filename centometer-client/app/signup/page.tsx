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
import { ArrowLeft } from "lucide-react";
import { signup } from "../actions/account";
import { useState } from "react";


export default function SignupPage() {
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget);
    
    const response = await signup(formData);

    if (response && response.error) {
      setError(response.error.message)
    } 

  }

  return (
    <>
      <form className="flex items-center justify-center h-screen w-full" onSubmit={handleSubmit}>
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Link href={"/"}>
                <ArrowLeft />
              </Link>
              Sign Up
            </CardTitle>
            <CardDescription>
              Create an account and get started.
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
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="enter a password"
                required
              />
              {error && <div className="text-sm text-destructive font-bold">{error}</div>}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button className="w-full" type="submit">
              Sign Up
            </Button>
            <p className="self-start">
              Already have an account?{" "}
              <Link href={"/login"} className="font-bold text-primary ">
                Log in here.
              </Link>
            </p>
          </CardFooter>
        </Card>
      </form>
    </>
  );
}
