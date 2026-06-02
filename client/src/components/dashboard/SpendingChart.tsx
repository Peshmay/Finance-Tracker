import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const spendingData = [
  { name: "Housing", value: 1200 },
  { name: "Food", value: 215 },
  { name: "Utilities", value: 95 },
  { name: "Transport", value: 45 },
  { name: "Entertainment", value: 15 },
];

const chartColors = ["#2563EB", "#16A34A", "#F59E0B", "#8B5CF6", "#EF4444"];

export default function SpendingChart() {
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
            <Tooltip formatter={(value) => `$${value}`} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 space-y-3">
        {spendingData.map((item, index) => (
          <div key={item.name} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: chartColors[index] }}
              />
              <span className="text-sm text-slate-600">{item.name}</span>
            </div>
            <span className="text-sm font-medium text-slate-900">
              ${item.value}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
