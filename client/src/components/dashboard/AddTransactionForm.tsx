import { useState } from "react";
import type {
  CreateTransactionInput,
  TransactionCategory,
  TransactionType,
} from "../../types/transaction.types";

type AddTransactionFormProps = {
  onAddTransaction: (transaction: CreateTransactionInput) => void;
};

const categories: TransactionCategory[] = [
  "salary",
  "freelance",
  "housing",
  "food",
  "utilities",
  "transport",
  "entertainment",
  "health",
  "other",
];

export default function AddTransactionForm({
  onAddTransaction,
}: AddTransactionFormProps) {
  const [date, setDate] = useState("2025-01-10");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<TransactionCategory>("food");
  const [type, setType] = useState<TransactionType>("expense");
  const [amount, setAmount] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const numericAmount = Number(amount);

    if (!description.trim()) {
      return;
    }

    if (!numericAmount || numericAmount <= 0) {
      return;
    }

    onAddTransaction({
      date,
      description: description.trim(),
      category,
      type,
      amount: numericAmount,
    });

    setDescription("");
    setCategory("food");
    setType("expense");
    setAmount("");
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">
          Add transaction
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Record new income or expenses for this month.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-5 grid gap-4 lg:grid-cols-6">
        <div className="lg:col-span-2">
          <label className="text-sm font-medium text-slate-700">
            Description
          </label>
          <input
            type="text"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="e.g. Groceries"
            className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">Amount</label>
          <input
            type="number"
            min="1"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            placeholder="150"
            className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">Type</label>
          <select
            value={type}
            onChange={(event) => setType(event.target.value as TransactionType)}
            className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-blue-500"
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">Category</label>
          <select
            value={category}
            onChange={(event) =>
              setCategory(event.target.value as TransactionCategory)
            }
            className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm capitalize text-slate-900 outline-none focus:border-blue-500"
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">Date</label>
          <input
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex items-end lg:col-span-6">
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 sm:w-auto"
          >
            Add transaction
          </button>
        </div>
      </form>
    </section>
  );
}
