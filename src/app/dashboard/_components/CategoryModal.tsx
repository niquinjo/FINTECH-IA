"use client"
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Category } from "@/lib/types";
import { Tags } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { createCategoryAction } from '@/actions/categories';
import { useRouter } from 'next/navigation';

interface CategoryModalProps {
  categories: Category[];
}

export default function CategoryModal({ categories }: CategoryModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  async function handleCreateCategory(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget)
    const result = await createCategoryAction(formData)

    if (result.success) {
      router.refresh();
      return;
    } else {
      console.log(result.error)
      // colocar um alerta/aviso depois para ser mais dinamico.
    }

  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="px-4 py-2 rounded-lg font-medium">
          Categorias
        </Button>
      </DialogTrigger>

      <DialogContent className='sm:max-w-[425px] max-h-[85vh] overflow-y-auto p-6'>
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
          <h4 className="font-semibold text-sm text-gray-700 mb-3">
            Adicionar nova categória:
          </h4>

          <form onSubmit={handleCreateCategory} className='space-y-4'>
            <div>
              <Label className='my-3' htmlFor="category">
                Nome da nova Categoria*
              </Label>

              <Input
                id='name'
                name='name'
                required
                placeholder='Ex: Comida, Viajem, Saúde...'
              />
            </div>
            <Button
              type='submit'
              className='w-full'
            >
              Criar categória
            </Button>
          </form>
        </div>

      </DialogContent>
    </Dialog>
  );
}