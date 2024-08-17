"use server";

import { Expense } from "@/components/Types";
import { supabaseServerClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

type AddExpense = Omit<Expense, "id" | "updatedAt" | "createdAt">;
type EditExpense = Omit<Expense, "id" | "updatedAt" | "createdAt">;

// Get Expenses
export async function getExpenses() {
  const supabase = supabaseServerClient();

  const expenses = await supabase
    .from("expenses")
    .select("*")
    .order("createdAt", { ascending: false });

  if (expenses?.error?.message) {
    console.error(expenses.error);
    return { error: expenses?.error?.message };
  }

  revalidatePath("/expenses", "layout");
  return { success: expenses.data };
}

// Add Expense
export async function addExpense(data: AddExpense) {
  const supabase = supabaseServerClient();

  if (!data.title) return { error: "Title is required" };
  if (!data.amount) return { error: "Amount is required" };
  if (!data.category) return { error: "Category is required" };

  const expense = await supabase.from("expenses").insert(data);

  if (expense.error?.message) {
    console.error(expense.error);
    return { error: expense.error?.message };
  }

  revalidatePath("/expenses", "layout");
  return { success: expense.data };
}

// Edit Expense
export async function editExpense(data: EditExpense, expenseId: string) {
  const supabase = supabaseServerClient();

  if (!data.title) return { error: "Title is required" };
  if (!data.amount) return { error: "Amount is required" };
  if (!data.category) return { error: "Category is required" };

  const updatedExpense = await supabase
    .from("expenses")
    .update(data)
    .eq("id", expenseId);

  if (updatedExpense.error?.message) {
    console.error(updatedExpense.error);
    return { error: updatedExpense.error?.message };
  }

  revalidatePath("/expenses", "layout");
  return { success: updatedExpense.data };
}

// Delete Expense
export async function deleteExpense(expenseId: string) {
  const supabase = supabaseServerClient();

  if (!expenseId) return { error: "Customer ID is required" };

  // delete customer from the database
  const deleteExpense = await supabase
    .from("expenses")
    .delete()
    .eq("id", expenseId);

  if (deleteExpense.error?.message) {
    console.error(deleteExpense.error);
    return { error: deleteExpense.error?.message };
  }

  revalidatePath("/expenses", "layout");
  return { success: deleteExpense.data };
}
