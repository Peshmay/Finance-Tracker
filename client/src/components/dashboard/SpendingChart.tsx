import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import type { Transaction } from "../../types/transaction.types";

type SpendingChartProps = {
  transactions: Transaction[];
};

const chartColors = [
  "#2563EB",
  "#16A34A",
  "#F59E0B",
  "#8B5CF6",
  "#EF4444",
  "#64748B",
];

function formatCategoryName(category: string) {
  return category.charAt(0).toUpperCase() + category.slice(1);
}

export default function SpendingChart({ transactions }: SpendingChartProps) {
  const spendingData = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce<{ name: string; value: number }[]>((result, transaction) => {
      const categoryName = formatCategoryName(transaction.category);

      const existingCategory = result.find(
        (item) => item.name === categoryName,
      );

      if (existingCategory) {
        existingCategory.value += transaction.amount;
      } else {
        result.push({
          name: categoryName,
          value: transaction.amount,
        });
      }

      return result;
    }, [])
    .sort((a, b) => b.value - a.value);

  const hasExpenses = spendingData.length > 0;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">
          Spending breakdown
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Expenses grouped by category.
        </p>
      </div>

      {hasExpenses ? (
        <>
          <div className="mt-6 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={spendingData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={3}
                >
                  {spendingData.map((entry, index) => (
                    <Cell
                      key={entry.name}
                      fill={chartColors[index % chartColors.length]}
                    />
                  ))}
                </Pie>

                <Tooltip
                  formatter={(value) => `$${Number(value).toLocaleString()}`}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 space-y-3">
            {spendingData.map((item, index) => (
              <div
                key={item.name}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{
                      backgroundColor: chartColors[index % chartColors.length],
                    }}
                  />
                  <span className="text-sm text-slate-600">{item.name}</span>
                </div>

                <span className="text-sm font-medium text-slate-900">
                  ${item.value.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="mt-6 flex h-64 items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50 px-6 text-center">
          <div>
            <p className="font-medium text-slate-700">No expenses yet</p>
            <p className="mt-1 text-sm text-slate-500">
              Add an expense transaction to see your spending breakdown.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
