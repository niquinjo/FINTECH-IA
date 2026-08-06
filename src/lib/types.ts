

export interface User {
  id: string;
  name: string;
  email: string;
  role: "USER" | "ADMIN"
  token: string;
  createdAt: string;
  updatedAt: string
}


export interface Category {
  id: string;
  user_id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface Transaction {
  id: string;
  name: string;
  value: number;
  description: string;
  type: "ENTRADA" | "SAIDA";
  disable?: boolean;
  category_id: string;
  user_id?: string;
  createdAt?: string;
  updatedAt?: string;
  category?: {
    name: string;
  };
  date: string;
}