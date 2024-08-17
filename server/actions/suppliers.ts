"use server";

import { Supplier } from "@/components/Types";
import { supabaseServerClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

type AddSupplier = Omit<Supplier, "id" | "createdAt" | "updatedAt">;
type EditSupplier = Omit<Supplier, "id" | "createdAt">;

// Get Suppliers
export async function getSuppliers() {
  const supabase = supabaseServerClient();

  const suppliers = await supabase
    .from("suppliers")
    .select("*")
    .order("createdAt", { ascending: false });

  if (suppliers?.error?.message) {
    console.error(suppliers.error);
    return { error: suppliers?.error?.message };
  }

  revalidatePath("/suppliers", "layout");
  return { success: suppliers.data };
}

// Add Supplier
export async function addSupplier(data: AddSupplier) {
  const supabase = supabaseServerClient();

  if (!data.name) return { error: "Name is required" };
  if (!data.address) return { error: "Address is required" };
  if (!data.phone) return { error: "Phone Number is required" };

  const supplier = await supabase.from("suppliers").insert(data);

  if (
    supplier.error?.message ===
    'duplicate key value violates unique constraint "suppliers_name_key"'
  ) {
    return { error: "Supplier with the same name already exists" };
  }

  if (supplier.error?.message) {
    console.error(supplier.error);
    return { error: supplier.error?.message };
  }

  revalidatePath("/suppliers", "layout");
  return { success: supplier.data };
}

// Edit Supplier
export async function editSupplier(data: EditSupplier, supplierId: string) {
  const supabase = supabaseServerClient();

  if (!data.name) return { error: "Name is required" };
  if (!data.address) return { error: "Address is required" };
  if (!data.phone) return { error: "Phone Number is required" };

  const updatedSupplier = await supabase
    .from("suppliers")
    .update(data)
    .eq("id", supplierId);

  if (updatedSupplier.error?.message) {
    console.error(updatedSupplier.error);
    return { error: updatedSupplier.error?.message };
  }

  revalidatePath("/suppliers", "layout");
  return { success: updatedSupplier.data };
}

// Delete Supplier
export async function deleteSupplier(supplierId: string) {
  const supabase = supabaseServerClient();

  if (!supplierId) return { error: "Supplier ID is required" };

  // delete supplier from the database
  const deleteSupplier = await supabase
    .from("suppliers")
    .delete()
    .eq("id", supplierId);

  if (deleteSupplier.error?.message) {
    console.error(deleteSupplier.error);
    return { error: deleteSupplier.error?.message };
  }

  revalidatePath("/suppliers", "layout");
  return { success: deleteSupplier.data };
}
