"use server";

import { Option, Unit } from "@/components/Types";
import { supabaseServerClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

type AddUnit = Omit<Unit, "id" | "createdAt" | "updatedAt">;
type EditUnit = Omit<Unit, "id" | "createdAt">;

// Get Units
export async function getUnits() {
  const supabase = supabaseServerClient();

  const units = await supabase
    .from("units")
    .select("*")
    .order("createdAt", { ascending: false });

  if (units?.error?.message) {
    console.error(units.error);
    return { error: units?.error?.message };
  }

  revalidatePath("/products/units", "layout");
  return { success: units.data };
}

// Add Unit
export async function addUnit(data: AddUnit) {
  const supabase = supabaseServerClient();

  if (!data.name) {
    return { error: "Name is required" };
  }
  if (!data.code) {
    return { error: "Code is required" };
  }

  const unit = await supabase.from("units").insert(data);

  if (unit.error?.message) {
    console.error(unit.error);
    return { error: unit.error?.message };
  }

  revalidatePath("/products/units", "layout");
  return { success: unit.data };
}

// Edit Unit
export async function editUnit(data: EditUnit, unitId: string) {
  const supabase = supabaseServerClient();

  if (!data.name) {
    return { error: "Name is required" };
  }
  if (!data.code) {
    return { error: "Code is required" };
  }

  const updatedUnit = await supabase
    .from("units")
    .update(data)
    .eq("id", unitId);

  if (updatedUnit.error?.message) {
    console.error(updatedUnit.error);
    return { error: updatedUnit.error?.message };
  }

  revalidatePath("/products/units", "layout");
  return { success: updatedUnit.data };
}

// Delete Unit
export async function deleteUnit(unitId: string) {
  const supabase = supabaseServerClient();

  if (!unitId) return { error: "Unit ID is required" };

  // delete user from the users table
  const deleteUnit = await supabase.from("units").delete().eq("id", unitId);

  if (deleteUnit.error?.message) {
    console.error(deleteUnit.error);
    return { error: deleteUnit.error?.message };
  }

  revalidatePath("/products/units", "layout");
  return { success: deleteUnit.data };
}

// get Units Options
export async function getUnitOptions() {
  const response = await getUnits();

  if (response.error) {
    return { error: response.error };
  }

  const unitOptions = response?.success?.map(
    (unit) =>
      ({
        label: unit.name,
        value: unit.code,
      } as Option)
  );

  return { success: unitOptions };
}
