"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import LoadingCard from "../loading-card";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { changeUsername } from "@/app/actions/account";

const formSchema = z.object({
  username: z.string().max(30).transform(value => value.replace(/\s+/g, '')),
});

export default function ProfileCard() {
  const supabase = createClient();
  const [userData, setUserData] = useState<User | null>();
  const [joinDate, setJoinDate] = useState<Date>();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUserData(user);
      setJoinDate(new Date(user?.created_at!));
    };
    getUser();
  }, [supabase]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (values.username) {
      const nameChangeRequest = await changeUsername({
        name: values.username,
        display_name: values.username,
      });
      nameChangeRequest?.error
        ? toast.error(nameChangeRequest.error.message)
        : toast.success("Username successfully changed.");
    }
  };

  if (!userData || !joinDate) {
    return <LoadingCard className="w-full md:w-11/12 lg:w-2/3 min-h-72" />;
  }

  return (
    <>
      <Card className="w-full md:w-11/12 lg:w-2/3">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4 "
          >
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid justify-center grid-flow-row md:grid-flow-col w-full md:justify-normal gap-4 ">
                <div className="md:col-span-1 flex items-center justify-center flex-col max-w-96 gap-2 mt-4 ">
                  <Avatar className="w-24 h-24 select-none">
                    <AvatarImage
                      src={userData?.user_metadata.picture}
                      alt={userData?.user_metadata.name}
                    />
                    <AvatarFallback>
                      {userData?.user_metadata.email.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <Separator className="w-24" decorative />
                  <p className="text-sm text-center whitespace-nowrap ">
                    Joined on {joinDate?.toLocaleDateString()}
                  </p>
                </div>

                <div className="md:col-span-3 grid w-80 md:w-full items-center gap-y-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      placeholder={userData?.email}
                      disabled
                      readOnly
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter a username"
                            id="username"
                            defaultValue={userData?.user_metadata.name || ""}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end items-center w-full">
              <Button variant={"default"} type="submit">
                Save Changes
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </>
  );
}
