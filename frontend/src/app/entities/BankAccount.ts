export interface BankAccount {
  id: string;
  name: string;
  initialBalance: number;
  color: string;
  type: 'INVESTMENT' | 'CHECKING' | 'CASH';
  currentBalance: number;
}
