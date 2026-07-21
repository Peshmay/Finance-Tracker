import { useState } from "react";
import type {
  CreateTransactionInput,
  TransactionCategory,
  TransactionType,
} from "../../types/transaction.types";

type AddTransactionFormProps = {
  onAddTransaction: (transaction: CreateTransactionInput) => void;
};

type FormErrors = {
  date?: string;
  description?: string;
  amount?: string;
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

const today = new Date().toISOString().split("T")[0];

export default function AddTransactionForm({
  onAddTransaction,
}: AddTransactionFormProps) {
  const [date, setDate] = useState(today);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<TransactionCategory>("food");
  const [type, setType] = useState<TransactionType>("expense");
  const [amount, setAmount] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

  function validateForm() {
    const nextErrors: FormErrors = {};
    const numericAmount = Number(amount);

    if (!description.trim()) {
      nextErrors.description = "Description is required.";
    } else if (description.trim().length < 2) {
      nextErrors.description = "Description must be at least 2 characters.";
    }

    if (!amount.trim()) {
      nextErrors.amount = "Amount is required.";
    } else if (Number.isNaN(numericAmount) || numericAmount <= 0) {
      nextErrors.amount = "Amount must be greater than 0.";
    }

    if (!date) {
      nextErrors.date = "Date is required.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    onAddTransaction({
      date,
      description: description.trim(),
      category,
      type,
      amount: Number(amount),
    });

    setDescription("");
    setCategory("food");
    setType("expense");
    setAmount("");
    setDate(today);
    setErrors({});
  }

  function clearFieldError(field: keyof FormErrors) {
    setErrors((currentErrors) => ({
      ...currentErrors,
      [field]: undefined,
    }));
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
          <label
            htmlFor="description"
            className="text-sm font-medium text-slate-700"
          >
            Description
          </label>

          <input
            id="description"
            type="text"
            value={description}
            onChange={(event) => {
              setDescription(event.target.value);
              clearFieldError("description");
            }}
            placeholder="e.g. Groceries"
            className={`mt-2 w-full rounded-lg border bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-blue-500 ${
              errors.description ? "border-red-300" : "border-slate-200"
            }`}
          />

          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="amount"
            className="text-sm font-medium text-slate-700"
          >
            Amount
          </label>

          <input
            id="amount"
            type="number"
            min="1"
            value={amount}
            onChange={(event) => {
              setAmount(event.target.value);
              clearFieldError("amount");
            }}
            placeholder="150"
            className={`mt-2 w-full rounded-lg border bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-blue-500 ${
              errors.amount ? "border-red-300" : "border-slate-200"
            }`}
          />

          {errors.amount && (
            <p className="mt-1 text-sm text-red-600">{errors.amount}</p>
          )}
        </div>

        <div>
          <label htmlFor="type" className="text-sm font-medium text-slate-700">
            Type
          </label>

          <select
            id="type"
            value={type}
            onChange={(event) => setType(event.target.value as TransactionType)}
            className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-blue-500"
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="category"
            className="text-sm font-medium text-slate-700"
          >
            Category
          </label>

          <select
            id="category"
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
          <label htmlFor="date" className="text-sm font-medium text-slate-700">
            Date
          </label>

          <input
            id="date"
            type="date"
            value={date}
            onChange={(event) => {
              setDate(event.target.value);
              clearFieldError("date");
            }}
            className={`mt-2 w-full rounded-lg border bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-blue-500 ${
              errors.date ? "border-red-300" : "border-slate-200"
            }`}
          />

          {errors.date && (
            <p className="mt-1 text-sm text-red-600">{errors.date}</p>
          )}
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
