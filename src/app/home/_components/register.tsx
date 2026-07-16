"use client"
import { useActionState } from 'react';
import { useRegisterForm } from '../hooks/register-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { registerUser } from '../actions/auth';

export function RegisterContent() {
  const [state, formAction, isPending] = useActionState(registerUser, null);

  return (
    <div className="w-full max-w-md space-y-8 mt-3">
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="space-y-6">
          <div className='space-y-2'>
            <Label className='font-semibold'>Não tem uma conta?</Label>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className='w-full'>
                  Clique aqui para se cadastrar
                </Button>
              </DialogTrigger>
              <DialogContent className='sm:max-w-[425px]'>
                <form action={formAction} className="space-y-4">
                  <DialogHeader>
                    <DialogTitle className="text-3xl sm:text-4xl font-bold">Cadastre-se</DialogTitle>
                    <DialogDescription>Preencha os campos abaixo para criar sua conta.</DialogDescription>
                  </DialogHeader>

                  <div className="space-y-2">
                    <Label htmlFor="name">Nome*</Label>
                    <Input id="name" name="name" required minLength={3} placeholder="Digite seu nome..." />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email*</Label>
                    <Input id="email" name="email" required type="email" placeholder="Digite seu email..." />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Senha*</Label>
                    <Input id="password" name="password" required type="password" minLength={8} placeholder="Digite sua senha..." />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirme sua senha*</Label>
                    <Input id="confirmPassword" name="confirmPassword" required type="password" minLength={8} placeholder="Confirme a senha..." />
                  </div>

                  <Button type="submit" className="w-full" disabled={isPending}>
                    {isPending ? "Cadastrando..." : "Cadastrar"}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}