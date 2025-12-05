import React, { useEffect, useState } from "react";
import { Transaction } from "../types/transaction";
import { Dialog } from "@headlessui/react";
import { motion } from "framer-motion";

const empty: Transaction = {
  type: "EXPENSE",
  amount: 0,
  category: "",
  description: "",
  date: new Date().toISOString().slice(0, 10),
};

const TransactionModal: React.FC<{
  isOpen: boolean;
  initial?: Transaction | null;
  onClose: () => void;
  onSave: (payload: Transaction) => void;
}> = ({ isOpen, initial, onClose, onSave }) => {
  const [form, setForm] = useState<Transaction>(initial ?? empty);

  useEffect(() => {
    setForm(initial ?? empty);
  }, [initial]);

  function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    // basic validation
    if (!form.category || !form.amount || !form.date || !form.type) {
      return alert("Заполните обязательные поля");
    }
    onSave(form);
    onClose();
  }

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/40" aria-hidden />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel>
          <motion.div initial={{ scale: 0.96, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full max-w-md p-6 rounded-xl glass">
            <Dialog.Title className="text-xl font-semibold mb-4">{initial ? "Edit Transaction" : "Add Transaction"}</Dialog.Title>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div className="col-span-1">
                  <label className="block text-sm font-medium">Type</label>
                  <select className="mt-1 w-full px-3 py-2 rounded-md" value={form.type} onChange={e => setForm({ ...form, type: e.target.value as any })}>
                    <option value="EXPENSE">Expense</option>
                    <option value="INCOME">Income</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium">Amount</label>
                  <input type="number" step="0.01" className="mt-1 w-full px-3 py-2 rounded-md" value={form.amount} onChange={e => setForm({ ...form, amount: Number(e.target.value) })} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium">Category</label>
                <input className="mt-1 w-full px-3 py-2 rounded-md" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} />
              </div>

              <div>
                <label className="block text-sm font-medium">Date</label>
                <input type="date" className="mt-1 w-full px-3 py-2 rounded-md" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
              </div>

              <div>
                <label className="block text-sm font-medium">Description</label>
                <textarea className="mt-1 w-full px-3 py-2 rounded-md" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
              </div>

              <div className="flex justify-end gap-2">
                <button type="button" onClick={onClose} className="px-4 py-2 rounded-md">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-md bg-primary-500 text-white">Save</button>
              </div>
            </form>
          </motion.div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default TransactionModal;