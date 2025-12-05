import React from "react";
import { Transaction } from "../types/transaction";
import { motion } from "framer-motion";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

const TransactionCard: React.FC<{ tx: Transaction; onEdit: () => void; onDelete: () => void }> = ({ tx, onEdit, onDelete }) => {
  const isExpense = tx.type === "EXPENSE";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="flex items-center justify-between p-4 rounded-lg glass"
    >
      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 rounded-md flex items-center justify-center ${isExpense ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
          <span className="text-sm font-semibold">{isExpense ? "-" : "+"}</span>
        </div>
        <div>
          <div className="font-medium">{tx.category}</div>
          <div className="text-sm text-slate-500">{tx.description}</div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className={`text-lg font-semibold ${isExpense ? "text-red-600" : "text-green-600"}`}>
          {isExpense ? "-" : ""}{tx.amount.toFixed(2)}
        </div>

        <div className="flex gap-2">
          <button onClick={onEdit} className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700">
            <PencilIcon className="w-5 h-5" />
          </button>
          <button onClick={onDelete} className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700">
            <TrashIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default TransactionCard;