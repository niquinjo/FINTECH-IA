"use client"
import { useState } from 'react';
import { useLoginForm, LoginFormData } from '../hooks/login-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { loginUser } from '../../../actions/auth';
import { useRouter } from 'next/navigation';

export function LoginContent() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const form = useLoginForm();

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setErrorMessage("");

    const result = await loginUser({
      email: data.email,
      password: data.password
    });

    setIsLoading(false);

    if (result.success) {
      form.reset();
      router.push('/dashboard');
    } else {
      setErrorMessage(result.error);
    }
  };

  return (
    <div className="w-full max-w-md space-y-8 mt-3">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className='text-3xl mx-auto'>
            Faça login
          </CardTitle>
          <h1 className='font-semibold mx-auto'>
            Venha descobrir como organizar melhor sua vida!
          </h1>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className='space-y-2'>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

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

                {errorMessage && (
                  <p className="text-red-500 text-sm font-medium">{errorMessage}</p>
                )}

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Entrando..." : "Entrar"}
                </Button>

              </form>
            </Form>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}