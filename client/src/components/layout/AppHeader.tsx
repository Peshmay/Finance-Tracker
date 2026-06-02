import { Wallet } from "lucide-react";

export default function AppHeader() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
            <Wallet size={20} />
          </div>

          <div>
            <p className="text-lg font-bold tracking-tight text-slate-900">
              Ledgerly
            </p>
            <p className="text-xs text-slate-500">
              Smart monthly finance tracking
            </p>
          </div>
        </div>

        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
          <a href="#" className="text-slate-900">
            Dashboard
          </a>
          <a href="#">Transactions</a>
          <a href="#">Reports</a>
        </nav>

        <button className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
          Logout
        </button>
      </div>
    </header>
  );
}
