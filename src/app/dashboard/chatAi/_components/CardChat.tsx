"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Send,
  Bot,
  User,
  Loader2,
  TrendingUp,
  WalletCards,
  ArrowUpRight,
} from "lucide-react";

import { ChatMessage } from "@/lib/types";
import { sendMessageAction } from "@/actions/message";

const suggestions = [
  {
    label: "Como estão minhas finanças?",
    icon: TrendingUp,
  },
  {
    label: "Estou gastando muito?",
    icon: WalletCards,
  },
  {
    label: "Como melhorar meu saldo?",
    icon: ArrowUpRight,
  },
];

export default function CardChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Olá! Sou NIQ, seu conselheiro financeiro. No momento, estou focado em analisar o seu panorama geral e suas transações mais recentes.\n\nComo posso te ajudar hoje? Posso analisar sua saúde financeira atual ou te dar dicas de como economizar! \n\n Exemplos do que posso responder: \n\n• Como estão minhas finanças? \n\n • Estou gastando muito? \n\n• Como melhorar meu saldo? \n\n • Tenho mais entradas ou saídas? \n\n • Quais hábitos financeiros devo melhorar? \n\n• Em quais categorias devo prestar atenção?",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }, [messages, loading]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim() || loading) return;

    const userMessage = input;
    setInput("");

    const userMsgObj: ChatMessage = {
      role: "user",
      content: userMessage,
    };

    setMessages((prev) => [...prev, userMsgObj]);
    setLoading(true);

    try {
      const response = await sendMessageAction(userMessage);

      if (response?.success && response?.answer?.resposta_agente) {
        const aiMsgObj: ChatMessage = {
          role: "assistant",
          content: response.answer.resposta_agente,
        };

        setMessages((prev) => [...prev, aiMsgObj]);
      } else {
        throw new Error(response?.error || "Erro na resposta da IA");
      }
    } catch (error) {
      console.error("Erro no chat:", error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Desculpe, tive um problema ao processar sua análise financeira. Tente novamente em instantes!",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const sendSuggestion = (text: string) => {
    if (loading) return;

    setInput(text);

    requestAnimationFrame(() => {
      document
        .getElementById("niq-chat-form")
        ?.dispatchEvent(
          new Event("submit", {
            bubbles: true,
            cancelable: true,
          })
        );
    });
  };

  return (
    <div className="relative flex h-full min-h-0 w-full flex-col overflow-hidden bg-[#040617] text-white">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-[-180px] h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-[#1c3eaf]/[0.035] blur-[140px]" />
      </div>

      {/* Header */}
      <header className="relative z-10 shrink-0 border-b border-white/[0.06]">
        <div className="mx-auto flex h-[76px] w-full max-w-5xl items-center px-6">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#6da6d7]/20 bg-[#142269]">
                <Bot className="h-5 w-5 text-[#6da6d7]" />
              </div>

              <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#040617] bg-emerald-400" />
            </div>

            <div>
              <h1 className="text-sm font-semibold tracking-tight">
                NIQ
              </h1>

              <p className="text-[11px] text-[#7c7c80]">
                Seu conselheiro financeiro
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Área principal */}
      <main className="relative z-10 flex min-h-0 flex-1 overflow-hidden">
        <div className="mx-auto flex min-h-0 w-full max-w-5xl flex-1 flex-col px-6">
          {/* Mensagens */}
          <div className="min-h-0 flex-1 overflow-y-auto py-7 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">
            <div className="mx-auto w-full max-w-3xl space-y-7">
              {messages.map((msg, index) => {
                const isUser = msg.role === "user";

                return (
                  <div
                    key={index}
                    className={`flex items-start gap-3 ${
                      isUser ? "justify-end" : "justify-start"
                    }`}
                  >
                    {!isUser && (
                      <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#6da6d7]/15 bg-[#142269]">
                        <Bot className="h-4 w-4 text-[#6da6d7]" />
                      </div>
                    )}

                    <div className="max-w-[85%]">
                      {!isUser && (
                        <div className="mb-1.5 flex items-center gap-2 px-1">
                          <span className="text-[11px] font-medium text-[#6da6d7]">
                            NIQ
                          </span>

                          <span className="text-[10px] text-[#7c7c80]/70">
                            Conselheiro financeiro
                          </span>
                        </div>
                      )}

                      <div
                        className={`rounded-xl px-4 py-3 text-sm leading-7 whitespace-pre-wrap ${
                          isUser
                            ? "rounded-tr-sm bg-[#1c3eaf] text-white"
                            : "rounded-tl-sm border border-white/[0.07] bg-[#080b1d] text-white/85"
                        }`}
                      >
                        {msg.content}
                      </div>
                    </div>

                    {isUser && (
                      <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-[#142269]">
                        <User className="h-4 w-4 text-white/75" />
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Loading */}
              {loading && (
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#6da6d7]/15 bg-[#142269]">
                    <Bot className="h-4 w-4 text-[#6da6d7]" />
                  </div>

                  <div>
                    <div className="mb-1.5 px-1">
                      <span className="text-[11px] font-medium text-[#6da6d7]">
                        NIQ
                      </span>
                    </div>

                    <div className="flex items-center gap-3 rounded-xl rounded-tl-sm border border-white/[0.07] bg-[#080b1d] px-4 py-3">
                      <div className="flex gap-1">
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#6da6d7]" />

                        <span
                          className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#6da6d7]"
                          style={{ animationDelay: "120ms" }}
                        />

                        <span
                          className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#6da6d7]"
                          style={{ animationDelay: "240ms" }}
                        />
                      </div>

                      <span className="text-xs text-[#7c7c80]">
                        Analisando suas movimentações...
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Área inferior */}
          <div className="mx-auto w-full max-w-3xl shrink-0 pb-5 pt-3">
            {/* Sugestões */}
            {messages.length === 1 && !loading && (
              <div className="mb-3">
                <p className="mb-2 px-1 text-[10px] font-medium uppercase tracking-wider text-[#7c7c80]">
                  Sugestões
                </p>

                <div className="flex flex-wrap gap-2">
                  {suggestions.map((suggestion) => {
                    const Icon = suggestion.icon;

                    return (
                      <button
                        key={suggestion.label}
                        type="button"
                        onClick={() => sendSuggestion(suggestion.label)}
                        className="group flex items-center gap-2 rounded-lg border border-white/[0.07] bg-[#080b1d] px-3 py-2 text-xs text-white/60 transition-colors hover:border-[#6da6d7]/25 hover:bg-[#142269] hover:text-white"
                      >
                        <Icon className="h-3.5 w-3.5 text-[#6da6d7]" />
                        {suggestion.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Input */}
            <form
              id="niq-chat-form"
              onSubmit={handleSendMessage}
              className="flex items-center gap-2 rounded-xl border border-white/[0.09] bg-[#080b1d] p-1.5 transition-colors focus-within:border-[#6da6d7]/25"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Pergunte ao NIQ sobre suas finanças..."
                disabled={loading}
                className="h-11 flex-1 border-0 bg-transparent px-3 text-sm text-white shadow-none placeholder:text-[#7c7c80]/70 focus-visible:ring-0"
              />

              <Button
                type="submit"
                disabled={loading || !input.trim()}
                size="icon"
                className="h-10 w-10 shrink-0 rounded-lg bg-[#1c3eaf] text-white transition-colors hover:bg-[#2449c4] disabled:bg-white/[0.04] disabled:text-white/20"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </form>

            <p className="mt-2 text-center text-[10px] text-[#7c7c80]/50">
              O NIQ analisa suas informações financeiras para gerar respostas
              personalizadas.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}