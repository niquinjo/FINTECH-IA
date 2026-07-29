"use client"
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Category } from "@/lib/types";
import { Tags } from 'lucide-react';


interface CategoryModalProps {
  categories: Category[];
}

export default function CategoryModal({ categories }: CategoryModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Usando useForm do react-hook-form direto aqui. 
  // Você pode extrair para um custom hook (useCategoryForm) depois se preferir!
  const form = useForm({
    defaultValues: {
      name: "",
    }
  });

  const onSubmit = async (data: { name: string }) => {
    setIsLoading(true);
    setErrorMessage("");

    console.log("Nova categoria:", data);

    // Simulação da requisição de criação
    setTimeout(() => {
      setIsLoading(false);

      // Ao invés de fechar o modal, apenas limpamos o input
      // Assim o usuário pode cadastrar várias categorias de uma vez se quiser
      form.reset();
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {/* Botão com estilo diferente para não competir visualmente com o "+ Nova Transação" */}
        <Button variant="outline" className="px-4 py-2 rounded-lg font-medium">
          Categorias
        </Button>
      </DialogTrigger>

      <DialogContent className='sm:max-w-[425px] max-h-[85vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Categorias</DialogTitle>
          <DialogDescription>Gerencie suas categorias ou crie uma nova.</DialogDescription>
        </DialogHeader>

        {/* 1. SEÇÃO DE LISTAGEM */}
        <div className="mb-2">
          <h4 className="font-semibold text-sm text-gray-700 mb-3">Categorias Existentes:</h4>
          <div className="gap-2 grid grid-cols-1 md:grid-cols-3"> 
            {/*quero estilizar melhor as categorias q vao aparecer no mobiles DEPOIS. */}
            {categories && categories.length > 0 ? (
              categories.map((cat) => (

                <span
                  key={cat.id}
                  className=" flex bg-gray-100 text-gray-700 px-5 mx-auto py-1 rounded-full text-sm border border-gray-200"
                >
                  <Tags className='w-4 h-4' />
                  {cat.name}
                </span>
              ))
            ) : (
              <p className="text-sm text-gray-500">Nenhuma categoria cadastrada ainda.</p>
            )}
          </div>
        </div>

        <hr className="my-4 border-gray-200" />

        <div>
          <h4 className="font-semibold text-sm text-gray-700 mb-3">Adicionar Nova:</h4>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome da Categoria*</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Lazer, Saúde, Freelance..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {errorMessage && (
                <p className="text-red-500 text-sm font-medium">{errorMessage}</p>
              )}

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white" disabled={isLoading}>
                {isLoading ? "Salvando..." : "Adicionar Categoria"}
              </Button>

            </form>
          </Form>
        </div>

      </DialogContent>
    </Dialog>
  );
}