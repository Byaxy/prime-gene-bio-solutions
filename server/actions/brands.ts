"use server";

import { Brand, Option } from "@/components/Types";
import { supabaseServerClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

type AddBrand = Omit<Brand, "id" | "createdAt" | "updatedAt">;
type EditBrand = Omit<Brand, "id" | "createdAt">;

// Get Product Brands
export async function getBrands() {
  const supabase = supabaseServerClient();

  const brands = await supabase
    .from("brands")
    .select("*")
    .order("createdAt", { ascending: false });

  if (brands?.error?.message) {
    console.error(brands.error);
    return { error: brands?.error?.message };
  }

  revalidatePath("/products/brands", "layout");
  return { success: brands.data };
}

// Add Brand
export async function addBrand(data: AddBrand) {
  const supabase = supabaseServerClient();

  if (!data.name) {
    return { error: "Name is required" };
  }

  const brand = await supabase.from("brands").insert(data);

  if (brand.error?.message) {
    console.error(brand.error);
    return { error: brand.error?.message };
  }

  revalidatePath("/products/brands", "layout");
  return { success: brand.data };
}

// Edit Brand
export async function editBrand(data: EditBrand, brandId: string) {
  const supabase = supabaseServerClient();

  if (!data.name) {
    return { error: "Name is required" };
  }

  const updatedBrand = await supabase
    .from("brands")
    .update(data)
    .eq("id", brandId);

  if (updatedBrand.error?.message) {
    console.error(updatedBrand.error);
    return { error: updatedBrand.error?.message };
  }

  revalidatePath("/products/brands", "layout");
  return { success: updatedBrand.data };
}

// Delete Brand
export async function deleteBrand(brandId: string) {
  const supabase = supabaseServerClient();

  if (!brandId) return { error: "Brand ID is required" };

  // delete Brand from the database
  const deleteBrand = await supabase.from("brands").delete().eq("id", brandId);

  if (deleteBrand.error?.message) {
    console.error(deleteBrand.error);
    return { error: deleteBrand.error?.message };
  }

  revalidatePath("/products/brands", "layout");
  return { success: deleteBrand.data };
}

// get Brand Options
export async function getBrandOptions() {
  const response = await getBrands();

  if (response.error) {
    return { error: response.error };
  }

  const brandOptions = response?.success?.map(
    (brand) =>
      ({
        label: brand.name,
        value: brand.name,
      } as Option)
  );

  return { success: brandOptions };
}
