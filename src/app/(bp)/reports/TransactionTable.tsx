"use client";
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  FileSpreadsheet,
  File,
} from "lucide-react";

interface Transaction {
  id: number;
  date: string;
  type: "INCOME" | "EXPENSE";
  amount: number;
  category: string;
  account: string;
  description?: string;
}

interface TransactionTableProps {
  transactions: Transaction[];
}

export function TransactionTable({ transactions }: TransactionTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState({
    start: "",
    end: ""
  });
  const [selectedType, setSelectedType] = useState<string>("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const [isExporting, setIsExporting] = useState(false);
  const itemsPerPage = 10;

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = 
      transaction.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.account.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDateRange = 
      (!dateRange.start || new Date(transaction.date) >= new Date(dateRange.start)) &&
      (!dateRange.end || new Date(transaction.date) <= new Date(dateRange.end));
    
    const matchesType = 
      selectedType === "ALL" || transaction.type === selectedType;
    
    return matchesSearch && matchesDateRange && matchesType;
  });

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTransactions = filteredTransactions.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const totals = filteredTransactions.reduce(
    (acc, transaction) => {
      if (transaction.type === "INCOME") {
        acc.income += transaction.amount;
      } else {
        acc.expenses += transaction.amount;
      }
      return acc;
    },
    { income: 0, expenses: 0 }
  );

  
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString();
  };

  
  const generateCSV = (data: Transaction[]) => {
    const headers = ['Date', 'Type', 'Amount', 'Category', 'Account', 'Description'];
    const rows = data.map(t => [
      formatDate(t.date),
      t.type,
      t.amount.toString(),
      t.category,
      t.account,
      t.description || ''
    ]);
    return [headers, ...rows].map(row => row.join(',')).join('\n');
  };

  
  const downloadFile = (content: string, filename: string, type: string) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  
  const handleGenerateReport = async (format: "PDF" | "CSV" | "EXCEL") => {
    setIsExporting(true);
    try {
      const timestamp = new Date().toISOString().split('T')[0];
      
      switch (format) {
        case "CSV":
          const csvContent = generateCSV(filteredTransactions);
          downloadFile(csvContent, `transactions-${timestamp}.csv`, 'text/csv');
          break;

        case "EXCEL":
          const excelContent = '\ufeff' + generateCSV(filteredTransactions); //
          downloadFile(excelContent, `transactions-${timestamp}.xlsx`, 'application/vnd.ms-excel');
          break;

        case "PDF":
          const pdfContent = filteredTransactions.map(t => ({
            date: formatDate(t.date),
            type: t.type,
            amount: new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD'
            }).format(t.amount),
            category: t.category,
            account: t.account,
            description: t.description || ''
          }));

          downloadFile(
            JSON.stringify(pdfContent, null, 2),
            `transactions-${timestamp}.json`,
            'application/json'
          );
          break;
      }
    } catch (error) {
      console.error('Error generating report:', error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4 items-end">
        <div className="space-y-2">
          <label className="text-sm font-medium">Search</label>
          <Input
            type="text"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-[200px]"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Start Date</label>
          <Input
            type="date"
            value={dateRange.start}
            onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">End Date</label>
          <Input
            type="date"
            value={dateRange.end}
            onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Type</label>
          <Select
            value={selectedType}
            onValueChange={(value) => setSelectedType(value)}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All</SelectItem>
              <SelectItem value="INCOME">Income</SelectItem>
              <SelectItem value="EXPENSE">Expense</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2 ml-auto">
          <Button
            variant="outline"
            onClick={() => handleGenerateReport("PDF")}
            disabled={isExporting}
          >
            <File className="w-4 h-4 mr-2" />
            PDF
          </Button>
          <Button
            variant="outline"
            onClick={() => handleGenerateReport("EXCEL")}
            disabled={isExporting}
          >
            <FileSpreadsheet className="w-4 h-4 mr-2" />
            Excel
          </Button>
          <Button
            variant="outline"
            onClick={() => handleGenerateReport("CSV")}
            disabled={isExporting}
          >
            <Download className="w-4 h-4 mr-2" />
            CSV
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-sm text-green-600">Total Income</p>
          <p className="text-2xl font-bold text-green-700">
            {new Intl.NumberFormat('en-UK', {
              style: 'currency',
              currency: 'RWF'
            }).format(totals.income)}
          </p>
        </div>
        <div className="bg-red-50 p-4 rounded-lg">
          <p className="text-sm text-red-600">Total Expenses</p>
          <p className="text-2xl font-bold text-red-700">
            {new Intl.NumberFormat('en-UK', {
              style: 'currency',
            currency: 'RWF'
            }).format(totals.expenses)}
          </p>
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Account</TableHead>
              <TableHead>Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedTransactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{formatDate(transaction.date)}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded text-sm ${
                    transaction.type === "INCOME" 
                      ? "bg-green-100 text-green-800" 
                      : "bg-red-100 text-red-800"
                  }`}>
                    {transaction.type}
                  </span>
                </TableCell>
                <TableCell className={
                  transaction.type === "INCOME" ? "text-green-600" : "text-red-600"
                }>
                  {new Intl.NumberFormat('en-UK', {
                    style: 'currency',
                    currency: 'RWF'
                  }).format(transaction.amount)}
                </TableCell>
                <TableCell>{transaction.category}</TableCell>
                <TableCell>{transaction.account}</TableCell>
                <TableCell>{transaction.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredTransactions.length)} of {filteredTransactions.length} entries
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}