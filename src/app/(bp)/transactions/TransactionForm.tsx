"use client"

import React, { useState } from 'react';

type PersonalAccount = {
  id: number;
  name: string;
  type: "BANK" | "MOBILE_MONEY" | "CASH";
  balance: number;
  currency: string;
};

type FinancialTransaction = {
  id: number;
  userId: string;
  accountId: number;
  categoryId: number;
  type: "INCOME" | "EXPENSE";
  amount: number;
  description?: string;
  transactionDate: string;
};

interface TransactionFormProps {
  accounts: PersonalAccount[];
  categories: { id: number; name: string }[];
  transaction?: FinancialTransaction;
  onSubmit: (data: Partial<FinancialTransaction>) => Promise<void>;
}

const TransactionForm = ({ 
  accounts, 
  categories,
  transaction, 
  onSubmit 
}: TransactionFormProps) => {
  const [formData, setFormData] = useState({
    accountId: transaction?.accountId || accounts[0]?.id || 0,
    categoryId: transaction?.categoryId || categories[0]?.id || 0,
    type: transaction?.type || 'EXPENSE',
    amount: transaction?.amount || 0,
    description: transaction?.description || '',
    transactionDate: transaction?.transactionDate 
      ? new Date(transaction.transactionDate).toISOString().split('T')[0] 
      : new Date().toISOString().split('T')[0]
  });

  const [error, setError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'amount' || name === 'accountId' || name === 'categoryId'
        ? parseFloat(value) || 0
        : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      if (formData.amount <= 0) {
        setError('Amount must be greater than 0');
        return;
      }

      if (!formData.accountId) {
        setError('Please select an account');
        return;
      }

      if (!formData.categoryId) {
        setError('Please select a category');
        return;
      }

      await onSubmit(formData);
      if (!transaction) {
        // Reset form only for new transactions
        setFormData(prev => ({
          ...prev,
          amount: 0,
          description: '',
          transactionDate: new Date().toISOString().split('T')[0]
        }));
      }
    } catch (error) {
      setError('Failed to submit transaction. Please try again.');
      console.error('Error submitting transaction:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">
        {transaction ? 'Edit Transaction' : 'New Transaction'}
      </h2>

      {error && (
        <div className="p-3 mb-4 text-sm text-red-500 bg-red-50 rounded-md">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <label className="block text-sm font-medium" htmlFor="accountId">
          Account
        </label>
        <select
          id="accountId"
          name="accountId"
          value={formData.accountId}
          onChange={handleChange}
          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Select an account</option>
          {accounts.map((account) => (
            <option key={account.id} value={account.id}>
              {account.name} ({account.type} - {account.currency})
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium" htmlFor="categoryId">
          Category
        </label>
        <select
          id="categoryId"
          name="categoryId"
          value={formData.categoryId}
          onChange={handleChange}
          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          required
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
        <label className="block text-sm font-medium" htmlFor="type">
          Type
        </label>
        <select
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
        >
          <option value="EXPENSE">Expense</option>
          <option value="INCOME">Income</option>
        </select>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium" htmlFor="amount">
          Amount
        </label>
        <input
          id="amount"
          name="amount"
          type="number"
          step="0.01"
          min="0"
          value={formData.amount}
          onChange={handleChange}
          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium" htmlFor="transactionDate">
          Date
        </label>
        <input
          id="transactionDate"
          name="transactionDate"
          type="date"
          value={formData.transactionDate}
          onChange={handleChange}
          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium" htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          rows={3}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-300"
      >
        {isSubmitting 
          ? 'Processing...' 
          : transaction 
            ? 'Update Transaction' 
            : 'Add Transaction'
        }
      </button>
    </form>
  );
};

export default TransactionForm;