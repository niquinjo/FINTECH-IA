"use client"

import { Button } from "@/components/ui/button"
import { Trash } from "lucide-react"
import { deleteTransactionAction } from "@/actions/transactions"
import { useRouter } from "next/navigation";

interface DeleteButtonProps {
  transactionId: string;
}

export function DeleteButtonTransaction({ transactionId }: DeleteButtonProps) {


  const router = useRouter();

  async function handleDeleteTransaction() {
    const result = await deleteTransactionAction(transactionId)
    if (result.success) {
      router.refresh();
      return;
    }
  }

  return (
    <Button onClick={handleDeleteTransaction} variant="destructive">
      <Trash
        className="w-5 h-5"
      />
    </Button>
  )
}