

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