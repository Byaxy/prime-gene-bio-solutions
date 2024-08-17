"use server";

import { Inventory } from "@/components/Types";
import { supabaseServerClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

type AddInventory = Omit<Inventory, "id" | "createdAt" | "updatedAt">;
type EditInventory = Omit<Inventory, "id" | "createdAt" | "product" | "unit">;

// Get Inventory
export async function getInventory() {
  const supabase = supabaseServerClient();

  const inventory = await supabase
    .from("inventory")
    .select("*")
    .order("createdAt", { ascending: false });

  if (inventory?.error?.message) {
    console.error(inventory.error);
    return { error: inventory?.error?.message };
  }

  revalidatePath("/inventory", "layout");
  return { success: inventory.data };
}

// Add Inventory
export async function addInventory(data: AddInventory) {
  const supabase = supabaseServerClient();

  if (!data.product) return { error: "Product is required" };
  if (!data.lotNumber) return { error: "Lot Number is required" };
  if (!data.cost) return { error: "Cost is required" };
  if (!data.price) return { error: "Price is required" };

  const inventory = await supabase.from("inventory").insert(data);

  if (inventory.error?.message) {
    console.error(inventory.error);
    return { error: inventory.error?.message };
  }

  revalidatePath("/inventory", "layout");
  return { success: inventory.data };
}

// Edit Inventory
export async function editInventory(data: EditInventory, inventoryId: string) {
  const supabase = supabaseServerClient();

  if (!data.lotNumber) return { error: "Lot Number is required" };
  if (!data.cost) return { error: "Cost is required" };
  if (!data.price) return { error: "Price is required" };

  const updatedInventory = await supabase
    .from("inventory")
    .update(data)
    .eq("id", inventoryId);

  if (updatedInventory.error?.message) {
    console.error(updatedInventory.error);
    return { error: updatedInventory.error?.message };
  }

  revalidatePath("/inventory", "layout");
  return { success: updatedInventory.data };
}

// Delete Inventory
export async function deleteInventory(inventoryId: string) {
  const supabase = supabaseServerClient();
  const deletedInventory = await supabase
    .from("inventory")
    .delete()
    .eq("id", inventoryId);

  if (deletedInventory.error?.message) {
    console.error(deletedInventory.error);
    return { error: deletedInventory.error?.message };
  }

  revalidatePath("/inventory", "layout");
  return { success: deletedInventory.data };
}

// Adjust Inventory
export async function adjustInventory(formData: FormData, inventoryId: string) {
  const supabase = supabaseServerClient();
  const data = {
    quantity: formData.get("quantity"),
    updatedAt: formData.get("updatedAt"),
  };

  if (!data.quantity) return { error: "quantity is required" };

  const updatedInventory = await supabase
    .from("inventory")
    .update(data)
    .eq("id", inventoryId);

  if (updatedInventory.error?.message) {
    console.error(updatedInventory.error);
    return { error: updatedInventory.error?.message };
  }

  revalidatePath("/inventory", "layout");
  return { success: updatedInventory.data };
}
