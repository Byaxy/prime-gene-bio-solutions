"use server";

import { Option, ProductCategory } from "@/components/Types";
import { supabaseServerClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

type AddProductCategory = Omit<
  ProductCategory,
  "id" | "createdAt" | "updatedAt"
>;
type EditProductCategory = Omit<ProductCategory, "id" | "createdAt">;

// Get Product Categories
export async function getCategories() {
  const supabase = supabaseServerClient();

  const categories = await supabase
    .from("categories")
    .select("*")
    .order("createdAt", { ascending: false });

  if (categories?.error?.message) {
    console.error(categories.error);
    return { error: categories?.error?.message };
  }

  revalidatePath("/products/categories", "layout");
  return { success: categories.data };
}

// Add Category
export async function addCategory(data: AddProductCategory) {
  const supabase = supabaseServerClient();

  if (!data.name) {
    return { error: "Name is required" };
  }

  const category = await supabase.from("categories").insert(data);

  if (category.error?.message) {
    console.error(category.error);
    return { error: category.error?.message };
  }

  revalidatePath("/products/categories", "layout");
  return { success: category.data };
}

// Edit Category
export async function editCategory(
  data: EditProductCategory,
  categoryId: string
) {
  const supabase = supabaseServerClient();

  if (!data.name) {
    return { error: "Name is required" };
  }

  const updatedCategory = await supabase
    .from("categories")
    .update(data)
    .eq("id", categoryId);

  if (updatedCategory.error?.message) {
    console.error(updatedCategory.error);
    return { error: updatedCategory.error?.message };
  }

  revalidatePath("/products/categories", "layout");
  return { success: updatedCategory.data };
}

// Delete Category
export async function deleteCategory(categoryId: string) {
  const supabase = supabaseServerClient();

  if (!categoryId) return { error: "Category ID is required" };

  const deleteCategory = await supabase
    .from("categories")
    .delete()
    .eq("id", categoryId);

  if (deleteCategory.error?.message) {
    console.error(deleteCategory.error);
    return { error: deleteCategory.error?.message };
  }

  revalidatePath("/products/categories", "layout");
  return { success: deleteCategory.data };
}

// get Category Options
export async function getCategoryOptions() {
  const response = await getCategories();

  if (response.error) {
    return { error: response.error };
  }

  const categoryOptions = response?.success?.map(
    (category) =>
      ({
        label: category.name,
        value: category.name,
      } as Option)
  );

  return { success: categoryOptions };
}
