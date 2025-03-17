import ProfileCard from "@/components/settings/profile-card";
import PreferencesCard from "@/components/settings/preferences-card";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SecurityCard from "@/components/settings/security-card";

export default function Page() {
  return (
    <>
      <div className="my-2 md:my-6 w-full">
        <h1 className="text-4xl font-bold mb-4">Settings</h1>
        <div className="flex flex-col items-center  gap-8 ">
          <ProfileCard />
          <SecurityCard/>

          <PreferencesCard />

          <Card className="w-full md:w-11/12 lg:w-2/3 ">
            <CardHeader>
              <CardTitle className="text-destructive">Delete Account</CardTitle>
              <CardDescription>
                Deleting your account is permanent and cannot be undone.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="">
                <Button variant={"destructive"} className="font-bold">
                  Delete your account
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
