"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { signup } from "../actions/account";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  password: z.string().min(6, { message: "Must be at least 6 characters" }),
  confirmPass: z.string().min(6, { message: "Must be at least 6 characters" }),

}).superRefine((data, ctx) => {
  if (data.password !== data.confirmPass) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Passwords do not match",
      path: ["confirmPass"],
    });
  }
})

export default function SignupPage() {
  const [error, setError] = useState("");
  const { LoginWithGoogle } = useGoogleSSO()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPass: ""
    }
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const response = await signup(data);
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

                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="confirmPass"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel >Confirm Password</FormLabel>
                        <FormControl>
                          <Input
                            id="confirmPass"
                            type="password"
                            placeholder="reenter your password"
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
                  Sign Up
                </Button>
              </form>

            </Form>
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
                alt="Google logo"
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
