

export interface User {
  id: string;
  name: string;
  email: string;
  role: "USER" | "ADMIN"
  token: string;
  createdAt: string;
  updatedAt: string
}

