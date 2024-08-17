"use server";

import { Customer, Option } from "@/components/Types";
import { supabaseServerClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

type AddCustomer = Omit<Customer, "id" | "createdAt" | "updatedAt">;
type EditCustomer = Omit<Customer, "id" | "createdAt">;

// Get Customers
export async function getCustomers() {
  const supabase = supabaseServerClient();

  const customers = await supabase
    .from("customers")
    .select("*")
    .order("createdAt", { ascending: false });

  if (customers?.error?.message) {
    console.error(customers.error);
    return { error: customers?.error?.message };
  }

  revalidatePath("/customers", "layout");
  return { success: customers.data };
}

// Add Customer
export async function addCustomer(data: AddCustomer) {
  const supabase = supabaseServerClient();

  if (!data.name) return { error: "Name is required" };
  if (!data.address) return { error: "Address is required" };

  const customer = await supabase.from("customers").insert(data);

  if (customer.error?.message) {
    console.error(customer.error);
    return { error: customer.error?.message };
  }

  revalidatePath("/customers", "layout");
  return { success: customer.data };
}

// Edit Customer
export async function editCustomer(data: EditCustomer, customerId: string) {
  const supabase = supabaseServerClient();

  if (!data.name) return { error: "Name is required" };
  if (!data.address) return { error: "Address is required" };

  const updatedCustomer = await supabase
    .from("customers")
    .update(data)
    .eq("id", customerId);

  if (updatedCustomer.error?.message) {
    console.error(updatedCustomer.error);
    return { error: updatedCustomer.error?.message };
  }

  revalidatePath("/customers", "layout");
  return { success: updatedCustomer.data };
}

// Delete Customer
export async function deleteCustomer(customerId: string) {
  const supabase = supabaseServerClient();

  if (!customerId) return { error: "Customer ID is required" };

  // delete customer from the database
  const deleteCustomer = await supabase
    .from("customers")
    .delete()
    .eq("id", customerId);

  if (deleteCustomer.error?.message) {
    console.error(deleteCustomer.error);
    return { error: deleteCustomer.error?.message };
  }

  revalidatePath("/customers", "layout");
  return { success: deleteCustomer.data };
}

// Get Customer Options
export async function getCustomerOptions() {
  const customerOptions = await getCustomers();

  if (customerOptions.error) {
    return { error: customerOptions.error };
  }
  if (customerOptions.success) {
    const options: Option[] = customerOptions.success.map((customer) => ({
      value: customer.name,
      label: customer.name,
    }));

    revalidatePath("/customers/groups", "layout");
    return { success: options };
  }
}
