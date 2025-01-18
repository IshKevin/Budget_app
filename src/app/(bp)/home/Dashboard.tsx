"use client";

import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Card } from '@/components/ui/card';

export default function Dashboard({ accounts, transactions }) {
  const [timeRange, setTimeRange] = useState('month');

  // Calculate total balance across all accounts
  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);

  // Calculate monthly income and expenses
  const monthlyData = transactions.reduce((acc, transaction) => {
    const month = new Date(transaction.date).toLocaleString('default', { month: 'short' });
    if (!acc[month]) {
      acc[month] = { month, income: 0, expenses: 0 };
    }
    if (transaction.type === 'INCOME') {
      acc[month].income += transaction.amount;
    } else {
      acc[month].expenses += transaction.amount;
    }
    return acc;
  }, {});

  const chartData = Object.values(monthlyData);

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6">
          <h3 className="text-lg font-medium text-gray-500">Total Balance</h3>
          <p className="text-3xl font-bold mt-2">${totalBalance.toFixed(2)}</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-lg font-medium text-gray-500">Monthly Income</h3>
          <p className="text-3xl font-bold mt-2 text-green-600">
            ${chartData[chartData.length - 1]?.income.toFixed(2) || '0.00'}
          </p>
        </Card>
        <Card className="p-6">
          <h3 className="text-lg font-medium text-gray-500">Monthly Expenses</h3>
          <p className="text-3xl font-bold mt-2 text-red-600">
            ${chartData[chartData.length - 1]?.expenses.toFixed(2) || '0.00'}
          </p>
        </Card>
      </div>

      {/* Chart */}
      <Card className="p-6">
        <h3 className="text-xl font-bold mb-4">Income vs Expenses</h3>
        <div className="h-64">
          <LineChart width={800} height={250} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="income" stroke="#10B981" name="Income" />
            <Line type="monotone" dataKey="expenses" stroke="#EF4444" name="Expenses" />
          </LineChart>
        </div>
      </Card>

      {/* Account Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {accounts.map(account => (
          <Card key={account.id} className="p-6">
            <h3 className="text-lg font-bold">{account.name}</h3>
            <p className="text-sm text-gray-500">{account.type}</p>
            <p className="text-2xl font-bold mt-2">
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: account.currency,
              }).format(account.balance)}
            </p>
            {account.description && (
              <p className="text-gray-500 mt-2">{account.description}</p>
            )}
          </Card>
        ))}
      </div>

      {/* Time Range Buttons */}
      <div className="flex justify-center mt-8">
        <div className="space-x-4">
          <button
            className={`px-4 py-2 rounded-md ${
              timeRange === 'week' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
            onClick={() => setTimeRange('week')}
          >
            Weekly
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              timeRange === 'month' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
            onClick={() => setTimeRange('month')}
          >
            Monthly
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              timeRange === 'year' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
            onClick={() => setTimeRange('year')}
          >
            Yearly
          </button>
        </div>
      </div>
    </div>
  );
}
