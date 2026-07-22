import { useMemo, useState } from "react";
import { ArrowDownCircle, ArrowUpCircle, WalletCards } from "lucide-react";
import AppHeader from "../components/layout/AppHeader";
import AddTransactionForm from "../components/dashboard/AddTransactionForm";
import DeleteUndoToast from "../components/dashboard/DeleteUndoToast";
import MonthSelector from "../components/dashboard/MonthSelector";
import SpendingChart from "../components/dashboard/SpendingChart";
import SummaryCard from "../components/dashboard/SummaryCard";
import TransactionTable from "../components/dashboard/TransactionTable";
import type {
  CreateTransactionInput,
  Transaction,
} from "../types/transaction.types";

const initialTransactions: Transaction[] = [
  {
    id: "1",
    date: "2025-01-01",
    description: "Salary",
    category: "salary",
    type: "income",
    amount: 5000,
  },
  {
    id: "2",
    date: "2025-01-02",
    description: "Rent",
    category: "housing",
    type: "expense",
    amount: 1200,
  },
  {
    id: "3",
    date: "2025-01-03",
    description: "Groceries",
    category: "food",
    type: "expense",
    amount: 150,
  },
  {
    id: "4",
    date: "2025-01-05",
    description: "Freelance Work",
    category: "freelance",
    type: "income",
    amount: 800,
  },
  {
    id: "5",
    date: "2025-01-06",
    description: "Electric Bill",
    category: "utilities",
    type: "expense",
    amount: 95,
  },
  {
    id: "6",
    date: "2025-01-08",
    description: "Gas",
    category: "transport",
    type: "expense",
    amount: 45,
  },
];

function formatCurrency(amount: number) {
  return `$${amount.toLocaleString()}`;
}

export default function DashboardPage() {
  const [transactions, setTransactions] =
    useState<Transaction[]>(initialTransactions);

  const [deletedTransaction, setDeletedTransaction] =
    useState<Transaction | null>(null);

  const totals = useMemo(() => {
    const income = transactions
      .filter((transaction) => transaction.type === "income")
      .reduce((sum, transaction) => sum + transaction.amount, 0);

    const expenses = transactions
      .filter((transaction) => transaction.type === "expense")
      .reduce((sum, transaction) => sum + transaction.amount, 0);

    return {
      income,
      expenses,
      balance: income - expenses,
    };
  }, [transactions]);

  function handleAddTransaction(input: CreateTransactionInput) {
    const newTransaction: Transaction = {
      id: crypto.randomUUID(),
      ...input,
    };

    setTransactions((currentTransactions) => [
      newTransaction,
      ...currentTransactions,
    ]);
  }

  function handleDeleteTransaction(transactionId: string) {
    const transactionToDelete = transactions.find(
      (transaction) => transaction.id === transactionId,
    );

    if (!transactionToDelete) {
      return;
    }

    setTransactions((currentTransactions) =>
      currentTransactions.filter(
        (transaction) => transaction.id !== transactionId,
      ),
    );

    setDeletedTransaction(transactionToDelete);
  }

  function handleUndoDelete() {
    if (!deletedTransaction) {
      return;
    }

    setTransactions((currentTransactions) => [
      deletedTransaction,
      ...currentTransactions,
    ]);

    setDeletedTransaction(null);
  }

  function handleDismissDeleteToast() {
    setDeletedTransaction(null);
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <AppHeader />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <MonthSelector />

        <section className="mt-8 grid gap-4 md:grid-cols-3">
          <SummaryCard
            title="Income"
            value={formatCurrency(totals.income)}
            description="Total income this month"
            tone="income"
            icon={<ArrowUpCircle size={22} />}
          />

          <SummaryCard
            title="Expenses"
            value={formatCurrency(totals.expenses)}
            description="Total expenses this month"
            tone="expense"
            icon={<ArrowDownCircle size={22} />}
          />

          <SummaryCard
            title="Balance"
            value={formatCurrency(totals.balance)}
            description="Income minus expenses"
            tone="balance"
            icon={<WalletCards size={22} />}
          />
        </section>

        <section className="mt-8">
          <AddTransactionForm onAddTransaction={handleAddTransaction} />
        </section>

        <section className="mt-8 flex flex-col gap-6 lg:grid lg:grid-cols-[1.7fr_1fr]">
          <TransactionTable
            transactions={transactions}
            onDeleteTransaction={handleDeleteTransaction}
          />

          <SpendingChart transactions={transactions} />
        </section>
      </main>

      <DeleteUndoToast
        deletedTransaction={deletedTransaction}
        onUndo={handleUndoDelete}
        onDismiss={handleDismissDeleteToast}
      />
    </div>
  );
}
