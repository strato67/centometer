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
import { createClient } from "@/utils/supabase/server";

export default async function ProfileCard() {

  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const joinDate = new Date(user?.created_at!)

  return (
    <>
      <Card className="w-full md:w-11/12 lg:w-2/3">
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid justify-center grid-flow-row md:grid-flow-col w-full md:justify-normal gap-4 ">
            <div className="md:col-span-1 flex items-center justify-center flex-col max-w-96 gap-2 mt-4 ">
              <Avatar className="w-24 h-24">
                <AvatarImage
                  src={user?.user_metadata.picture}
                  alt={user?.user_metadata.name}
                />
                <AvatarFallback>{user?.user_metadata.email.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <Separator className="w-24" decorative />
              <p className="text-sm text-center whitespace-nowrap ">
                Joined on {joinDate.toLocaleDateString()}
              </p>
            </div>

            <div className="md:col-span-3 grid min-w-96 items-center gap-y-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder={user?.email} disabled readOnly/>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="username">Username</Label>
                <Input id="username" placeholder="Enter a username" defaultValue={user?.user_metadata.name || ""}/>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end items-center w-full">
          <Button variant={"default"}>Save Changes</Button>
        </CardFooter>
      </Card>
    </>
  );
}
