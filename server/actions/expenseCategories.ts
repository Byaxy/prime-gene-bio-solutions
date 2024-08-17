"use server";

import { ExpenseCategory, Option } from "@/components/Types";
import { supabaseServerClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

type AddExpenseCategory = Omit<
  ExpenseCategory,
  "id" | "createdAt" | "updatedAt"
>;
type EditExpenseCategory = Omit<ExpenseCategory, "id" | "createdAt">;

// Get Expense Categories
export async function getExpenseCategories() {
  const supabase = supabaseServerClient();

  const expenseCategories = await supabase
    .from("expense_categories")
    .select("*")
    .order("createdAt", { ascending: false });

  if (expenseCategories?.error?.message) {
    console.error(expenseCategories.error);
    return { error: expenseCategories?.error?.message };
  }

  revalidatePath("/expenses/categories", "layout");
  return { success: expenseCategories.data };
}

// Add Expense Category
export async function addExpenseCategory(data: AddExpenseCategory) {
  const supabase = supabaseServerClient();

  if (!data.name) return { error: "Name is required" };

  const expenseCategory = await supabase
    .from("expense_categories")
    .insert(data);

  if (expenseCategory.error?.message) {
    console.error(expenseCategory.error);
    return { error: expenseCategory.error?.message };
  }

  revalidatePath("/expenses/categories", "layout");
  return { success: expenseCategory.data };
}

// Edit Expense Category
export async function editExpenseCategory(
  data: EditExpenseCategory,
  expenseCategoryId: string
) {
  const supabase = supabaseServerClient();

  if (!data.name) return { error: "Name is required" };

  const updatedExpenseCategory = await supabase
    .from("expense_categories")
    .update(data)
    .eq("id", expenseCategoryId);

  if (updatedExpenseCategory.error?.message) {
    console.error(updatedExpenseCategory.error);
    return { error: updatedExpenseCategory.error?.message };
  }

  revalidatePath("/expenses/categories", "layout");
  return { success: updatedExpenseCategory.data };
}

// Delete Expense Category
export async function deleteExpenseCategory(expenseCategoryId: string) {
  const supabase = supabaseServerClient();

  const deletedExpenseCategory = await supabase
    .from("expense_categories")
    .delete()
    .eq("id", expenseCategoryId);

  if (deletedExpenseCategory.error?.message) {
    console.error(deletedExpenseCategory.error);
    return { error: deletedExpenseCategory.error?.message };
  }

  revalidatePath("/expenses/categories", "layout");
  return { success: deletedExpenseCategory.data };
}

// Get Expense Category Options
export async function getExpenseCategoryOptions() {
  const expenseCategories = await getExpenseCategories();

  if (expenseCategories.error) {
    return { error: expenseCategories.error };
  }
  if (expenseCategories.success) {
    const options: Option[] = expenseCategories.success.map((group) => ({
      value: group.name,
      label: group.name,
    }));

    revalidatePath("/expenses/categories", "layout");
    return { success: options };
  }
}
