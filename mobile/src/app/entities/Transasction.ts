export interface Transaction {
  id: string;
  name: string;
  value: number;
  date: string;
  categoryId: string;
  bankAccountId: string;
  type: 'INCOME' | 'EXPENSE';
  category?: {
    id: string;
    name: string;
    icon: string;
  }
}
