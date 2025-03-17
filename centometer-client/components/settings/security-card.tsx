"use client";

import { LockOpenIcon, LogInIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

type Metadata = {
  last_sign_in: string;
};

export default function SecurityCard() {
  const supabase = createClient();

  const [userMetadata, setUserMetadata] = useState<Metadata>();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUserMetadata({
        last_sign_in: user?.last_sign_in_at || "N/A",
      });
    };
    getUser();
  }, [supabase]);

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
                  <Label htmlFor="reset-layout" className="text-base">
                    Last Login
                  </Label>
                </div>
              </div>
              <p>
                {userMetadata?.last_sign_in
                  ? new Date(userMetadata?.last_sign_in).toLocaleString()
                  : "N/A"}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-2 rounded-full bg-muted">
                  <LogInIcon className="h-5 w-5" />
                </div>
                <div>
                  <Label htmlFor="reset-layout" className="text-base">
                    Change Password
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Reset your dashboard to default layout
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
