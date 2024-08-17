"use server";

import { Sale } from "@/components/Types";
import { supabaseServerClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

type AddSale = Omit<Sale, "id" | "createdAt" | "updatedAt">;

// Get Sales
export async function getSales() {
  const supabase = supabaseServerClient();

  const sales = await supabase
    .from("sales")
    .select("*")
    .order("createdAt", { ascending: false });

  if (sales?.error?.message) {
    console.error(sales.error);
    return { error: sales?.error?.message };
  }

  revalidatePath("/sales", "layout");
  return { success: sales.data };
}

// Add Sale
export async function addSale(data: AddSale) {
  const supabase = supabaseServerClient();

  const saleProducts = data.products;

  // add sale to sales table
  const addSaleResult = await supabase.from("sales").insert({
    invoiceNumber: data.invoiceNumber,
    purchaseOrderNumber: data.purchaseOrderNumber,
    customer: data.customer,
    taxAmount: data.taxAmount,
    subTotal: data.subTotal,
    total: data.total,
    amountPaid: data.amountPaid,
    paymentStatus: data.paymentStatus,
    saleStatus: data.saleStatus,
    notes: data.notes,
  });

  if (addSaleResult.error?.message) {
    console.error(addSaleResult.error);
    return { error: addSaleResult.error?.message };
  } else {
    // Insert the sale products into the sale_products table
    const addSaleProductsResult = await supabase
      .from("sale_products")
      .insert({ saleProducts });

    if (addSaleProductsResult.error?.message) {
      console.error(addSaleProductsResult.error);
      return { error: addSaleProductsResult.error?.message };
    }

    revalidatePath("/sales", "layout");
    return { success: "Sale added successfully" };
  }
}
