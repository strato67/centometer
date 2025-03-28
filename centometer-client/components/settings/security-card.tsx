"use client";

import { ChevronDown, ChevronUp, LockOpenIcon, LogInIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import LoadingCard from "../loading-card";
import { changePassword } from "@/app/actions/account";
import { toast } from "sonner";

type Metadata = {
  last_sign_in: string;
  provider: string;
};

const formSchema = z
  .object({
    newPass: z.string().min(6, { message: "Must be at least 6 characters" }),
    confirmPass: z
      .string()
      .min(6, { message: "Must be at least 6 characters" }),
  })
  .superRefine((data, ctx) => {
    if (data.newPass !== data.confirmPass) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["confirmPass"],
      });
    }
  });

export default function SecurityCard() {
  const supabase = createClient();

  const [userMetadata, setUserMetadata] = useState<Metadata>();

  useEffect(() => {
    const getUser = async () => {
      const user = await supabase.auth.getUser();
      const identity = await supabase.auth.getUserIdentities();
      setUserMetadata({
        last_sign_in: user?.data.user?.last_sign_in_at || "N/A",
        provider: identity.data?.identities[0].provider || "",
      });
    };
    getUser();
  }, [supabase]);

  if (!userMetadata) {
    return <LoadingCard className="w-full md:w-11/12 lg:w-2/3" />;
  }

  return (
    <>
      <Card className="w-full md:w-11/12 lg:w-2/3">
        <CardHeader>
          <CardTitle>Security</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-2 rounded-full bg-muted">
                  <LockOpenIcon className="h-5 w-5" />
                </div>
                <div>
                  <Label className="text-base">Last Login</Label>
                </div>
              </div>
              <p>
                {userMetadata?.last_sign_in
                  ? new Date(userMetadata?.last_sign_in).toLocaleString()
                  : "N/A"}
              </p>
            </div>

            {userMetadata.provider === "email" && <ChangePasswordCard />}
          </div>
        </CardContent>
      </Card>
    </>
  );
}

function ChangePasswordCard() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (values.confirmPass === values.newPass) {
      const passChangeRequest = await changePassword(values.newPass);
      passChangeRequest?.error
        ? toast.error(passChangeRequest.error.message)
        : toast.success("Password successfully changed.");
    }
  };
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="flex flex-col"
    >
      <CollapsibleTrigger>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-2 rounded-full bg-muted">
              <LogInIcon className="h-5 w-5" />
            </div>
            <div className="flex flex-col items-center">
              <Label className="text-base">Change Password</Label>
            </div>
          </div>
          <Button
            variant={"ghost"}
            size={"icon"}
            className="w-fit self-end hover:bg-inherit "
          >
            {isOpen ? <ChevronUp /> : <ChevronDown />}
          </Button>
        </div>
      </CollapsibleTrigger>

      <CollapsibleContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4 "
          >
            <FormField
              control={form.control}
              name="newPass"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="enter your new password"
                      required
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPass"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="reenter your new password"
                      required
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </Form>
      </CollapsibleContent>
    </Collapsible>
  );
}
