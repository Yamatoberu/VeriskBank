export interface Transaction {
  transactionId: number;
  type: string;
  startingBalance: number;
  transactionAmount: number;
  endingBalance: number;
  transactionDate: Date;
  description: string;
  accountId: number;
}
