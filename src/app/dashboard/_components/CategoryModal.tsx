"use client"

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Category } from "@/lib/types";
import { Tag } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { createCategoryAction } from '@/actions/categories';
import { useRouter } from 'next/navigation';

interface CategoryModalProps {
  categories: Category[];
}

export default function CategoryModal({ categories }: CategoryModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleCreateCategory(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const result = await createCategoryAction(formData);

    setIsLoading(false);

    if (result.success) {
      form.reset();
      setIsOpen(false);
      router.refresh();
      return;
    } else {
      console.log(result.error);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/20 font-semibold shadow-xs transition-all cursor-pointer rounded-xl">
          Categorias
        </Button>
      </DialogTrigger>

      <DialogContent className='sm:max-w-xl bg-gradient-to-br from-brand-secondary to-brand-primary text-white border border-brand-primary/30 rounded-2xl shadow-2xl p-6 md:p-8 max-h-[85vh] overflow-y-auto'>
        <DialogHeader className="mb-2">
          <DialogTitle className="text-2xl font-bold text-white">Categorias</DialogTitle>
          <DialogDescription className="text-brand-accent">Gerencie suas categorias existentes ou cadastre uma nova.</DialogDescription>
        </DialogHeader>

        {/* 1. SEÇÃO DE LISTAGEM */}
        <div className="mb-4">
          <h4 className="font-semibold text-sm text-brand-accent mb-3">Categorias Existentes:</h4>
          
          <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto pr-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-brand-accent/40 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-brand-accent">
            {categories && categories.length > 0 ? (
              categories.map((cat) => (
                <div
                  key={cat.id}
                  className="flex items-center gap-2 bg-brand-dark/50 text-white px-3.5 py-2 rounded-xl text-sm border border-brand-primary/30 shadow-xs transition-all hover:bg-brand-dark/70"
                >
                  <Tag className='w-4 h-4 text-brand-accent shrink-0' />
                  <span className="font-medium">{cat.name}</span>
                </div>
              ))
            ) : (
              <p className="text-sm text-brand-muted py-2">Nenhuma categoria cadastrada ainda.</p>
            )}
          </div>
        </div>

        <hr className="my-6 border-brand-primary/30" />

        {/* 2. SEÇÃO DE CRIAÇÃO */}
        <div>
          <h4 className="font-semibold text-sm text-brand-accent mb-3">
            Adicionar nova categoria:
          </h4>

          <form onSubmit={handleCreateCategory} className='space-y-4'>
            <div>
              <Label className='text-white font-medium mb-2 block' htmlFor="name">
                Nome da nova Categoria*
              </Label>

              <Input
                id='name'
                name='name'
                required
                placeholder='Ex: Comida, Viagem, Saúde...'
                className="bg-brand-dark/60 border-brand-primary/40 text-white placeholder:text-brand-muted focus-visible:ring-brand-accent rounded-xl h-12"
              />
            </div>
            
            <Button
              type='submit'
              disabled={isLoading}
              className='w-full bg-brand-primary hover:bg-brand-primary/80 text-white font-bold rounded-xl transition shadow-lg h-12 cursor-pointer'
            >
              {isLoading ? "Criando..." : "Criar categoria"}
            </Button>
          </form>
        </div>

      </DialogContent>
    </Dialog>
  );
}