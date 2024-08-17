"use server";

import { supabaseServerAdmin } from "@/utils/supabase/serverAdmin";
import { revalidatePath } from "next/cache";

export async function signup(formData: FormData) {
  const supabase = supabaseServerAdmin();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    name: formData.get("name") as string,
    phone: formData.get("phone") as string,
    role: formData.get("role") as string,
  };

  // create supabase user account
  const createAccountResult = await supabase.auth.admin.createUser({
    email: data.email,
    password: data.password,
    email_confirm: true,
    user_metadata: {
      name: data.name,
      phone: data.phone,
      role: data.role,
    },
  });

  if (createAccountResult.error?.message) {
    return JSON.stringify(createAccountResult);
  } else {
    // Insert above created User account details into the "users" database table
    const createUserResult = await supabase.from("users").insert({
      id: createAccountResult.data.user?.id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: data.role,
      createdAt: createAccountResult.data.user?.created_at,
      updatedAt: createAccountResult.data.user?.updated_at,
    });

    revalidatePath("/users", "layout");
    return JSON.stringify(createUserResult);
  }
}
