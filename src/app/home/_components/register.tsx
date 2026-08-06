"use client"
import { useState } from 'react';
import { useRegisterForm, RegisterFormData } from '../hooks/register-form';
import { Card, CardContent } from '@/components/ui/card';
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { registerUser } from '../../../actions/auth';

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
    } else {
      setErrorMessage(result.error);
    }
  };

  return (
    <div className="w-full max-w-md space-y-8 mt-3">
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="space-y-6">
          <div className='space-y-2'>
            <Label className='font-semibold'>Não tem uma conta?</Label>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className='w-full'>
                  Clique aqui para se cadastrar
                </Button>
              </DialogTrigger>
              <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                  <DialogTitle className="text-3xl sm:text-4xl font-bold">Cadastre-se</DialogTitle>
                  <DialogDescription>Preencha os campos abaixo para criar sua conta.</DialogDescription>
                </DialogHeader>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome*</FormLabel>
                          <FormControl>
                            <Input placeholder="Digite seu nome..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email*</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="Digite seu email..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Senha*</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="Digite sua senha..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirme sua senha*</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="Confirme a senha..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {errorMessage && (
                      <p className="text-red-500 text-sm font-medium">{errorMessage}</p>
                    )}

                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Cadastrando..." : "Cadastrar"}
                    </Button>

                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}