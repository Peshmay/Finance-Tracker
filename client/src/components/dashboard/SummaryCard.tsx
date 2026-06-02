import type { ReactNode } from "react";

type SummaryCardProps = {
  title: string;
  value: string;
  description: string;
  icon: ReactNode;
  tone?: "income" | "expense" | "balance";
};

const toneStyles = {
  income: "bg-emerald-50 text-emerald-700",
  expense: "bg-red-50 text-red-700",
  balance: "bg-blue-50 text-blue-700",
};

export default function SummaryCard({
  title,
  value,
  description,
  icon,
  tone = "balance",
}: SummaryCardProps) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
            {value}
          </h2>
          <p className="mt-2 text-sm text-slate-500">{description}</p>
        </div>

        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${toneStyles[tone]}`}
        >
          {icon}
        </div>
      </div>
    </article>
  );
}
