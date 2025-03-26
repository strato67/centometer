"use client";

import { XIcon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { deleteUser } from "@/app/actions/account";

export default function DeleteAccountCard() {
  return (
    <>
      <Card className="w-full md:w-11/12 lg:w-2/3 ">
        <CardHeader>
          <CardTitle className="text-destructive">Delete Account</CardTitle>
          <CardDescription>
            Deleting your account is permanent and cannot be undone.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DeleteDialog />
        </CardContent>
      </Card>
    </>
  );
}

function DeleteDialog() {
  const [confirmed, setConfirmed] = useState(false);

  const validateField = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmed(value === "delete account");
  };

  const submitRequest = async() => {
    if (confirmed) {
      await deleteUser()
    }
  };

  return (
    <>
      <AlertDialog>
        <Button variant={"destructive"} className="font-bold" asChild>
          <AlertDialogTrigger>Delete your account</AlertDialogTrigger>
        </Button>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="flex w-full items-center ">
              <AlertDialogTitle>
                Do you want to delete your account?
              </AlertDialogTitle>
              <AlertDialogCancel className="ml-auto border-none">
                <XIcon />
              </AlertDialogCancel>
            </div>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <Label className="select-none">
            Type <a className="font-semibold italic">delete account</a> to
            delete your account.
          </Label>
          <Input onChange={validateField} placeholder="delete account"/>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive font-bold text-white"
              disabled={!confirmed}
              onClick={submitRequest}
            >
              Delete Account
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
