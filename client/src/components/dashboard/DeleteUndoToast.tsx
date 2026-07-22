import { X } from "lucide-react";
import type { Transaction } from "../../types/transaction.types";

type DeleteUndoToastProps = {
  deletedTransaction: Transaction | null;
  onUndo: () => void;
  onDismiss: () => void;
};

export default function DeleteUndoToast({
  deletedTransaction,
  onUndo,
  onDismiss,
}: DeleteUndoToastProps) {
  if (!deletedTransaction) {
    return null;
  }

  return (
    <div className="fixed bottom-5 left-4 right-4 z-50 mx-auto max-w-md rounded-2xl border border-slate-200 bg-white p-4 shadow-lg">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-medium text-slate-900">Transaction deleted</p>
          <p className="mt-1 text-sm text-slate-500">
            {deletedTransaction.description} was removed.
          </p>
        </div>

        <button
          type="button"
          onClick={onDismiss}
          className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          aria-label="Dismiss undo message"
        >
          <X size={16} />
        </button>
      </div>

      <div className="mt-3 flex justify-end">
        <button
          type="button"
          onClick={onUndo}
          className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
        >
          Undo
        </button>
      </div>
    </div>
  );
}
