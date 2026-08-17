

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

// 1. cada mensagem exibida na UI
export interface ChatMessage {
  id?: string;
  role: "user" | "assistant";
  content: string;
  createdAt?: string;
  loading?: boolean;
}

// corpo enviado par ao backend
export interface AskAiRequest {
  message: string;
}

export interface AiAnswer {
  status: "sucesso" | "erro";
  resposta_agente?: string;
  mensagem?: string;
}

// 3. Representa a resposta exata que o seu Backend Node.js devolve
export interface AskAiResponse {
  success: boolean;
  answer?: AiAnswer;
  error?: string;
}