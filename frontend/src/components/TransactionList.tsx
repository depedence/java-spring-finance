import React from "react";
import { Transaction } from "../types/transaction";
import TransactionCard from "./TransactionCard";
import Skeleton from "./Skeleton";

const TransactionList: React.FC<{
  transactions: Transaction[];
  loading: boolean;
  onEdit: (t: Transaction) => void;
  onDelete: (id?: number) => void;
}> = ({ transactions, loading, onEdit, onDelete }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-3">
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </div>
    );
  }

  if (!transactions.length) {
    return <div className="p-6 text-center text-slate-500">Нет транзакций. Добавьте первую.</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-3">
      {transactions.map((t) => (
        <TransactionCard key={t.id} tx={t} onEdit={() => onEdit(t)} onDelete={() => onDelete(t.id)} />
      ))}
    </div>
  );
};

export default TransactionList;