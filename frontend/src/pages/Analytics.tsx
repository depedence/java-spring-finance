// src/pages/Analytics.tsx
import React, { useMemo, useState } from "react";
import { useTransactions } from "../hooks/useTransactions";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip as ReTooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";
import Skeleton from "../components/Skeleton";

const COLORS = ["#60a5fa", "#34d399", "#fb7185", "#f59e0b", "#a78bfa", "#f472b6"];

const Analytics: React.FC = () => {
  const [typeFilter, setTypeFilter] = useState<"INCOME" | "EXPENSE" | "ALL">("ALL");
  const [startDate, setStartDate] = useState<string | undefined>(undefined);
  const [endDate, setEndDate] = useState<string | undefined>(undefined);

  const { data: transactions, isLoading } = useTransactions({
    type: typeFilter === "ALL" ? undefined : typeFilter,
    startDate,
    endDate,
  });

  // aggregate by category
  const byCategory = useMemo(() => {
    const map = new Map<string, number>();
    (transactions ?? []).forEach((t) => {
      const name = t.category || "Uncategorized";
      const amt = Math.abs(t.amount ?? 0);
      map.set(name, (map.get(name) ?? 0) + amt);
    });
    return Array.from(map.entries()).map(([name, value]) => ({ name, value }));
  }, [transactions]);

  // time series (sum per date)
  const timeseries = useMemo(() => {
    const map = new Map<string, number>();
    (transactions ?? [])
      .slice()
      .sort((a, b) => (a.date > b.date ? 1 : -1))
      .forEach((t) => {
        const v = t.type === "INCOME" ? t.amount : -t.amount;
        map.set(t.date, (map.get(t.date) ?? 0) + v);
      });
    return Array.from(map.entries()).map(([date, value]) => ({ date, value }));
  }, [transactions]);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Analytics</h2>
        <Skeleton />
        <Skeleton />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Analytics</h2>
        <div className="flex gap-2 items-center">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as any)}
            className="px-3 py-2 rounded-md"
          >
            <option value="ALL">All</option>
            <option value="INCOME">Income</option>
            <option value="EXPENSE">Expense</option>
          </select>

          <input
            type="date"
            className="px-2 py-2 rounded-md"
            onChange={(e) => setStartDate(e.target.value || undefined)}
          />
          <input
            type="date"
            className="px-2 py-2 rounded-md"
            onChange={(e) => setEndDate(e.target.value || undefined)}
          />
          <button
            className="px-3 py-2 rounded-md bg-slate-100 dark:bg-slate-700"
            onClick={() => {
              setTypeFilter("ALL");
              setStartDate(undefined);
              setEndDate(undefined);
            }}
          >
            Reset
          </button>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <div className="p-4 rounded-lg glass">
          <h3 className="font-semibold mb-2">Category breakdown</h3>
          {byCategory.length ? (
            <div style={{ width: "100%", height: 300 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={byCategory} dataKey="value" nameKey="name" outerRadius={90} label>
                    {byCategory.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <ReTooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="text-slate-500">Нет данных для категорий</div>
          )}
        </div>

        <div className="p-4 rounded-lg glass">
          <h3 className="font-semibold mb-2">Balance over time</h3>
          {timeseries.length ? (
            <div style={{ width: "100%", height: 300 }}>
              <ResponsiveContainer>
                <BarChart data={timeseries} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                  <YAxis />
                  <ReTooltip />
                  <Legend />
                  <Bar dataKey="value" name="Balance delta" fill="#4f46e5" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="text-slate-500">Нет данных для графика</div>
          )}
        </div>
      </div>

      <div className="mt-6 p-4 rounded-lg glass">
        <h3 className="font-semibold mb-2">Top categories</h3>
        {byCategory.length ? (
          <ul>
            {byCategory
              .slice()
              .sort((a, b) => b.value - a.value)
              .slice(0, 8)
              .map((c, i) => (
                <li key={c.name} className="flex justify-between py-2 border-b last:border-b-0">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ background: COLORS[i % COLORS.length] }} />
                    <div>{c.name}</div>
                  </div>
                  <div className="font-medium">{Number(c.value).toFixed(2)}</div>
                </li>
              ))}
          </ul>
        ) : (
          <div className="text-slate-500">Нет категорий</div>
        )}
      </div>
    </div>
  );
};

export default Analytics;