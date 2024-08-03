"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import useGoogleSSO from "@/utils/hooks/sso";
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
  const { LoginWithGoogle } = useGoogleSSO()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const response = await signup(formData);

    if (response && response.error) {
      setError(response.error.message);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen w-full">
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
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
                {error && (
                  <div className="text-sm text-destructive font-bold">
                    {error}
                  </div>
                )}
              </div>

              <Button className="w-full " type="submit">
                Sign Up
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <div className="flex items-center w-full overflow-hidden justify-center">
              <Separator className="" />
              <p className="mx-5">OR</p>
              <Separator className="" />
            </div>

            <Button
              variant={"outline"}
              className="w-full"
              onClick={LoginWithGoogle}
            >
              <Image
                width={24}
                height={24}
                className="mr-2"
                src="google.svg"
                loading="lazy"
                alt="google logo"
              />
              <span>Sign up with Google</span>
            </Button>
            <p className="self-start">
              Already have an account?{" "}
              <Link href={"/login"} className="font-bold text-primary ">
                Log in here.
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
