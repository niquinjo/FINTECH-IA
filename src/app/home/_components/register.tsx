"use client"
import { useRegisterForm } from '../hooks/register-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

export function RegisterContent() {

  const form = useRegisterForm();

  return (
    <div className="w-full max-w-md space-y-8">
      <Form {...form}>
        <form>
          <Card>
            <CardHeader className="mx-auto">
              <CardTitle>Cadastro</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className='space-y-4'>

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
                        <Input placeholder="Digite sua senha..." {...field} />
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
                        <Input placeholder="Digite sua senha novamente..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  )

}