"use client";
import { SubmitButton } from "./AccountButton";

type AccountFormProps = {
  onSubmit: (formData: FormData) => Promise<void>;
};

export function AccountForm({ onSubmit }: AccountFormProps) {
  return (
    <form action={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-green-800">
          Account Name *
        </label>
        <input
          type="text"
          name="name"
          required
          placeholder="e.g., Main Checking"
          className="w-full px-4 py-2 border border-green-200 rounded-md focus:ring-2 focus:ring-green-300 focus:border-transparent"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-green-800">
          Currency *
        </label>
        <select
          name="currency"
          required
          className="w-full px-4 py-2 border border-green-200 rounded-md focus:ring-2 focus:ring-green-300 focus:border-transparent"
        >
          <option value="RWF">Rwandan Franc (RWF)</option>
          <option value="USD">US Dollar (USD)</option>
          <option value="EUR">Euro (EUR)</option>
          <option value="GBP">British Pound (GBP)</option>
          <option value="JPY">Japanese Yen (JPY)</option>
          <option value="CNY">Chinese Yuan (CNY)</option>
        </select>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-green-800">
          Initial Balance *
        </label>
        <input
          type="number"
          name="balance"
          required
          step="0.01"
          placeholder="0.00"
          className="w-full px-4 py-2 border border-green-200 rounded-md focus:ring-2 focus:ring-green-300 focus:border-transparent"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-green-800">
          Description
        </label>
        <textarea
          name="description"
          rows={3}
          placeholder="Add some notes about this account..."
          className="w-full px-4 py-2 border border-green-200 rounded-md focus:ring-2 focus:ring-green-300 focus:border-transparent"
        />
      </div>

      <SubmitButton />
    </form>
  );
}
