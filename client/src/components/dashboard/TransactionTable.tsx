import { Pencil, Trash2 } from "lucide-react";
import type { Transaction } from "../../types/transaction.types";

type TransactionTableProps = {
  transactions: Transaction[];
  onEditTransaction: (transaction: Transaction) => void;
  onDeleteTransaction: (transactionId: string) => void;
};

export default function TransactionTable({
  transactions,
  onEditTransaction,
  onDeleteTransaction,
}: TransactionTableProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-5 py-4">
        <h2 className="text-lg font-semibold text-slate-900">
          Recent transactions
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Latest income and expense records for this month.
        </p>
      </div>

      <div className="hidden overflow-x-auto md:block">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-5 py-3">Date</th>
              <th className="px-5 py-3">Description</th>
              <th className="px-5 py-3">Category</th>
              <th className="px-5 py-3">Type</th>
              <th className="px-5 py-3 text-right">Amount</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-slate-50">
                <td className="px-5 py-4 text-slate-500">{transaction.date}</td>

                <td className="px-5 py-4 font-medium text-slate-900">
                  {transaction.description}
                </td>

                <td className="px-5 py-4 capitalize text-slate-600">
                  {transaction.category}
                </td>

                <td className="px-5 py-4 capitalize text-slate-600">
                  {transaction.type}
                </td>

                <td
                  className={`px-5 py-4 text-right font-semibold ${
                    transaction.type === "income"
                      ? "text-emerald-600"
                      : "text-red-600"
                  }`}
                >
                  {transaction.type === "income" ? "+" : "-"}$
                  {transaction.amount.toLocaleString()}
                </td>

                <td className="px-5 py-4">
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => onEditTransaction(transaction)}
                      className="inline-flex items-center justify-center rounded-lg border border-slate-200 p-2 text-slate-500 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                      aria-label={`Edit ${transaction.description}`}
                    >
                      <Pencil size={16} />
                    </button>

                    <button
                      type="button"
                      onClick={() => onDeleteTransaction(transaction.id)}
                      className="inline-flex items-center justify-center rounded-lg border border-slate-200 p-2 text-slate-500 hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                      aria-label={`Delete ${transaction.description}`}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="divide-y divide-slate-100 md:hidden">
        {transactions.map((transaction) => (
          <article key={transaction.id} className="px-5 py-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-medium text-slate-900">
                  {transaction.description}
                </h3>
                <p className="mt-1 text-sm capitalize text-slate-500">
                  {transaction.date} · {transaction.category}
                </p>
              </div>

              <div className="text-right">
                <p
                  className={`font-semibold ${
                    transaction.type === "income"
                      ? "text-emerald-600"
                      : "text-red-600"
                  }`}
                >
                  {transaction.type === "income" ? "+" : "-"}$
                  {transaction.amount.toLocaleString()}
                </p>

                <div className="mt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => onEditTransaction(transaction)}
                    className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-blue-600"
                    aria-label={`Edit ${transaction.description}`}
                  >
                    <Pencil size={14} />
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => onDeleteTransaction(transaction.id)}
                    className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-red-600"
                    aria-label={`Delete ${transaction.description}`}
                  >
                    <Trash2 size={14} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
