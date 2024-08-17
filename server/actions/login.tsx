"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { supabaseServerClient } from "@/utils/supabase/server";

type FormInput = {
  email: string;
  password: string;
};

export async function login(data: FormInput) {
  const supabase = supabaseServerClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  if (!data.email) {
    return { error: "Email is required" };
  }

  if (!data.password) {
    return { error: "Password is required" };
  }

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/", "layout");
  redirect("/");

  return { success: "Login Successful" };
}
