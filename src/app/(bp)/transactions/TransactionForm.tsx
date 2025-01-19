// TransactionForm.tsx
import React from "react";

export default function TransactionForm({
  accounts,
  categories,
  budgets,
  onSubmit,
}: {
  accounts: any[];
  categories: any[];
  budgets: any[];
  onSubmit: (formData: FormData) => void;
}) {
  return (
    <form action={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-green-800">Account</label>
        <select
          name="accountId"
          className="w-full px-4 py-2 border border-green-300 rounded-md focus:ring-2 focus:ring-green-300"
        >
          {accounts.map((account) => (
            <option key={account.id} value={account.id}>
              {account.name}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-green-800">Category</label>
        <select
          name="categoryId"
          className="w-full px-4 py-2 border border-green-300 rounded-md focus:ring-2 focus:ring-green-300"
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-green-800">Type</label>
        <select
          name="type"
          className="w-full px-4 py-2 border border-green-300 rounded-md focus:ring-2 focus:ring-green-300"
        >
          <option value="INCOME">Income</option>
          <option value="EXPENSE">Expense</option>
        </select>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-green-800">Amount</label>
        <input
          type="number"
          name="amount"
          placeholder="Enter amount"
          className="w-full px-4 py-2 border border-green-300 rounded-md focus:ring-2 focus:ring-green-300"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-green-800">Date</label>
        <input
          type="date"
          name="date"
          className="w-full px-4 py-2 border border-green-300 rounded-md focus:ring-2 focus:ring-green-300"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-green-800">Description</label>
        <textarea
          name="description"
          placeholder="Enter a description"
          className="w-full px-4 py-2 border border-green-300 rounded-md focus:ring-2 focus:ring-green-300"
        ></textarea>
      </div>

      <button
        type="submit"
        className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:ring-2 focus:ring-green-300"
      >
        Add Transaction
      </button>
    </form>
  );
}
