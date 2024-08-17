"use server";

import { Option, Product } from "@/components/Types";
import { supabaseServerClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

type AddProduct = Omit<Product, "id" | "createdAt" | "updatedAt">;
type EditProduct = Omit<Product, "id" | "createdAt">;

// Get Products
export async function getProducts() {
  const supabase = supabaseServerClient();

  const products = await supabase
    .from("products")
    .select("*")
    .order("createdAt", { ascending: false });

  if (products?.error?.message) {
    console.error(products.error);
    return { error: products?.error?.message };
  }

  if (products.data) {
    const data = products.data as Product[];
    revalidatePath("/products", "layout");
    return { success: data };
  }
}

// Add Product
export async function addProduct(data: AddProduct) {
  const supabase = supabaseServerClient();

  // handle validation of key values
  if (!data.name) return { error: "Name is required" };
  if (!data.code) return { error: "Code is required" };
  if (!data.brand) return { error: "Brand is required" };
  if (!data.type) return { error: "Type is required" };
  if (!data.unit) return { error: "Unit is required" };
  if (!data.category) return { error: "Category is required" };

  const product = await supabase.from("products").insert(data);

  if (product.error?.message) {
    console.error(product.error);
    return { error: product.error?.message };
  }

  revalidatePath("/products", "layout");
  return { success: product.data };
}

// Edit Product
export async function editProduct(data: EditProduct, productId: string) {
  const supabase = supabaseServerClient();

  // handle validation of key values
  if (!data.name) return { error: "Name is required" };
  if (!data.code) return { error: "Code is required" };
  if (!data.brand) return { error: "Brand is required" };
  if (!data.type) return { error: "Type is required" };
  if (!data.unit) return { error: "Unit is required" };
  if (!data.category) return { error: "Category is required" };

  const updatedProduct = await supabase
    .from("products")
    .update(data)
    .eq("id", productId);

  if (updatedProduct.error?.message) {
    console.error(updatedProduct.error);
    return { error: updatedProduct.error?.message };
  }

  revalidatePath("/products", "layout");
  return { success: updatedProduct.data };
}

// Delete Product
export async function deleteProduct(productId: string) {
  const supabase = supabaseServerClient();

  if (!productId) return { error: "Product ID is required" };

  const deleteProduct = await supabase
    .from("products")
    .delete()
    .eq("id", productId);

  if (deleteProduct.error?.message) {
    console.error(deleteProduct.error);
    return { error: deleteProduct.error?.message };
  }

  revalidatePath("/products", "layout");
  return { success: deleteProduct.data };
}

// get Product Options
export async function getProductOptions() {
  const response = await getProducts();

  if (response?.error) {
    return { error: response.error };
  }

  const productOptions = response?.success?.map(
    (product) =>
      ({
        label: product.name,
        value: product.name,
      } as Option)
  );

  return { success: productOptions };
}
