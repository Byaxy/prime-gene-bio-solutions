"use server";

import { User } from "@/components/Types";
import { supabaseServerAdmin } from "@/utils/supabase/serverAdmin";
import { revalidatePath } from "next/cache";

type EditUser = Omit<User, "id" | "createdAt">;

// get currently logged in User
export async function getUser() {
  const supabase = supabaseServerAdmin();
  const user = await supabase.auth.getUser();

  return user;
}

// get users
export async function getUsers() {
  const supabase = supabaseServerAdmin();

  const users = await supabase
    .from("users")
    .select("*")
    .order("createdAt", { ascending: false });

  if (users.error) {
    console.error(users.error);
    return { error: "Server Error: Failed to fetch users" };
  }

  revalidatePath("/users", "layout");
  return { success: users.data };
}

// edit User
export async function editUser(data: EditUser, userId: string) {
  const supabase = supabaseServerAdmin();

  if (!data.name) return { error: "Name is required" };
  if (!data.email) return { error: "Email is required" };

  // update User Account details
  const updateAccount = await supabase.auth.admin.updateUserById(userId, {
    user_metadata: {
      name: data.name,
      phone: data.phone,
      role: data.role,
      updatedAt: data.updatedAt,
    },
  });

  if (updateAccount?.error?.message) {
    console.error(updateAccount?.error);
    return { error: updateAccount?.error?.message };
  } else {
    // update the user in the users table
    const updatedUser = await supabase
      .from("users")
      .update(data)
      .eq("id", userId);

    if (updatedUser?.error?.message) {
      console.error(updatedUser.error);
      return { error: updatedUser?.error?.message };
    }

    revalidatePath("/users", "layout");
    return { success: updatedUser.data };
  }
}

// delete User
export async function deleteUser(userId: string) {
  const supabase = supabaseServerAdmin();

  // check if user is a registered user
  const isUser = await supabase.auth.admin.getUserById(userId);

  if (isUser?.error?.message) {
    console.error(isUser.error);
    return { error: "Server Error: Not a registered user" };
  }
  if (isUser?.data) {
    // delete user account
    const deleteAccount = await supabase.auth.admin.deleteUser(userId);

    if (deleteAccount.error?.message) {
      console.error(deleteAccount.error);
      return { error: deleteAccount.error?.message };
    }

    // delete user from the users table
    const deleteUser = await supabase.from("users").delete().eq("id", userId);

    if (deleteUser.error?.message) {
      console.error(deleteUser.error);
      return { error: deleteUser.error?.message };
    }

    revalidatePath("/users", "layout");
    return { success: deleteUser.data };
  }
}
