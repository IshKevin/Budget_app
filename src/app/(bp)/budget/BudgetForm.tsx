"use client";
import { SubmitButton } from "./BudgetButton";

type BudgetFormProps = {
  onSubmit: (formData: FormData) => Promise<void>;
  categories: Array<{
    id: number;
    name: string;
    kindeId: string;
  }>;
};

export function BudgetForm({ onSubmit, categories }: BudgetFormProps) {
  return (
    <form action={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-green-800">
          Budget Name *
        </label>
        <input
          type="text"
          name="name"
          required
          placeholder="e.g., Monthly Groceries"
          className="w-full px-4 py-2 border border-green-200 rounded-md focus:ring-2 focus:ring-green-300 focus:border-transparent"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-green-800">
          Category *
        </label>
        <select
          name="categoryId"
          required
          className="w-full px-4 py-2 border border-green-200 rounded-md focus:ring-2 focus:ring-green-300 focus:border-transparent"
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-green-800">
          Amount *
        </label>
        <input
          type="number"
          name="amount"
          required
          step="0.01"
          placeholder="0.00"
          className="w-full px-4 py-2 border border-green-200 rounded-md focus:ring-2 focus:ring-green-300 focus:border-transparent"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-green-800">
            Start Date *
          </label>
          <input
            type="date"
            name="startDate"
            required
            className="w-full px-4 py-2 border border-green-200 rounded-md focus:ring-2 focus:ring-green-300 focus:border-transparent"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-green-800">
            End Date *
          </label>
          <input
            type="date"
            name="endDate"
            required
            className="w-full px-4 py-2 border border-green-200 rounded-md focus:ring-2 focus:ring-green-300 focus:border-transparent"
          />
        </div>
      </div>

      <SubmitButton />
    </form>
  );
}
