// lib/queries/budget.ts
import { db } from "@/db";
import { budgets, transactions, notificationSettings } from "@/db/schema";
import { eq, and, between, sql } from "drizzle-orm";

interface Budget {
  id?: number;
  kindeId: string;
  name: string;
  categoryId: number;
  amount: number;
  startDate: Date;
  endDate: Date;
  notificationThreshold: number;
}

// Helper to calculate spending for a budget
async function calculateBudgetSpending(
  kindeId: string,
  categoryId: number,
  startDate: Date,
  endDate: Date
) {
  const result = await db
    .select({
      total: sql`COALESCE(SUM(CASE WHEN type = 'EXPENSE' THEN amount ELSE 0 END), 0)`,
    })
    .from(transactions)
    .where(
      and(
        eq(transactions.kindeId, kindeId),
        eq(transactions.categoryId, categoryId),
        between(transactions.date, startDate, endDate)
      )
    );

  return Number(result[0].total);
}

// Get budgets with spending information
export const getBudgets = async (kindeId: string) => {
  // Get all budgets
  const userBudgets = await db
    .select()
    .from(budgets)
    .where(eq(budgets.kindeId, kindeId));

  // Calculate current spending for each budget
  const budgetsWithSpending = await Promise.all(
    userBudgets.map(async (budget) => {
      const spent = await calculateBudgetSpending(
        kindeId,
        budget.categoryId,
        budget.startDate,
        budget.endDate
      );

      return {
        ...budget,
        spent,
        remainingAmount: Number(budget.amount) - spent,
        percentageUsed: (spent / Number(budget.amount)) * 100,
      };
    })
  );

  return budgetsWithSpending;
};

// Create budget with notification settings
export const createBudget = async (data: Budget) => {
  // Create the budget first
  const [newBudget] = await db
    .insert(budgets)
    .values({
      kindeId: data.kindeId,
      name: data.name,
      categoryId: data.categoryId,
      amount: data.amount,
      startDate: data.startDate,
      endDate: data.endDate,
      notificationThreshold: data.notificationThreshold,
    })
    .returning();

  // Then create notification settings
  if (newBudget) {
    await db.insert(notificationSettings).values({
      kindeId: data.kindeId,
      budgetId: newBudget.id,
      email: true, // Default to email notifications
      push: false,
      threshold: data.notificationThreshold,
    });
  }

  return newBudget;
};

// Update budget
export const updateBudget = async (id: number, data: Partial<Budget>) => {
  const [updatedBudget] = await db
    .update(budgets)
    .set(data)
    .where(eq(budgets.id, id))
    .returning();

  return updatedBudget;
};

// Check budget status and return notification info if needed
export const checkBudgetStatus = async (
  kindeId: string,
  categoryId: number
) => {
  const activeBudgets = await db
    .select()
    .from(budgets)
    .where(
      and(
        eq(budgets.kindeId, kindeId),
        eq(budgets.categoryId, categoryId),
        sql`${budgets.startDate} <= CURRENT_DATE`,
        sql`${budgets.endDate} >= CURRENT_DATE`
      )
    );

  const budgetAlerts = await Promise.all(
    activeBudgets.map(async (budget) => {
      const spent = await calculateBudgetSpending(
        kindeId,
        categoryId,
        budget.startDate,
        budget.endDate
      );

      const percentageUsed = (spent / Number(budget.amount)) * 100;

      if (percentageUsed >= budget.notificationThreshold) {
        return {
          budgetId: budget.id,
          name: budget.name,
          percentageUsed: percentageUsed.toFixed(1),
          threshold: budget.notificationThreshold,
        };
      }
      return null;
    })
  );

  return budgetAlerts.filter(Boolean);
};


export const getBudgetsWithSpent = async (kindeId: string) => {
  const budgetsList = await getBudgets(kindeId);
  
  // Get all transactions for budget calculations
  const budgetTransactions = await db
    .select({
      categoryId: transactions.categoryId,
      amount: transactions.amount,
      date: transactions.date,
    })
    .from(transactions)
    .where(
      and(
        eq(transactions.kindeId, kindeId),
        eq(transactions.type, 'EXPENSE')
      )
    );

  // Calculate spent amount for each budget
  return budgetsList.map(budget => {
    const spent = budgetTransactions
      .filter(t => 
        t.categoryId === budget.categoryId &&
        new Date(t.date) >= new Date(budget.startDate) &&
        new Date(t.date) <= new Date(budget.endDate)
      )
      .reduce((sum, t) => sum + Number(t.amount), 0);

    return {
      ...budget,
      spent
    };
  });
};
