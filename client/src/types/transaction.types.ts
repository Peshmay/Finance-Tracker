export type TransactionType = "income" | "expense";

export type TransactionCategory =
  | "salary"
  | "freelance"
  | "housing"
  | "food"
  | "utilities"
  | "transport"
  | "entertainment"
  | "health"
  | "other";

export type Transaction = {
  id: string;
  date: string;
  description: string;
  category: TransactionCategory;
  type: TransactionType;
  amount: number;
};

export type CreateTransactionInput = {
  date: string;
  description: string;
  category: TransactionCategory;
  type: TransactionType;
  amount: number;
};