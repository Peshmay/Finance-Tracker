import { ChevronLeft, ChevronRight } from "lucide-react";

export default function MonthSelector() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Your monthly overview
        </h1>
        <p className="mt-2 text-slate-600">
          Track income, expenses, and spending patterns in one simple dashboard.
        </p>
      </div>

      <div className="flex items-center gap-2">
        <button className="rounded-lg border border-slate-200 bg-white p-2 text-slate-600 hover:bg-slate-50">
          <ChevronLeft size={18} />
        </button>

        <select className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 outline-none focus:border-blue-500">
          <option>January 2025</option>
          <option>February 2025</option>
          <option>March 2025</option>
          <option>April 2025</option>
          <option>May 2025</option>
        </select>

        <button className="rounded-lg border border-slate-200 bg-white p-2 text-slate-600 hover:bg-slate-50">
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}