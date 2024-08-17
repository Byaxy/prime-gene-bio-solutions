"use server";

import { CustomerGroup, Option } from "@/components/Types";
import { supabaseServerClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

type AddCustomerGroup = Omit<CustomerGroup, "id" | "createdAt" | "updatedAt">;
type EditCustomerGroup = Omit<CustomerGroup, "id" | "createdAt">;

// Get Customer Groups
export async function getCustomerGroups() {
  const supabase = supabaseServerClient();

  const customerGroups = await supabase
    .from("customer_groups")
    .select("*")
    .order("createdAt", { ascending: false });

  if (customerGroups?.error?.message) {
    console.error(customerGroups.error);
    return { error: customerGroups?.error?.message };
  }

  revalidatePath("/customers/groups", "layout");
  return { success: customerGroups.data };
}

// Add Customer Group
export async function addCustomerGroup(data: AddCustomerGroup) {
  const supabase = supabaseServerClient();

  if (!data.name) return { error: "Name is required" };

  const customerGroup = await supabase.from("customer_groups").insert(data);

  if (customerGroup.error?.message) {
    console.error(customerGroup.error);
    return { error: customerGroup.error?.message };
  }

  revalidatePath("/customers/groups", "layout");
  return { success: customerGroup.data };
}

// Edit Customer Group
export async function editCustomerGroup(
  data: EditCustomerGroup,
  customerGroupId: string
) {
  const supabase = supabaseServerClient();

  if (!data.name) return { error: "Name is required" };

  const updatedCustomerGroup = await supabase
    .from("customer_groups")
    .update(data)
    .eq("id", customerGroupId);

  if (updatedCustomerGroup.error?.message) {
    console.error(updatedCustomerGroup.error);
    return { error: updatedCustomerGroup.error?.message };
  }

  revalidatePath("/customers/groups", "layout");
  return { success: updatedCustomerGroup.data };
}

// Delete Customer Group
export async function deleteCustomerGroup(customerGroupId: string) {
  const supabase = supabaseServerClient();

  const deletedCustomerGroup = await supabase
    .from("customer_groups")
    .delete()
    .eq("id", customerGroupId);

  if (deletedCustomerGroup.error?.message) {
    console.error(deletedCustomerGroup.error);
    return { error: deletedCustomerGroup.error?.message };
  }

  revalidatePath("/customers/groups", "layout");
  return { success: deletedCustomerGroup.data };
}

// Get Customer Group Options
export async function getCustomerGroupOptions() {
  const customerGroups = await getCustomerGroups();

  if (customerGroups.error) {
    return { error: customerGroups.error };
  }
  if (customerGroups.success) {
    const options: Option[] = customerGroups.success.map((group) => ({
      value: group.name,
      label: group.name,
    }));

    revalidatePath("/customers/groups", "layout");
    return { success: options };
  }
}
