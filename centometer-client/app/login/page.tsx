"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import useGoogleSSO from "@/utils/hooks/sso";
import Link from "next/link";
import { login } from "@/app/actions/account";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string({ message: "A password is required" }),
})


export default function LoginPage() {
  const [error, setError] = useState("");
  const { LoginWithGoogle } = useGoogleSSO()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const response = await login(data);
    if (response && response.error) {
      setError(response.error.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-full">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <Link href={"/"}>
              <ArrowLeft />
            </Link>
            Log In
          </CardTitle>
          <CardDescription>
            Enter your email and password to access your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Form {...form}>
            <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel >Email</FormLabel>
                      <FormControl>
                        <Input
                          id="email"
                          type="email"
                          placeholder="someone@example.com"
                          required
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel >Password</FormLabel>
                      <FormControl>
                        <Input
                          id="password"
                          type="password"
                          placeholder="enter a password"
                          required
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {error && (
                <div className="text-sm text-destructive font-bold">
                  {error}
                </div>
              )}
              <Button className="w-full mt-2 " type="submit">
                Log In
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <div className="flex items-center w-full justify-center overflow-hidden">
            <Separator className="" />
            <p className="mx-5">OR</p>
            <Separator className="" />
          </div>

          <Button
            className="w-full"
            variant={"outline"}
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
            <span>Log in with Google</span>
          </Button>
          <p className="self-start">
            Don&#39;t have an account?{" "}
            <Link href={"/signup"} className="font-bold text-primary ">
              Sign up here.
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
