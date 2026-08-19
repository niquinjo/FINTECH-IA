"use client"
import { useState } from 'react';
import { useRegisterForm, RegisterFormData } from '../hooks/register-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { registerUser } from '../../../actions/auth';
import { redirect } from 'next/navigation';

export function RegisterContent() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const form = useRegisterForm();

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    setErrorMessage("");

    const result = await registerUser({
      name: data.name,
      email: data.email,
      password: data.password
    });

    setIsLoading(false);

    if (result.success) {
      setIsOpen(false);
      form.reset();
      redirect("/dashboard")
    } else {
      setErrorMessage(result.error);
    }
  };

  return (
    <div className="w-full max-w-md space-y-8 mt-3">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <p className="text-sm text-brand-dark/80 font-medium">
          Não tem uma conta?{" "}
          <DialogTrigger asChild>
            <button className="text-brand-dark font-bold hover:text-brand-primary hover:underline transition-colors">
              Clique aqui para se cadastrar
            </button>
          </DialogTrigger>
        </p>

        {/* Modal atualizado: Gradiente no fundo, mais margem interna (p-8 sm:px-10), sem bordas */}
        <DialogContent className="sm:max-w-[480px] border-none shadow-2xl bg-gradient-to-br from-brand-accent to-brand-muted p-8 sm:px-10">
          <DialogHeader className="mb-2">
            <DialogTitle className="text-3xl font-bold text-brand-dark tracking-tight">Crie sua conta</DialogTitle>
            <DialogDescription className="text-brand-dark/80 font-medium text-base">
              Leva menos de um minuto para começar a organizar sua vida.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-brand-dark font-bold">Nome*</FormLabel>
                    <FormControl>
                      <Input className="bg-white border-transparent focus:border-brand-primary text-black shadow-sm" placeholder="Digite seu nome..." {...field} />
                    </FormControl>
                    <FormMessage className="text-red-800" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-brand-dark font-bold">Email*</FormLabel>
                    <FormControl>
                      <Input className="bg-white border-transparent focus:border-brand-primary text-black shadow-sm" type="email" placeholder="Digite seu email..." {...field} />
                    </FormControl>
                    <FormMessage className="text-red-800" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-brand-dark font-bold">Senha*</FormLabel>
                    <FormControl>
                      <Input className="bg-white border-transparent focus:border-brand-primary text-black shadow-sm" type="password" placeholder="Crie uma senha forte..." {...field} />
                    </FormControl>
                    <FormMessage className="text-red-800" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-brand-dark font-bold">Confirme sua senha*</FormLabel>
                    <FormControl>
                      <Input className="bg-white border-transparent focus:border-brand-primary text-black shadow-sm" type="password" placeholder="Confirme a senha..." {...field} />
                    </FormControl>
                    <FormMessage className="text-red-800" />
                  </FormItem>
                )}
              />

              {errorMessage && (
                <p className="text-red-800 bg-red-100 p-2 rounded text-sm font-semibold text-center">{errorMessage}</p>
              )}

              <Button
                type="submit"
                className="w-full bg-linear-to-br from-brand-secondary to-brand-primary hover:from-brand-accent hover:to-brand-muted hover:bg-transparent text-white font-semibold transition-all duration-300 shadow-md hover:shadow-xl hover:brightness-110 py-6 mt-2"
                disabled={isLoading}
              >
                {isLoading ? "Criando conta..." : "Cadastrar Agora"}
              </Button>

            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  )
}