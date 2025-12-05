import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../api/api";
import { Transaction } from "../types/transaction";
import toast from "react-hot-toast";

const KEY = "transactions";

export function useTransactions(filters?: { type?: string; startDate?: string; endDate?: string }) {
  return useQuery<Transaction[]>({
    queryKey: [KEY, filters],
    queryFn: async () => {
      const params: any = {};
      if (filters?.type) params.type = filters.type;
      if (filters?.startDate) params.startDate = filters.startDate;
      if (filters?.endDate) params.endDate = filters.endDate;
      const { data } = await api.get<Transaction[]>("/api/transactions", { params });
      return data;
    },
    keepPreviousData: true,
  });
}

export function useCreateTransaction() {
  const qc = useQueryClient();
  return useMutation<Transaction, any, Transaction>({
    mutationFn: (payload: Transaction) => api.post<Transaction>("/api/transactions", payload).then(r => r.data),
    onMutate: async (newTx) => {
      await qc.cancelQueries({ queryKey: [KEY] });
      const previous = qc.getQueryData<Transaction[]>([KEY]) ?? [];
      qc.setQueryData([KEY], [...previous, { ...newTx, id: Math.random() }]); // оптимистичное добавление
      toast.success("Транзакция добавлена (локально)");
      return { previous };
    },
    onError: (err, newTx, context: any) => {
      qc.setQueryData([KEY], context.previous);
      toast.error("Ошибка при добавлении");
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: [KEY] });
    },
  });
}

export function useUpdateTransaction() {
  const qc = useQueryClient();
  return useMutation<Transaction, any, { id: number; payload: Transaction }>({
    mutationFn: ({ id, payload }) => api.put<Transaction>(`/api/transactions/${id}`, payload).then(r => r.data),
    onMutate: async ({ id, payload }) => {
      await qc.cancelQueries({ queryKey: [KEY] });
      const prev = qc.getQueryData<Transaction[]>([KEY]) ?? [];
      qc.setQueryData([KEY], prev.map(t => (t.id === id ? { ...t, ...payload } : t)));
      toast.success("Транзакция обновлена (локально)");
      return { prev };
    },
    onError: (err, vars, context: any) => {
      qc.setQueryData([KEY], context.prev);
      toast.error("Ошибка при обновлении");
    },
    onSettled: () => qc.invalidateQueries({ queryKey: [KEY] }),
  });
}

export function useDeleteTransaction() {
  const qc = useQueryClient();
  return useMutation<void, any, number>({
    mutationFn: (id: number) => api.delete(`/api/transactions/${id}`).then(r => r.data),
    onMutate: async (id: number) => {
      await qc.cancelQueries({ queryKey: [KEY] });
      const prev = qc.getQueryData<Transaction[]>([KEY]) ?? [];
      qc.setQueryData([KEY], prev.filter(t => t.id !== id));
      toast.success("Транзакция удалена (локально)");
      return { prev };
    },
    onError: (err, id, context: any) => {
      qc.setQueryData([KEY], context.prev);
      toast.error("Ошибка при удалении");
    },
    onSettled: () => qc.invalidateQueries({ queryKey: [KEY] }),
  });
}
