import React, { useState } from "react";
import { useTransactions, useCreateTransaction, useDeleteTransaction, useUpdateTransaction } from "../hooks/useTransactions";
import TransactionList from "../components/TransactionList";
import TransactionModal from "../components/TransactionModal";
import { Transaction } from "../types/transaction";

const Transactions: React.FC = () => {
  const [filters, setFilters] = useState<{ type?: string; startDate?: string; endDate?: string }>({});
  const { data, isLoading } = useTransactions(filters);
  const create = useCreateTransaction();
  const update = useUpdateTransaction();
  const remove = useDeleteTransaction();

  const [editing, setEditing] = useState<Transaction | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  function onAdd() {
    setEditing(null);
    setIsOpen(true);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Transactions</h2>
        <div className="flex gap-2">
          <button className="px-4 py-2 rounded-md bg-primary-500 text-white" onClick={onAdd}>
            Add transaction
          </button>
        </div>
      </div>

      {/* Filters (simple example) */}
      <div className="mb-4 flex gap-2 items-center">
        <select className="px-3 py-2 rounded-md" onChange={e => setFilters(f => ({ ...f, type: e.target.value || undefined }))}>
          <option value="">All types</option>
          <option value="INCOME">Income</option>
          <option value="EXPENSE">Expense</option>
        </select>

        <input type="date" className="px-2 py-2 rounded-md" onChange={e => setFilters(f => ({ ...f, startDate: e.target.value || undefined }))} />
        <input type="date" className="px-2 py-2 rounded-md" onChange={e => setFilters(f => ({ ...f, endDate: e.target.value || undefined }))} />
        <button className="px-3 py-2 rounded-md bg-slate-100 dark:bg-slate-700" onClick={() => setFilters({})}>Reset</button>
      </div>

      <TransactionList
        transactions={data ?? []}
        loading={isLoading}
        onEdit={(t) => { setEditing(t); setIsOpen(true); }}
        onDelete={(id) => remove.mutate(id)}
      />

      <TransactionModal
        isOpen={isOpen}
        initial={editing}
        onClose={() => setIsOpen(false)}
        onSave={(payload) => {
          if (editing?.id) return update.mutate({ id: editing.id, payload });
          return create.mutate(payload);
        }}
      />
    </div>
  );
};

export default Transactions;