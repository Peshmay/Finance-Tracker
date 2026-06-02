import { ArrowDownCircle, ArrowUpCircle, WalletCards } from "lucide-react";
import AppHeader from "../components/layout/AppHeader";
import MonthSelector from "../components/dashboard/MonthSelector";
import SpendingChart from "../components/dashboard/SpendingChart";
import SummaryCard from "../components/dashboard/SummaryCard";
import TransactionTable from "../components/dashboard/TransactionTable";
import type { Transaction } from "../types/transaction.types";

const transactions: Transaction[] = [
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

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <AppHeader />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <MonthSelector />

        <section className="mt-8 grid gap-4 md:grid-cols-3">
          <SummaryCard
            title="Income"
            value="$5,800"
            description="Total income this month"
            tone="income"
            icon={<ArrowUpCircle size={22} />}
          />

          <SummaryCard
            title="Expenses"
            value="$1,505"
            description="Total expenses this month"
            tone="expense"
            icon={<ArrowDownCircle size={22} />}
          />

          <SummaryCard
            title="Balance"
            value="$4,295"
            description="Income minus expenses"
            tone="balance"
            icon={<WalletCards size={22} />}
          />
        </section>

        <section className="mt-8 flex flex-col gap-6 lg:grid lg:grid-cols-[1.7fr_1fr]">
          <TransactionTable transactions={transactions} />
          <SpendingChart />
        </section>
      </main>
    </div>
  );
}
