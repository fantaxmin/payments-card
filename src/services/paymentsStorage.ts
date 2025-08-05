import type { Payment } from '../types/Payment';

const STORAGE_KEY = 'payments-list';

export async function getPayments(): Promise<Payment[]> {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return [];
  try {
    return JSON.parse(data) as Payment[];
  } catch {
    return [];
  }
}

export async function savePayments(payments: Payment[]): Promise<void> {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payments));
}
