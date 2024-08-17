"use server";

import { Option, ProductType } from "@/components/Types";
import { supabaseServerClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

type AddProductType = Omit<ProductType, "id" | "createdAt" | "updatedAt">;
type EditProductType = Omit<ProductType, "id" | "createdAt">;

// Get Product Types
export async function getTypes() {
  const supabase = supabaseServerClient();

  const types = await supabase
    .from("types")
    .select("*")
    .order("createdAt", { ascending: false });

  if (types?.error?.message) {
    console.error(types.error);
    return { error: types?.error?.message };
  }

  revalidatePath("/products/types", "layout");
  return { success: types.data };
}

// Add Type
export async function addType(data: AddProductType) {
  const supabase = supabaseServerClient();

  if (!data.name) {
    return { error: "Name is required" };
  }

  const typeResponse = await supabase.from("types").insert(data);

  if (typeResponse.error?.message) {
    console.error(typeResponse.error);
    return { error: typeResponse.error?.message };
  }

  revalidatePath("/products/types", "layout");
  return { success: typeResponse.data };
}

// Edit Type
export async function editType(data: EditProductType, typeId: string) {
  const supabase = supabaseServerClient();

  if (!data.name) {
    return { error: "Name is required" };
  }

  const updatedType = await supabase
    .from("types")
    .update(data)
    .eq("id", typeId);

  if (updatedType.error?.message) {
    console.error(updatedType.error);
    return { error: updatedType.error?.message };
  }

  revalidatePath("/products/types", "layout");
  return { success: updatedType.data };
}

// Delete Type
export async function deleteType(typeId: string) {
  const supabase = supabaseServerClient();

  if (!typeId) return { error: "Type ID is required" };

  // delete Type from the database
  const deleteType = await supabase.from("types").delete().eq("id", typeId);

  if (deleteType.error?.message) {
    console.error(deleteType.error);
    return { error: deleteType.error?.message };
  }

  revalidatePath("/products/types", "layout");
  return { success: deleteType.data };
}

// get Type Options
export async function getTypeOptions() {
  const response = await getTypes();

  if (response.error) {
    return { error: response.error };
  }

  const typeOptions = response?.success?.map(
    (type) =>
      ({
        label: type.name,
        value: type.name,
      } as Option)
  );

  return { success: typeOptions };
}
