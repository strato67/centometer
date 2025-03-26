"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function login(data: { email: string; password: string }) {
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return { error: { message: error.message } };
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}

export async function signup(data: { email: string; password: string }) {
  const supabase = createClient();

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    return { error: { message: error.message } };
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}

export async function signout() {
  const supabase = createClient();

  const { error } = await supabase.auth.signOut();

  if (!error) {
    redirect("/");
  }
}

export async function changePassword(newPass: string) {
  const supabase = createClient();

  const { error } = await supabase.auth.updateUser({
    password: newPass,
  });

  if (error) {
    return { error: { message: error.message } };
  }
}

export async function changeUsername(data: {
  name: string;
  display_name: string;
}) {
  const supabase = createClient();

  const { error } = await supabase.auth.updateUser({
    data,
  });

  if (error) {
    return { error: { message: error.message } };
  }
}

export async function deleteUser() {
  const supabase = createClient();

  await supabase.functions.invoke("user-self-deletion");

  await supabase.auth.signOut();
  redirect("/");
}
