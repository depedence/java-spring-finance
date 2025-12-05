import React from "react";
import { useTransactions } from "../hooks/useTransactions";
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

const COLORS = ["#4ade80", "#fb7185", "#60a5fa", "#f59e0b"];

const Dashboard: React.FC = () => {
  const { data, isLoading } = useTransactions();

  // aggregate data
  const totalIncome = (data ?? []).filter(d => d.type === "INCOME").reduce((s, x) => s + x.amount, 0);
  const totalExpense = (data ?? []).filter(d => d.type === "EXPENSE").reduce((s, x) => s + x.amount, 0);
  const balance = totalIncome - totalExpense;

  // category breakdown
  const byCategory = (data ?? []).reduce<Record<string, number>>((acc, tx) => {
    acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
    return acc;
  }, {});

  const pieData = Object.entries(byCategory).map(([name, value]) => ({ name, value }));

  // time series sample (group by date)
  const timeseries = (data ?? []).reduce<Record<string, number>>((acc, tx) => {
    acc[tx.date] = (acc[tx.date] || 0) + (tx.type === "INCOME" ? tx.amount : -tx.amount);
    return acc;
  }, {});
  const lineData = Object.entries(timeseries).sort().map(([date, value]) => ({ date, value }));

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 rounded-lg glass">
          <div className="text-sm text-slate-400">Balance</div>
          <div className="text-2xl font-bold">{balance.toFixed(2)}</div>
        </div>
        <div className="p-4 rounded-lg glass">
          <div className="text-sm text-slate-400">Income</div>
          <div className="text-xl font-semibold text-green-600">{totalIncome.toFixed(2)}</div>
        </div>
        <div className="p-4 rounded-lg glass">
          <div className="text-sm text-slate-400">Expense</div>
          <div className="text-xl font-semibold text-red-600">{totalExpense.toFixed(2)}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-lg glass">
          <h3 className="font-semibold mb-2">Category breakdown</h3>
          {pieData.length ? (
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={80} label>
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-slate-500">No data</div>
          )}
        </div>

        <div className="p-4 rounded-lg glass">
          <h3 className="font-semibold mb-2">Balance over time</h3>
          {lineData.length ? (
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={lineData}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#4f46e5" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-slate-500">No data for time series</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;