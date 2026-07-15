"use client"
import { useRegisterForm } from '../hooks/register-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export function RegisterContent() {

  const form = useRegisterForm();

  return (
    <div className="w-full max-w-md space-y-8 mt-3">
      <Form {...form}>
        <form>
          <Card>
            <CardContent className="space-y-6">
              <div className='space-y-4'>
                <div className='space-y-2'>
                  <Label className='font-semibold'>
                    Não tem uma conta?
                  </Label>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className='w-full'>
                        Clique aqui para se cadastrar
                      </Button>
                    </DialogTrigger>
                    <DialogContent className='sm:max-w-[425px]'>
                      <DialogHeader className=''>
                        <DialogTitle>Comece sua jornada aqui</DialogTitle>
                        <DialogDescription>
                          Preencha os campos abaixo para criar sua conta.
                        </DialogDescription>
                      </DialogHeader>
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className='font-semibold'>Primeiro nome</FormLabel>
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
                            <FormLabel className='font-semibold'>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="Digite seu email..." {...field} />
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
                            <FormLabel className='font-semibold'>Senha</FormLabel>
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
                            <FormLabel className='font-semibold'>Confirmar Senha</FormLabel>
                            <FormControl>
                              <Input type="password" placeholder="Digite sua senha novamente..." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </DialogContent>
                  </Dialog>

                </div>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  )

}